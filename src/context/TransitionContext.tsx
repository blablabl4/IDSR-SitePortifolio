'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { pickActiveSection } from './activeSection';
import { OFFER_MODULES } from '@/lib/offer';

// Slugs usados nos ids/anchors das 5 seções de topo — offer.ts é a fonte de verdade
// pros slugs de serviço (mesmos de /produtos), então os dois lados linkam pro mesmo lugar.
export const SECTION_SLUGS = ['hero', 'servicos', 'quem-pode-usar', 'metodologia', 'contato'];
export const SERVICE_SLUGS = OFFER_MODULES.map((m) => m.slug);

export interface TransitionState {
  progress: number; // 0.0 a 1.0 durante a explosão/glitch de transição (não mais scrub contínuo de scroll)
  currentSection: number; // 0: Intro/Hero, 1: Serviços, 2: Quem Pode Usar, 3: Metodologia, 4: Contato
  targetSection: number;
  serviceStep: number; // 0..4 (1 serviço por vez na Seção 1)
  targetServiceStep: number; // 0..4
  totalServices: number;
  direction: 'forward' | 'backward';
  status: 'IDLE_NA_SECAO' | 'TRANSICIONANDO' | 'REBOBINANDO';
  locked: boolean;
  introExploded: boolean;
  isIntroGenesis: boolean;
  hudRevealed: boolean;
}

interface TransitionContextType extends TransitionState {
  navigateTo: (sectionIndex: number, serviceStepIndex?: number) => void;
  rewindToSection: (sectionIndex: number) => void;
  nextService: () => void;
  prevService: () => void;
  triggerIntroExplode: () => void;
  startGenesis: () => void;
  setProgressManual: (p: number) => void;
  /** Ref-callback pra cada uma das 5 seções de topo (scroll nativo + IntersectionObserver). */
  registerSection: (index: number) => (el: HTMLElement | null) => void;
  /** Ref-callback pra cada um dos 5 blocos de serviço dentro da seção de Serviços. */
  registerServiceStep: (index: number) => (el: HTMLElement | null) => void;
}

