'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export interface TransitionState {
  progress: number; // 0.0 a 1.0 (scrubbable frame a frame)
  currentSection: number; // 0: Intro/Hero, 1: Serviços, 2: Metodologia/Akita, 3: Contato
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
}

const TOTAL_SECTIONS = 5; // 0: Hero, 1: Serviços, 2: Quem Pode Usar, 3: Metodologia, 4: Contato
const TOTAL_SERVICES = 5; // 5 serviços apresentados 1 por vez

const TransitionContext = createContext<TransitionContextType | null>(null);

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
    introExploded: false, // Inicialmente na tela pré-hero de Gênese
    isIntroGenesis: false,
    hudRevealed: false,
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const snapTweenRef = useRef<gsap.core.Tween | null>(null);
  const targetProgressRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const arrivedAtTimeRef = useRef<number>(Date.now());
  const ghostScrollDeltaRef = useRef<number>(0);
  const ghostResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Transiciona para a próxima etapa (avanço de serviço ou de seção)
  const completeForwardTransition = useCallback(() => {
    const s = stateRef.current;
    targetProgressRef.current = 0;
    arrivedAtTimeRef.current = Date.now();
    ghostScrollDeltaRef.current = 0;

    // Se estamos na seção 1 (Serviços) e ainda há serviços para exibir (1 por vez)
    if (s.currentSection === 1 && s.serviceStep < TOTAL_SERVICES - 1) {
      const nextStep = s.serviceStep + 1;
      setState((prev) => ({
        ...prev,
        serviceStep: nextStep,
        targetServiceStep: nextStep,
        direction: 'forward',
        progress: 0,
        status: 'IDLE_NA_SECAO',
        locked: false,
      }));
      return;
    }

    // Se é avanço de seção
    if (s.currentSection < TOTAL_SECTIONS - 1) {
      const nextSec = s.currentSection + 1;
      const willRevealHud = nextSec >= TOTAL_SECTIONS - 1;
      setState((prev) => ({
        ...prev,
        currentSection: nextSec,
        targetSection: nextSec,
        serviceStep: 0,
        targetServiceStep: 0,
        direction: 'forward',
        progress: 0,
        status: 'IDLE_NA_SECAO',
        locked: false,
        hudRevealed: prev.hudRevealed || willRevealHud,
      }));
    } else {
      // Já está na última seção (Contato)
      setState((prev) => ({
        ...prev,
        progress: 0,
        status: 'IDLE_NA_SECAO',
        locked: false,
      }));
    }
  }, []);

  // Navegação direta com animação breve e fluida (avançar ou retroceder sem ignorar o efeito)
  const navigateTo = useCallback((targetSec: number, targetStep: number = 0) => {
    const s = stateRef.current;
    if (s.locked) return;
    if (s.currentSection === targetSec && s.serviceStep === targetStep) return;

    if (snapTweenRef.current) snapTweenRef.current.kill();

    const currentScore = s.currentSection * 10 + s.serviceStep;
    const targetScore = targetSec * 10 + targetStep;
    const dir: 'forward' | 'backward' = targetScore >= currentScore ? 'forward' : 'backward';

    // Determina se é transição interna de serviços ou transição de seções
    const isServiceInternal = s.currentSection === 1 && targetSec === 1;

    setState((prev) => ({
      ...prev,
      targetSection: targetSec,
      targetServiceStep: targetStep,
      direction: dir,
      status: 'TRANSICIONANDO',
      locked: true,
      hudRevealed: prev.hudRevealed || targetSec >= TOTAL_SECTIONS - 1,
    }));

    const tweenObj = { p: 0 };
    // Duração ágil e breve: ~0.42s para serviços (glitch conciso), ~0.65s para seções (explosão 3D)
    const duration = isServiceInternal ? 0.42 : 0.65;
    const maxP = isServiceInternal ? 0.55 : 1.0;

    snapTweenRef.current = gsap.to(tweenObj, {
      p: maxP,
      duration,
      ease: isServiceInternal ? 'power1.inOut' : 'power2.inOut',
      onUpdate: () => {
        setState((prev) => ({ ...prev, progress: tweenObj.p }));
      },
      onComplete: () => {
        snapTweenRef.current = null;
        targetProgressRef.current = 0;
        arrivedAtTimeRef.current = Date.now();
        ghostScrollDeltaRef.current = 0;
        setState((prev) => ({
          ...prev,
          currentSection: targetSec,
          targetSection: targetSec,
          serviceStep: targetStep,
          targetServiceStep: targetStep,
          progress: 0,
          status: 'IDLE_NA_SECAO',
          locked: false,
          introExploded: true,
        }));
      },
    });
  }, []);

  // Rebobinamento / Navegação acionada pelo Menu
  const rewindToSection = useCallback((targetSectionIndex: number) => {
    navigateTo(targetSectionIndex, 0);
  }, [navigateTo]);

  // Gênese de Abertura: 5 segundos de montagem acelerando progressivamente
  const startGenesis = useCallback(() => {
    if (stateRef.current.introExploded || stateRef.current.isIntroGenesis) return;

    if (snapTweenRef.current) snapTweenRef.current.kill();

    setState((prev) => ({
      ...prev,
      isIntroGenesis: true,
      status: 'TRANSICIONANDO',
      progress: 0,
      locked: true,
    }));

    const tweenObj = { p: 0 };
    snapTweenRef.current = gsap.to(tweenObj, {
      p: 1,
      duration: 5.0, // 5 segundos de animação cinematográfica
      ease: 'power2.in', // Começa devagar bloco a bloco e vai acelerando até montar tudo
      onUpdate: () => {
        setState((prev) => ({ ...prev, progress: tweenObj.p }));
      },
      onComplete: () => {
        snapTweenRef.current = null;
        targetProgressRef.current = 0;
        arrivedAtTimeRef.current = Date.now();
        ghostScrollDeltaRef.current = 0;
        setState((prev) => ({
          ...prev,
          introExploded: true,
          isIntroGenesis: false,
          progress: 0,
          status: 'IDLE_NA_SECAO',
          locked: false,
        }));
      },
    });
  }, []);

  // Disparo cinemático de transição para trás (Scroll para Cima / Retroceder)
  const triggerTransitionBackward = useCallback(() => {
    const s = stateRef.current;
    if (s.status !== 'IDLE_NA_SECAO' || s.locked) return;
    if (s.currentSection === 0 && s.serviceStep === 0) return;

    let prevSec = s.currentSection;
    let prevStep = s.serviceStep;

    if (s.currentSection === 1 && s.serviceStep > 0) {
      prevSec = 1;
      prevStep = s.serviceStep - 1;
    } else if (s.currentSection === 1 && s.serviceStep === 0) {
      prevSec = 0;
      prevStep = 0;
    } else if (s.currentSection === 2) {
      prevSec = 1;
      prevStep = TOTAL_SERVICES - 1;
    } else if (s.currentSection > 2) {
      prevSec = s.currentSection - 1;
      prevStep = 0;
    }

    navigateTo(prevSec, prevStep);
  }, [navigateTo]);

  // Interceptador de Wheel / Touch: SCRUBBING CONTÍNUO FRAME A FRAME
  // Permite rolar devagar e ver cada frame e bloco se mover em tempo real
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const current = stateRef.current;
      if (current.locked) return;

      // Tela Pré-Hero: qualquer scroll para baixo dispara a gênese cinematográfica de 5s
      if (!current.introExploded) {
        if (e.deltaY > 15) {
          startGenesis();
        }
        return;
      }

      if (current.status === 'REBOBINANDO') return;

      const now = Date.now();
      // 1. Cooldown de estabilização pós-chegada (650ms):
      // Descarta inércia residual ou rolagens imediatas para dar tempo de visualizar o serviço/seção
      if (now - arrivedAtTimeRef.current < 650) {
        ghostScrollDeltaRef.current = 0;
        return;
      }

      // Se usuário está parado e rola para cima firmemente -> recua seção/serviço com efeito reverso
      if (current.status === 'IDLE_NA_SECAO' && targetProgressRef.current === 0 && e.deltaY < -30) {
        ghostScrollDeltaRef.current = 0;
        triggerTransitionBackward();
        return;
      }

      // Se já está na última seção (Contato) e tenta rolar para baixo -> TRAVA TOTAL (sem scroll infinito)
      const isAtLastSection = current.currentSection >= TOTAL_SECTIONS - 1;
      if (isAtLastSection && e.deltaY > 0) {
        targetProgressRef.current = 0;
        ghostScrollDeltaRef.current = 0;
        if (current.status !== 'IDLE_NA_SECAO' || current.progress !== 0) {
          setState((prev) => ({
            ...prev,
            status: 'IDLE_NA_SECAO',
            progress: 0,
          }));
        }
        return;
      }

      // 2. Scroll "Fantasma" (Trava de ativação pré-glitch para serviços):
      // Quando o usuário está parado em um serviço, ele não quer que um toque mínimo no scroll já pule
      // para o próximo serviço. Exigimos uma rolagem fantasma intencional de 180px antes de iniciar o glitch!
      const isInternalService = current.currentSection === 1 && current.serviceStep < TOTAL_SERVICES - 1;
      const GHOST_SCROLL_THRESHOLD = 180; // px necessários para destravar o glitch

      if (isInternalService && current.status === 'IDLE_NA_SECAO' && targetProgressRef.current === 0 && e.deltaY > 0) {
        if (ghostScrollDeltaRef.current < GHOST_SCROLL_THRESHOLD) {
          ghostScrollDeltaRef.current += e.deltaY;

          // Se o usuário parar de rolar antes de vencer o limiar, limpa o buffer após 400ms
          if (ghostResetTimerRef.current) clearTimeout(ghostResetTimerRef.current);
          ghostResetTimerRef.current = setTimeout(() => {
            ghostScrollDeltaRef.current = 0;
          }, 400);

          return; // Absorve o scroll fantasma como trava sem mover absolutamente nada na tela
        }
      }

      // Diferenciação de sensibilidade e curso de scroll:
      // Transição interna entre serviços (0->1, 1->2, 2->3):
      // Sensibilidade calibrada para 0.0018 com limiar 0.60: curso confortável e deliberado sem ser hiper-sensível
      const sensitivity = isInternalService ? 0.0018 : 0.0010;
      const nextP = Math.max(0, Math.min(1, targetProgressRef.current + e.deltaY * sensitivity));
      targetProgressRef.current = nextP;

      if (nextP <= 0.01) {
        targetProgressRef.current = 0;
        ghostScrollDeltaRef.current = 0;
        setState((prev) => ({
          ...prev,
          status: 'IDLE_NA_SECAO',
          progress: 0,
        }));
        return;
      }

      // Limiar de conclusão claro, breve e cirurgicamente delimitado:
      // Para serviços: a rajada de glitch é breve (pico em 0.28). Ao atingir >= 0.60, o novo serviço engata e trava!
      // Para seções (explosão): conclui em >= 0.94
      const threshold = isInternalService ? 0.60 : 0.94;
      if (nextP >= threshold) {
        targetProgressRef.current = 0;
        ghostScrollDeltaRef.current = 0;
        completeForwardTransition();
        return;
      }

      // Define explicitamente o alvo da transição para frente (seção ou próximo serviço)
      const targetSec = isInternalService
        ? 1
        : current.currentSection < TOTAL_SECTIONS - 1
        ? current.currentSection + 1
        : current.currentSection;
      const targetStep = isInternalService ? current.serviceStep + 1 : 0;

      // Em qualquer ponto intermediário (0.005 < nextP < threshold), o frame fica congelado
      // exatamente na posição ditada pela mão do usuário
      setState((prev) => ({
        ...prev,
        targetSection: targetSec,
        targetServiceStep: targetStep,
        direction: 'forward',
        status: 'TRANSICIONANDO',
        progress: nextP,
      }));
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * 1.8;
      touchStartY = touchY;

      handleWheel({
        preventDefault: () => {},
        deltaY: delta,
      } as WheelEvent);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (ghostResetTimerRef.current) clearTimeout(ghostResetTimerRef.current);
    };
  }, [completeForwardTransition, triggerTransitionBackward, startGenesis]);

  const triggerIntroExplode = useCallback(() => {
    startGenesis();
  }, [startGenesis]);

  const nextService = useCallback(() => {
    if (stateRef.current.serviceStep < TOTAL_SERVICES - 1) {
      setState((prev) => ({ ...prev, serviceStep: prev.serviceStep + 1 }));
    }
  }, []);

  const prevService = useCallback(() => {
    if (stateRef.current.serviceStep > 0) {
      setState((prev) => ({ ...prev, serviceStep: prev.serviceStep - 1 }));
    }
  }, []);

  const setProgressManual = useCallback((p: number) => {
    setState((prev) => ({ ...prev, progress: p }));
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
