'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { pickActiveSection, pickActiveSectionStep } from './activeSection';
import { OFFER_MODULES } from '@/lib/offer';
import { SECTION_SLUGS, TOTAL_SECTIONS, anchorIdFor, stepCountOf } from '@/lib/scene-sections';

// Slugs das seções de topo vêm de scene-sections.ts (id do <section> = âncora pública
// /#slug); offer.ts é a fonte de verdade pros slugs de serviço (#servico-<slug>).
export { SECTION_SLUGS };
export const SERVICE_SLUGS = OFFER_MODULES.map((m) => m.slug);

export interface TransitionState {
  progress: number; // 0.0 a 1.0 durante a explosão/glitch de transição (não mais scrub contínuo de scroll)
  currentSection: number; // índice em SCENE_SECTIONS (lib/scene-sections.ts)
  targetSection: number;
  /** Passo dentro da seção atual (serviço, FAQ…); sempre 0 em seções sem passos. */
  sectionStep: number;
  targetSectionStep: number;
  direction: 'forward' | 'backward';
  status: 'IDLE_NA_SECAO' | 'TRANSICIONANDO' | 'REBOBINANDO';
  locked: boolean;
  introExploded: boolean;
  isIntroGenesis: boolean;
  hudRevealed: boolean;
}