const TOTAL_SECTIONS = 5; // 0: Hero, 1: Serviços, 2: Quem Pode Usar, 3: Metodologia, 4: Contato
const TOTAL_SERVICES = 5; // 5 serviços apresentados 1 por vez
const SERVICES_SECTION_INDEX = 1;
const SECTION_THRESHOLD = 0.5;
const SERVICE_THRESHOLD = 0.6;
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
    serviceStep: 0,
    targetServiceStep: 0,
    totalServices: TOTAL_SERVICES,
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

  // Elementos observados: seções de topo (o bloco de Serviços registra os 5 blocos de
  // serviço, todos como seção 1) e os blocos de serviço (sub-navegação dentro dela).
  const sectionElsRef = useRef(new Map<Element, number>());
  const serviceElsRef = useRef(new Map<Element, number>());
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const serviceObserverRef = useRef<IntersectionObserver | null>(null);

  // Dispara a explosão 3D / glitch de transição e só troca currentSection/serviceStep
  // quando o tween termina — o mural continua fazendo a mistura de cores entre o tema
  // atual (currentSection) e o de destino (targetSection) durante o voo, como antes.
  const transitionTo = useCallback((nextSection: number, nextStep: number) => {
    const s = stateRef.current;
    if (s.currentSection === nextSection && s.serviceStep === nextStep) return;
    // O observer pode disparar de novo enquanto o scroll-snap ainda está assentando
    // (múltiplas leves oscilações de ratio antes de estabilizar). Se já existe um tween
    // em andamento rumo a esse MESMO alvo, ignora — senão cada disparo reinicia a
    // animação do zero e ela nunca chega no onComplete que troca currentSection.
    const alreadyHeadingThere =
      s.status !== 'IDLE_NA_SECAO' && s.targetSection === nextSection && s.targetServiceStep === nextStep;
    if (alreadyHeadingThere) return;

    if (activeTweenRef.current) activeTweenRef.current.kill();

    const currentScore = s.currentSection * 10 + s.serviceStep;
    const targetScore = nextSection * 10 + nextStep;
    const dir: 'forward' | 'backward' = targetScore >= currentScore ? 'forward' : 'backward';
    const isSectionChange = nextSection !== s.currentSection;

    setState((prev) => ({
      ...prev,
      targetSection: nextSection,
      targetServiceStep: nextStep,
      direction: dir,
      status: dir === 'forward' ? 'TRANSICIONANDO' : 'REBOBINANDO',
      hudRevealed: prev.hudRevealed || nextSection >= TOTAL_SECTIONS - 1,
    }));

    const tweenObj = { p: 0 };
    // Duração breve: ~0.42s para troca de serviço (glitch conciso), ~0.65s pra explosão de seção
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
          serviceStep: nextStep,
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
    const id =
      targetSec === SERVICES_SECTION_INDEX
        ? `servico-${SERVICE_SLUGS[targetStep] ?? targetStep}`
        : `secao-${SECTION_SLUGS[targetSec] ?? targetSec}`;
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

  const nextService = useCallback(() => {
    const s = stateRef.current;
    if (s.serviceStep < TOTAL_SERVICES - 1) navigateTo(SERVICES_SECTION_INDEX, s.serviceStep + 1);
  }, [navigateTo]);

  const prevService = useCallback(() => {
    const s = stateRef.current;
    if (s.serviceStep > 0) navigateTo(SERVICES_SECTION_INDEX, s.serviceStep - 1);
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
  // currentSection. Os 5 blocos de serviço contam todos como seção 1.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return;
        const map = sectionElsRef.current;
        // O observer só reporta as entries que mudaram nesta leva; agrega pelo maior
        // ratio dentro de cada seção (a de Serviços tem 5 elementos mapeados pro mesmo índice).
        const ratiosBySection = new Map<number, number>();
        entries.forEach((entry) => {
          const idx = map.get(entry.target);
          if (idx === undefined) return;
          const prevRatio = ratiosBySection.get(idx) ?? 0;
          ratiosBySection.set(idx, Math.max(prevRatio, entry.intersectionRatio));
        });
        if (ratiosBySection.size === 0) return;
        const picked = pickActiveSection(
          Array.from(ratiosBySection, ([index, ratio]) => ({ index, ratio })),
          SECTION_THRESHOLD
        );
        if (picked === null) return;
        const s = stateRef.current;
        if (picked === s.currentSection) return;
        // Ao entrar na seção de Serviços via scroll natural, mantém o serviceStep atual
        // (o observer de serviços abaixo cuida de refiná-lo); nas demais, step = 0.
        scheduleTransition(picked, picked === SERVICES_SECTION_INDEX ? s.serviceStep : 0);
      },
      { threshold: [0, SECTION_THRESHOLD, 1] }
    );
    sectionObserverRef.current = observer;
    sectionElsRef.current.forEach((_, el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scheduleTransition]);

  // IntersectionObserver dos blocos de serviço: qual bloco está mais visível vira
  // serviceStep, só quando a seção ativa já é a de Serviços.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return;
        if (stateRef.current.currentSection !== SERVICES_SECTION_INDEX) return;
        const map = serviceElsRef.current;
        const ratiosByStep = new Map<number, number>();
        entries.forEach((entry) => {
          const idx = map.get(entry.target);
          if (idx === undefined) return;
          const prevRatio = ratiosByStep.get(idx) ?? 0;
          ratiosByStep.set(idx, Math.max(prevRatio, entry.intersectionRatio));
        });
        if (ratiosByStep.size === 0) return;
        const picked = pickActiveSection(
          Array.from(ratiosByStep, ([index, ratio]) => ({ index, ratio })),
          SERVICE_THRESHOLD
        );
        if (picked === null) return;
        if (picked === stateRef.current.serviceStep) return;
        scheduleTransition(SERVICES_SECTION_INDEX, picked);
      },
      { threshold: [0, SERVICE_THRESHOLD, 1] }
    );
    serviceObserverRef.current = observer;
    serviceElsRef.current.forEach((_, el) => observer.observe(el));
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
      if (resolvedSection === SERVICES_SECTION_INDEX) {
        const stepRatios = Array.from(serviceElsRef.current, ([el, idx]) => ({
          index: idx,
          ratio: computeVisibilityRatio(el),
        }));
        resolvedStep = pickActiveSection(stepRatios, SERVICE_THRESHOLD) ?? s.targetServiceStep;
      }

      setState((prev) => ({
        ...prev,
        currentSection: resolvedSection,
        serviceStep: resolvedStep,
        targetSection: resolvedSection,
        targetServiceStep: resolvedStep,
        progress: 0,
        status: 'IDLE_NA_SECAO',
      }));
    }, WATCHDOG_POLL_MS);
    return () => clearInterval(interval);
  }, []);

  // Cada chamada a registerSection(index) devolve um ref-callback com sua PRÓPRIA
  // variável de closure (currentEl) — necessário porque os 5 blocos de serviço
  // registram todos o mesmo índice de seção (1) simultaneamente; uma limpeza "achar o
  // elemento anterior com esse índice e remover" apagaria os outros 4.
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

  const registerServiceStep = useCallback((index: number) => {
    let currentEl: HTMLElement | null = null;
    return (el: HTMLElement | null) => {
      if (currentEl) {
        serviceObserverRef.current?.unobserve(currentEl);
        serviceElsRef.current.delete(currentEl);
      }
      currentEl = el;
      if (el) {
        serviceElsRef.current.set(el, index);
        serviceObserverRef.current?.observe(el);
      }
    };
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        ...state,
        navigateTo,
        rewindToSection,
        nextService,
        prevService,
        triggerIntroExplode,
        startGenesis,
        setProgressManual,
        registerSection,
        registerServiceStep,
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
