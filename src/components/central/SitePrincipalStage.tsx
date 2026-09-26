'use client';

import React, { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTransition, SECTION_SLUGS, SERVICE_SLUGS } from '@/context/TransitionContext';
import { IntroGeneseHero } from './IntroGeneseHero';
import { ServicosGlitchSequence } from './ServicosGlitchSequence';
import { QuemPodeUsarSectionStage } from './QuemPodeUsarSectionStage';
import { MetodologiaAkitaStory } from './MetodologiaAkitaStory';
import { ContatoRewindHud } from './ContatoRewindHud';
import { NavigationHud } from './NavigationHud';
import { IntroGenesisSplash } from './IntroGenesisSplash';

// three (WebGL) e gsap não entram no bundle inicial da rota: só carregam no
// cliente, depois do primeiro paint, com um fundo estático no lugar até lá.
const ParticleSceneCanvas = dynamic(
  () => import('@/scenes/ParticleSceneCanvas').then((m) => m.ParticleSceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 z-0"
        style={{
          height: '100dvh',
          background:
            'radial-gradient(ellipse at center, #1a1610 0%, #0a0a0b 55%, #050506 100%)',
        }}
        aria-hidden="true"
      />
    ),
  }
);

const CustomMagneticCursor = dynamic(
  () => import('@/components/ui/CustomMagneticCursor').then((m) => m.CustomMagneticCursor),
  { ssr: false }
);

const SERVICES_SECTION_INDEX = 1;

export function SitePrincipalStage() {
  const { status, registerSection, registerServiceStep } = useTransition();
  // Overlay puramente cosmético, independente da máquina de estados de navegação:
  // some sozinho (ver IntroGenesisSplash) sem nunca bloquear o conteúdo por baixo.
  // isDismissing dispara o fade (duration-500 no próprio componente); showSplash
  // desmonta só depois que o fade termina, pra não cortar a transição.
  const [showSplash, setShowSplash] = useState(true);
  const [isDismissingSplash, setIsDismissingSplash] = useState(false);
  const dismissSplash = useCallback(() => {
    setIsDismissingSplash(true);
    setTimeout(() => setShowSplash(false), 500);
  }, []);
  // Totalmente derivado de status (só existem os 3 valores tratados abaixo) — não
  // precisa de estado nem de efeito. O conteúdo já nasce visível (sem gate) e só
  // esconde brevemente durante a explosão 3D entre seções.
  const textReady = status === 'IDLE_NA_SECAO';

  // Ref-callbacks por índice, memoizados: precisam manter identidade estável entre
  // renders (senão o IntersectionObserver desinscreve/reinscreve os elementos toda
  // hora). Os blocos de serviço registram os dois índices ao mesmo tempo: contam como
  // a seção 1 pro observer de topo E como seu próprio serviceStep pro observer aninhado.
  const sectionAttachers = useMemo(
    () => SECTION_SLUGS.map((_, i) => registerSection(i)),
    [registerSection]
  );
  // Desestruturados em variáveis nomeadas (em vez de indexar o array direto no JSX)
  // porque `ref={arr[n]}` confunde a análise estática de react-hooks/refs.
  const [heroAttacher, , quemPodeUsarAttacher, metodologiaAttacher, contatoAttacher] = sectionAttachers;
  const serviceStepAttachers = useMemo(
    () =>
      SERVICE_SLUGS.map((_, i) => {
        // Cada bloco de serviço precisa da SUA PRÓPRIA chamada a registerSection —
        // reusar uma única closure pros 5 blocos fazia cada anexação desregistrar a
        // anterior (só o último bloco ficava contando como seção 1).
        const attachSection = registerSection(SERVICES_SECTION_INDEX);
        const attachStep = registerServiceStep(i);
        return (el: HTMLElement | null) => {
          attachSection(el);
          attachStep(el);
        };
      }),
    [registerSection, registerServiceStep]
  );

  return (
    <div
      className="relative w-full bg-[#0a0a0b] text-white select-none"
      style={{ height: '100dvh' }}
    >
      {/* 1. Cursor Magnético */}
      <CustomMagneticCursor />

      {/* 2. Mural 3D de Blocos (Composição Principal estilo Rogier de Boevé) */}
      <ParticleSceneCanvas />

      {/* 2.5 Overlay de Abertura de Gênese — cosmético, some sozinho (ver IntroGenesisSplash) */}
      {showSplash && (
        <IntroGenesisSplash onEnter={dismissSplash} isStarting={isDismissingSplash} />
      )}

      {/* 3. Rodapé Global: Barra de Navegação + Marcador Integrados (em todas as páginas) */}
      <NavigationHud />

      {/* 7. Palco Principal — scroll nativo com scroll-snap; cada <section> abaixo é
          observada por IntersectionObserver (TransitionContext) pra decidir a seção ativa.
          O texto esconde brevemente durante a explosão 3D entre seções, igual a antes. */}
      <main
        className="relative z-10 w-full h-full overflow-y-auto transition-opacity duration-450 ease-out"
        style={{
          scrollSnapType: 'y mandatory',
          opacity: textReady ? 1 : 0,
          pointerEvents: textReady ? 'auto' : 'none',
        }}
      >
        <section
          id={`secao-${SECTION_SLUGS[0]}`}
          ref={heroAttacher}
          style={{ height: '100dvh', scrollSnapAlign: 'start' }}
        >
          <IntroGeneseHero />
        </section>

        {/* Seção de Serviços: N x 100svh. O visual fica sticky no topo da viewport
            enquanto o usuário rola por essa faixa alta; marcadores absolutos, um por
            100svh, disparam o serviceStep correspondente ao entrar na viewport
            (scrollytelling clássico — sem scroll aninhado, tudo no mesmo <main>). */}
        <section
          id={`secao-${SECTION_SLUGS[1]}`}
          style={{ position: 'relative', height: `${SERVICE_SLUGS.length * 100}svh` }}
        >
          <div className="sticky top-0 h-svh overflow-hidden">
            <ServicosGlitchSequence />
          </div>
          {SERVICE_SLUGS.map((slug, i) => (
            <div
              key={slug}
              id={`servico-${slug}`}
              ref={serviceStepAttachers[i]}
              style={{
                position: 'absolute',
                top: `${i * 100}svh`,
                height: '100svh',
                width: '100%',
                scrollSnapAlign: 'start',
              }}
              aria-hidden="true"
            />
          ))}
        </section>

        <section
          id={`secao-${SECTION_SLUGS[2]}`}
          ref={quemPodeUsarAttacher}
          style={{ height: '100dvh', scrollSnapAlign: 'start' }}
        >
          <QuemPodeUsarSectionStage />
        </section>

        <section
          id={`secao-${SECTION_SLUGS[3]}`}
          ref={metodologiaAttacher}
          style={{ height: '100dvh', scrollSnapAlign: 'start' }}
        >
          <MetodologiaAkitaStory />
        </section>

        <section
          id={`secao-${SECTION_SLUGS[4]}`}
          ref={contatoAttacher}
          style={{ height: '100dvh', scrollSnapAlign: 'start' }}
        >
          <ContatoRewindHud />
        </section>
      </main>
    </div>
  );
}