interface TransitionContextType extends TransitionState {
  navigateTo: (sectionIndex: number, stepIndex?: number) => void;
  rewindToSection: (sectionIndex: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  triggerIntroExplode: () => void;
  startGenesis: () => void;
  setProgressManual: (p: number) => void;
  /** Ref-callback pra cada seção de topo (scroll nativo + IntersectionObserver). */
  registerSection: (index: number) => (el: HTMLElement | null) => void;
  /** Ref-callback pra cada marcador de passo de uma seção com passos (scene-sections stepIds). */
  registerStep: (section: number, step: number) => (el: HTMLElement | null) => void;
}

const SECTION_THRESHOLD = 0.5;
const STEP_THRESHOLD = 0.6;
// Suprime o IntersectionObserver por essa janela depois de um navigateTo() programático,
// tempo suficiente pro scrollIntoView({behavior:'smooth'}) assentar sem o observer
// disparando transições espúrias pras seções que ficam no caminho.
const PROGRAMMATIC_SCROLL_SUPPRESS_MS = 900;
// Se o status ficar fora de IDLE_NA_SECAO por mais tempo que isso, o watchdog assume
// que o tween do gsap travou (ex.: usuário trocou de aba e o rAF pausou, então
// onComplete nunca chama) e força a volta pro estado estável.
const WATCHDOG_TIMEOUT_MS = 3000;
const WATCHDOG_POLL_MS = 500;

const TransitionContext = createContext<TransitionContextType | null>(null);

/** Razão de visibilidade de um elemento na viewport — mesma noção de ratio do
 * IntersectionObserver, mas calculada sob demanda (sem esperar o próximo callback),
 * pro watchdog ressincronizar com a posição real de scroll no momento do timeout. */
function computeVisibilityRatio(el: Element): number {
  const rect = el.getBoundingClientRect();
  if (rect.height <= 0) return 0;
  const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
  return visible / rect.height;
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TransitionState>({
    progress: 0,
    currentSection: 0,
    targetSection: 0,
    sectionStep: 0,
    targetSectionStep: 0,
    direction: 'forward',
    status: 'IDLE_NA_SECAO',
    locked: false,
    // Nasce true: o gate de "montagem" foi removido (item 1 da fase 1 de performance).
    // O conteúdo e o mural 3D já aparecem prontos desde o primeiro paint; o overlay de
    // abertura (IntroGenesisSplash) é só cosmético e vive fora dessa máquina de estados.
    introExploded: true,
    isIntroGenesis: false,
    hudRevealed: false,
  });

  // "Latest ref" pattern: callbacks abaixo leem sempre o state mais atual sem recriar
  // closures a cada mudança. Escrever o ref direto no corpo do componente violava a
  // regra de pureza do render (react-hooks/refs); a escrita acontece num efeito, após
  // o render.
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  });

  const activeTweenRef = useRef<gsap.core.Tween | null>(null);
  const suppressObserverRef = useRef(false);
  const suppressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Elementos observados: seções de topo (numa seção com passos, cada marcador de passo
  // registra também a seção) e os marcadores de passo (sub-navegação dentro dela).
  const sectionElsRef = useRef(new Map<Element, number>());
  const stepElsRef = useRef(new Map<Element, { section: number; step: number }>());
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const stepObserverRef = useRef<IntersectionObserver | null>(null);

  // Dispara a explosão 3D / glitch de transição e só troca currentSection/sectionStep
  // quando o tween termina — o mural continua fazendo a mistura de cores entre o tema
  // atual (currentSection) e o de destino (targetSection) durante o voo, como antes.
  const transitionTo = useCallback((nextSection: number, nextStep: number) => {
    const s = stateRef.current;
    if (s.currentSection === nextSection && s.sectionStep === nextStep) return;
    // O observer pode disparar de novo enquanto o scroll-snap ainda está assentando
    // (múltiplas leves oscilações de ratio antes de estabilizar). Se já existe um tween
    // em andamento rumo a esse MESMO alvo, ignora — senão cada disparo reinicia a
    // animação do zero e ela nunca chega no onComplete que troca currentSection.
    const alreadyHeadingThere =
      s.status !== 'IDLE_NA_SECAO' && s.targetSection === nextSection && s.targetSectionStep === nextStep;
    if (alreadyHeadingThere) return;

    if (activeTweenRef.current) activeTweenRef.current.kill();

    const currentScore = s.currentSection * 100 + s.sectionStep;
    const targetScore = nextSection * 100 + nextStep;
    const dir: 'forward' | 'backward' = targetScore >= currentScore ? 'forward' : 'backward';
    const isSectionChange = nextSection !== s.currentSection;

    setState((prev) => ({
      ...prev,
      targetSection: nextSection,
      targetSectionStep: nextStep,
      direction: dir,
      status: dir === 'forward' ? 'TRANSICIONANDO' : 'REBOBINANDO',
      hudRevealed: prev.hudRevealed || nextSection >= TOTAL_SECTIONS - 1,
    }));

    const tweenObj = { p: 0 };
    // Duração breve: ~0.42s para troca de passo (glitch conciso), ~0.65s pra explosão de seção
    const duration = isSectionChange ? 0.65 : 0.42;

    activeTweenRef.current = gsap.to(tweenObj, {
      p: 1,
      duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        setState((prev) => ({ ...prev, progress: tweenObj.p }));
      },
      onComplete: () => {
        activeTweenRef.current = null;
        setState((prev) => ({
          ...prev,
          currentSection: nextSection,
          sectionStep: nextStep,
          progress: 0,
          status: 'IDLE_NA_SECAO',
        }));
      },
    });
  }, []);

  // Navegação por clique (HUD, setas) ou programática: rola de verdade até o elemento
  // (scroll nativo, funciona com teclado/leitor de tela) e já dispara a transição
  // visual na hora, sem esperar o observer — que fica suprimido enquanto o scroll
  // suave em progresso passaria por seções intermediárias.
  const navigateTo = useCallback((targetSec: number, targetStep: number = 0) => {
    const id = anchorIdFor(targetSec, targetStep);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    suppressObserverRef.current = true;
    if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current);
    suppressTimeoutRef.current = setTimeout(() => {
      suppressObserverRef.current = false;
    }, PROGRAMMATIC_SCROLL_SUPPRESS_MS);
    // Um scheduleTransition do observer pode já estar pendente de um scroll natural
    // que essa navegação por clique está sobrepondo — cancela pra não disparar
    // depois com um alvo desatualizado.
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    transitionTo(targetSec, targetStep);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [transitionTo]);

  const rewindToSection = useCallback((targetSectionIndex: number) => {
    navigateTo(targetSectionIndex, 0);
  }, [navigateTo]);

  // Vestigial: introExploded já nasce true (sem gate de montagem), então isso é
  // sempre um no-op hoje. Mantido só porque IntroGenesisSplash/triggerIntroExplode
  // ainda chamam essa função — sem quebrar a forma pública de useTransition().
  const startGenesis = useCallback(() => {
    if (stateRef.current.introExploded || stateRef.current.isIntroGenesis) return;
    setState((prev) => ({ ...prev, introExploded: true }));
  }, []);

  const triggerIntroExplode = useCallback(() => {
    startGenesis();
  }, [startGenesis]);

  const nextStep = useCallback(() => {
    const s = stateRef.current;
    if (s.sectionStep < stepCountOf(s.currentSection) - 1) navigateTo(s.currentSection, s.sectionStep + 1);
  }, [navigateTo]);

  const prevStep = useCallback(() => {
    const s = stateRef.current;
    if (s.sectionStep > 0) navigateTo(s.currentSection, s.sectionStep - 1);
  }, [navigateTo]);

  const setProgressManual = useCallback((p: number) => {
    setState((prev) => ({ ...prev, progress: p }));
  }, []);

  // Debounce entre a decisão do observer e a transição de verdade: um scroll rápido
  // (ou o scroll-snap nativo assentando) dispara vários lotes de entries em sequência
  // rápida, cada um podendo "decidir" uma seção/passo diferente por uma fração de
  // segundo. Agir na hora faria cada disparo interromper o tween anterior a meio
  // caminho; só a última decisão estável (depois de OBSERVER_DEBOUNCE_MS quieto) vira
  // de fato uma chamada a transitionTo.
  const OBSERVER_DEBOUNCE_MS = 120;
  const scheduleTransition = useCallback((section: number, step: number) => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      debounceTimeoutRef.current = null;
      transitionTo(section, step);
    }, OBSERVER_DEBOUNCE_MS);
  }, [transitionTo]);

  // IntersectionObserver de seções de topo: qual seção está mais visível vira
  // currentSection. Numa seção com passos, todos os marcadores contam como ela.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return;
        const map = sectionElsRef.current;
        // O observer só reporta as entries que mudaram nesta leva; pickActiveSectionStep
        // agrega pelo marcador mais visível de cada seção e devolve o passo dele — entrar
        // numa seção com passos rolando de baixo pra cima cai no último passo.
        const visibilities = entries.flatMap((entry) => {
          const section = map.get(entry.target);
          if (section === undefined) return [];
          const step = stepElsRef.current.get(entry.target)?.step ?? 0;
          return [{ section, step, ratio: entry.intersectionRatio }];
        });
        if (visibilities.length === 0) return;
        const picked = pickActiveSectionStep(visibilities, SECTION_THRESHOLD);
        if (picked === null) return;
        if (picked.section === stateRef.current.currentSection) return;
        scheduleTransition(picked.section, picked.step);
      },
      { threshold: [0, SECTION_THRESHOLD, 1] }
    );
    sectionObserverRef.current = observer;
    sectionElsRef.current.forEach((_, el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scheduleTransition]);

  // IntersectionObserver dos marcadores de passo: qual passo está mais visível vira
  // sectionStep, só entre os marcadores da seção que já está ativa.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return;
        const s = stateRef.current;
        const map = stepElsRef.current;
        const ratiosByStep = new Map<number, number>();
        entries.forEach((entry) => {
          const info = map.get(entry.target);
          if (!info || info.section !== s.currentSection) return;
          const prevRatio = ratiosByStep.get(info.step) ?? 0;
          ratiosByStep.set(info.step, Math.max(prevRatio, entry.intersectionRatio));
        });
        if (ratiosByStep.size === 0) return;
        const picked = pickActiveSection(
          Array.from(ratiosByStep, ([index, ratio]) => ({ index, ratio })),
          STEP_THRESHOLD
        );
        if (picked === null) return;
        if (picked === s.sectionStep) return;
        scheduleTransition(s.currentSection, picked);
      },
      { threshold: [0, STEP_THRESHOLD, 1] }
    );
    stepObserverRef.current = observer;
    stepElsRef.current.forEach((_, el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scheduleTransition]);

  useEffect(() => {
    return () => {
      if (suppressTimeoutRef.current) clearTimeout(suppressTimeoutRef.current);
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
      if (activeTweenRef.current) activeTweenRef.current.kill();
    };
  }, []);

  // Watchdog: guarda desde quando o status está fora de IDLE_NA_SECAO.
  const transitionStuckSinceRef = useRef<number | null>(null);
  useEffect(() => {
    if (state.status === 'IDLE_NA_SECAO') {
      transitionStuckSinceRef.current = null;
      return;
    }
    if (transitionStuckSinceRef.current === null) {
      transitionStuckSinceRef.current = Date.now();
    }
  }, [state.status]);

  // Cobre o usuário que troca de aba (ou minimiza) no meio de uma transição: o rAF
  // do gsap pausa em segundo plano e o tween nunca chama onComplete, então o status
  // ficaria travado em TRANSICIONANDO/REBOBINANDO pra sempre. Se isso durar mais que
  // WATCHDOG_TIMEOUT_MS, mata o tween e ressincroniza a seção ativa com a posição
  // real de scroll (não com o alvo antigo, que pode estar desatualizado se o usuário
  // rolou manualmente enquanto o tween estava travado).
  useEffect(() => {
    const interval = setInterval(() => {
      const stuckSince = transitionStuckSinceRef.current;
      if (stuckSince === null || Date.now() - stuckSince < WATCHDOG_TIMEOUT_MS) return;

      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[TransitionContext] watchdog: status travado por mais de ${WATCHDOG_TIMEOUT_MS}ms, forçando IDLE_NA_SECAO`,
          stateRef.current
        );
      }

      if (activeTweenRef.current) {
        activeTweenRef.current.kill();
        activeTweenRef.current = null;
      }
      transitionStuckSinceRef.current = null;

      const s = stateRef.current;
      const sectionRatios = Array.from(sectionElsRef.current, ([el, idx]) => ({
        index: idx,
        ratio: computeVisibilityRatio(el),
      }));
      const resolvedSection = pickActiveSection(sectionRatios, SECTION_THRESHOLD) ?? s.targetSection;
      let resolvedStep = 0;
      if (stepCountOf(resolvedSection) > 1) {
        const stepRatios = Array.from(stepElsRef.current)
          .filter(([, info]) => info.section === resolvedSection)
          .map(([el, info]) => ({ index: info.step, ratio: computeVisibilityRatio(el) }));
        resolvedStep = pickActiveSection(stepRatios, STEP_THRESHOLD) ?? s.targetSectionStep;
      }

      setState((prev) => ({
        ...prev,
        currentSection: resolvedSection,
        sectionStep: resolvedStep,
        targetSection: resolvedSection,
        targetSectionStep: resolvedStep,
        progress: 0,
        status: 'IDLE_NA_SECAO',
      }));
    }, WATCHDOG_POLL_MS);
    return () => clearInterval(interval);
  }, []);

  // Cada chamada a registerSection(index) devolve um ref-callback com sua PRÓPRIA
  // variável de closure (currentEl) — necessário porque os marcadores de uma seção com
  // passos registram todos o mesmo índice de seção simultaneamente; uma limpeza "achar
  // o elemento anterior com esse índice e remover" apagaria os outros.
  const registerSection = useCallback((index: number) => {
    let currentEl: HTMLElement | null = null;
    return (el: HTMLElement | null) => {
      if (currentEl) {
        sectionObserverRef.current?.unobserve(currentEl);
        sectionElsRef.current.delete(currentEl);
      }
      currentEl = el;
      if (el) {
        sectionElsRef.current.set(el, index);
        sectionObserverRef.current?.observe(el);
      }
    };
  }, []);

  const registerStep = useCallback((section: number, step: number) => {
    let currentEl: HTMLElement | null = null;
    return (el: HTMLElement | null) => {
      if (currentEl) {
        stepObserverRef.current?.unobserve(currentEl);
        stepElsRef.current.delete(currentEl);
      }
      currentEl = el;
      if (el) {
        stepElsRef.current.set(el, { section, step });
        stepObserverRef.current?.observe(el);
      }
    };
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        ...state,
        navigateTo,
        rewindToSection,
        nextStep,
        prevStep,
        triggerIntroExplode,
        startGenesis,
        setProgressManual,
        registerSection,
        registerStep,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}
