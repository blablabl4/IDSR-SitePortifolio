'use client';

import React, { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTransition } from '@/context/TransitionContext';
import { SCENE_SECTIONS } from '@/lib/scene-sections';
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

/** Conteúdo de cada seção de topo, por slug. Seções com passos (stepIds em
 * scene-sections) recebem o visual que fica sticky enquanto os passos rolam. */
const SECTION_CONTENT: Record<string, React.ReactNode> = {
  hero: <IntroGeneseHero />,
  servicos: <ServicosGlitchSequence />,
  'quem-pode-usar': <QuemPodeUsarSectionStage />,
  metodo: <MetodologiaAkitaStory />,
  contato: <ContatoRewindHud />,
};

type Attach = (el: HTMLElement | null) => void;

/** <section> de uma tela, observada pelo TransitionContext. `attach` é o ref-callback de
 * registerSection — recebido como prop (e não indexando o array no JSX do pai) porque
 * `ref={arr[n]}` confunde a análise estática de react-hooks/refs. */
function ScreenSection({ slug, attach, children }: { slug: string; attach: Attach; children: React.ReactNode }) {
  return (
    <section id={slug} ref={attach} style={{ height: '100dvh', scrollSnapAlign: 'start' }}>
      {children}
    </section>
  );
}

/** Marcador invisível de 100svh de um passo; conta como a seção E como o passo. */
function StepMarker({ id, step, attach }: { id: string; step: number; attach: Attach }) {
  return (
    <div
      id={id}
      ref={attach}
      style={{
        position: 'absolute',
        top: `${step * 100}svh`,
        height: '100svh',
        width: '100%',
        scrollSnapAlign: 'start',
      }}
      aria-hidden="true"
    />
  );
}

/** Seção com passos: N x 100svh. O visual fica sticky no topo da viewport enquanto o
 * usuário rola por essa faixa alta; marcadores absolutos, um por 100svh, disparam o
 * sectionStep correspondente ao entrar na viewport (scrollytelling clássico — sem
 * scroll aninhado, tudo no mesmo <main>). Cada passo é uma tela de snap, então
 * nenhuma seção fica mais alta que a viewport do ponto de vista do snap. */
function SteppedSection({
  slug,
  stepIds,
  attachers,
  children,
}: {
  slug: string;
  stepIds: string[];
  attachers: Attach[];
  children: React.ReactNode;
}) {
  return (
    <section id={slug} style={{ position: 'relative', height: `${stepIds.length * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">{children}</div>
      {stepIds.map((id, step) => (
        <StepMarker key={id} id={id} step={step} attach={attachers[step]} />
      ))}
    </section>
  );
}

export function SitePrincipalStage() {
  const { status, registerSection, registerStep } = useTransition();
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

  // Ref-callbacks memoizados: precisam manter identidade estável entre renders (senão
  // o IntersectionObserver desinscreve/reinscreve os elementos toda hora). Seções de
  // uma tela registram só a seção; numa seção com passos, cada marcador registra os
  // dois índices ao mesmo tempo: conta como a seção pro observer de topo E como seu
  // próprio passo pro observer aninhado.
  const attachers = useMemo(
    () =>
      SCENE_SECTIONS.map((section, i) =>
        section.stepIds
          ? section.stepIds.map((_, step) => {
              // Cada marcador precisa da SUA PRÓPRIA chamada a registerSection — reusar
              // uma única closure pros N marcadores fazia cada anexação desregistrar a
              // anterior (só o último ficava contando como a seção).
              const attachSection = registerSection(i);
              const attachStep = registerStep(i, step);
              return (el: HTMLElement | null) => {
                attachSection(el);
                attachStep(el);
              };
            })
          : [registerSection(i)]
      ),
    [registerSection, registerStep]
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
        {SCENE_SECTIONS.map((section, i) =>
          section.stepIds ? (
            <SteppedSection
              key={section.slug}
              slug={section.slug}
              stepIds={section.stepIds}
              attachers={attachers[i]}
            >
              {SECTION_CONTENT[section.slug]}
            </SteppedSection>
          ) : (
            <ScreenSection key={section.slug} slug={section.slug} attach={attachers[i][0]}>
              {SECTION_CONTENT[section.slug]}
            </ScreenSection>
          )
        )}
      </main>
    </div>
  );
}
