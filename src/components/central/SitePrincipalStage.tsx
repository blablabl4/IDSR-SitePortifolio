'use client';

import React from 'react';
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
  const { currentSection, status, introExploded, isIntroGenesis, startGenesis } = useTransition();
  // Totalmente derivado de status/introExploded (só existem os 3 valores de status
  // tratados abaixo) — não precisa de estado nem de efeito, e o texto já
  // surge assim que os blocos travam no lugar, sem animações extras.
  const textReady = status === 'IDLE_NA_SECAO' && introExploded;

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

      {/* 2.5 Tela Pré-Hero de Gênese (Abertura conceitual antes do Hero) */}
      {!introExploded && (
        <IntroGenesisSplash onEnter={startGenesis} isStarting={isIntroGenesis} />
      )}

      {/* 3. Rodapé Global: Barra de Navegação + Marcador Integrados (em todas as páginas) */}
      {introExploded && <NavigationHud />}

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
