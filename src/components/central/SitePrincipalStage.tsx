'use client';

import React, { useCallback, useState } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { ParticleSceneCanvas } from '@/scenes/ParticleSceneCanvas';
import { IntroGeneseHero } from './IntroGeneseHero';
import { ServicosGlitchSequence } from './ServicosGlitchSequence';
import { QuemPodeUsarSectionStage } from './QuemPodeUsarSectionStage';
import { MetodologiaAkitaStory } from './MetodologiaAkitaStory';
import { ContatoRewindHud } from './ContatoRewindHud';
import { CustomMagneticCursor } from '@/components/ui/CustomMagneticCursor';
import { NavigationHud } from './NavigationHud';
import { IntroGenesisSplash } from './IntroGenesisSplash';

export function SitePrincipalStage() {
  const { currentSection, status } = useTransition();
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

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return <IntroGeneseHero />;
      case 1:
        return <ServicosGlitchSequence />;
      case 2:
        return <QuemPodeUsarSectionStage />;
      case 3:
        return <MetodologiaAkitaStory />;
      case 4:
        return <ContatoRewindHud />;
      default:
        return <IntroGeneseHero />;
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen overflow-hidden bg-[#0a0a0b] text-white select-none"
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

      {/* 7. Palco Principal da Seção Ativa — O texto aparece APENAS após o blur dos blocos */}
      <main
        className="relative z-10 w-full transition-opacity duration-450 ease-out"
        style={{
          height: '100dvh',
          opacity: textReady ? 1 : 0,
          pointerEvents: textReady ? 'auto' : 'none',
        }}
      >
        {renderCurrentSection()}
      </main>
    </div>
  );
}
