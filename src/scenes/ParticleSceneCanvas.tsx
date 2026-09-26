'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTransition } from '@/context/TransitionContext';
import {
  blockVertexShader,
  blockFragmentShader,
  edgeRefractionVertexShader,
  edgeRefractionFragmentShader,
} from './ParticleEngineShader';

/**
 * ParticleSceneCanvas — Mural Monolítico 3D (Estilo Rogier de Boevé)
 * A composição central é formada por 540 blocos modulares em 3D que flutuam
 * em formação frontal com iluminação volumétrica âmbar e reflexos de quartzo.
 * Na transição de seção, os blocos explodem fisicamente e se reorganizam.
 */
export function ParticleSceneCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { progress, currentSection, targetSection, status, serviceStep, targetServiceStep, direction, introExploded, isIntroGenesis } = useTransition();

  // Estado de Blur Dinâmico dos Blocos:
  // Fica 100% nítido (blur 0px) durante o voo e transição;
  // Quando os blocos travam no lugar (IDLE), ganha blur sutilíssimo (0.5px) para leitura confortável do texto.
  const [isBlurred, setIsBlurred] = React.useState(false);

  useEffect(() => {
    if (status === 'IDLE_NA_SECAO' && introExploded) {
      // Pequeno delay para os blocos terminarem visualmente o encaixe antes de aplicar o blur
      const timer = setTimeout(() => {
        setIsBlurred(true);
      }, 120);
      // Ao sair do IDLE (ou desmontar), cancela o timer pendente e volta ao nítido —
      // equivalente ao "else" de antes, mas dentro do cleanup em vez de setState síncrono no corpo do efeito
      return () => {
        clearTimeout(timer);
        setIsBlurred(false);
      };
    }
  }, [status, introExploded]);

  // "Latest ref" pattern: o loop de animação (useEffect com [] abaixo) roda fora do
  // ciclo de render do React e precisa ler sempre o valor mais recente de progress/
  // currentSection/etc. sem recriar a cena Three.js a cada mudança. Escrever nos refs
  // direto no corpo do componente violava a regra de pureza do render (react-hooks/refs);
  // agora a escrita acontece num efeito, depois que o render já terminou.
  const stateRef = useRef({
    progress,
    currentSection,
    targetSection,
    serviceStep,
    targetServiceStep,
    direction,
    status,
    introExploded,
    isIntroGenesis,
  });

  useEffect(() => {
    stateRef.current = {
      progress,
      currentSection,
      targetSection,
      serviceStep,
      targetServiceStep,
      direction,
      status,
      introExploded,
      isIntroGenesis,
    };
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Cena estática pra quem pede menos movimento ou está em conexão fraca: um único
    // frame é desenhado e o loop nunca é agendado (nem parallax de mouse). O tier de
    // partículas por hardware continua se aplicando normalmente.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = Boolean(
      (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData
    );
    const isStaticScene = prefersReducedMotion || saveData;

    let width = container.clientWidth || window.innerWidth;
    let height = window.visualViewport?.height || container.clientHeight || window.innerHeight;

    // 1. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 2. Cena & Câmera em Perspectiva Cinemática 3D
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 1, 3500);
    camera.position.set(0, 0, 640);
    camera.lookAt(0, 0, 0);

    // 3. Render Target para Post-Processing de Refração Líquida
    const renderTarget = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    const postScene = new THREE.Scene();
    const postMaterial = new THREE.ShaderMaterial({
      vertexShader: edgeRefractionVertexShader,
      fragmentShader: edgeRefractionFragmentShader,
      uniforms: {
        tDiffuse: { value: renderTarget.texture },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
      depthWrite: false,
      depthTest: false,
    });
    const postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMaterial);
    postScene.add(postQuad);

    // 4. Criação do Mural 3D em TELA INTEIRA de CUBOS (Rogier Architecture)
    // Orçamento de GPU em 3 níveis por hardwareConcurrency/deviceMemory (deviceMemory
    // não existe no Safari/Firefox — cai no nível médio quando ausente). Cobre 100% da
    // viewport de borda a borda com sangria em qualquer nível, só muda a densidade.
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
    let COLS: number;
    let ROWS: number;
    if (cores >= 8 && memory >= 8) {
      COLS = 64; ROWS = 32; // alto: 2048 cubos
    } else if (cores >= 4 && memory >= 4) {
      COLS = 48; ROWS = 24; // médio: 1152 cubos
    } else {
      COLS = 32; ROWS = 16; // baixo: 512 cubos
    }
    const BLOCK_COUNT = COLS * ROWS;
    // COLS:ROWS mantém sempre a razão 2:1 entre os 3 níveis, então esse fator escala X e Y
    // igualmente e o mural continua cobrindo 100% da viewport de borda a borda — só com
    // cubos proporcionalmente maiores (e mais escassos) nos níveis mais baixos.
    const TIER_SCALE = 64 / COLS;

    // CUBOS TRIDIMENSIONAIS: largura = altura = profundidade (19.5 x 19.5 x 19.5 no nível alto)
    const CUBE_SIZE = 19.5 * TIER_SCALE;
    const baseBoxGeometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    const instancedGeometry = new THREE.InstancedBufferGeometry();
    instancedGeometry.index = baseBoxGeometry.index;
    instancedGeometry.attributes.position = baseBoxGeometry.attributes.position;
    instancedGeometry.attributes.normal = baseBoxGeometry.attributes.normal;
    instancedGeometry.attributes.uv = baseBoxGeometry.attributes.uv;

    const originalPositions = new Float32Array(BLOCK_COUNT * 3);
    const explodedPositions = new Float32Array(BLOCK_COUNT * 3);
    const scales = new Float32Array(BLOCK_COUNT * 3);
    const rotAxes = new Float32Array(BLOCK_COUNT * 3);
    const rotSpeeds = new Float32Array(BLOCK_COUNT);
    const gridUvs = new Float32Array(BLOCK_COUNT * 2);
    const delays = new Float32Array(BLOCK_COUNT);
    const phases = new Float32Array(BLOCK_COUNT);
    const forwardWeights = new Float32Array(BLOCK_COUNT);
    const arrivalOrders = new Float32Array(BLOCK_COUNT);

    // Espaçamento de 25.0 com frestas de 5.5 units entre os cubos para expor a profundidade
    const STEP_X = 25.0 * TIER_SCALE;
    const STEP_Y = 25.0 * TIER_SCALE;
    const TOTAL_WIDTH = (COLS - 1) * STEP_X;
    const TOTAL_HEIGHT = (ROWS - 1) * STEP_Y;

    let index = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i3 = index * 3;
        const i2 = index * 2;

        // Posição no mural central alinhado na tela
        const posX = c * STEP_X - TOTAL_WIDTH / 2;
        const posY = TOTAL_HEIGHT / 2 - r * STEP_Y;

        // Relevo 3D tátil paramétrico: cubos projetados para frente e para trás em Z
        const distSq = posX * posX + posY * posY;
        const waveZ = Math.sin(c * 0.7) * Math.cos(r * 0.8) * 16.0;
        const reliefZ = Math.sin(c * 1.5 + r * 1.3) * 8.0;
        const amphitheaterCurve = -distSq * 0.00018;
        const posZ = waveZ + reliefZ + amphitheaterCurve;

        originalPositions[i3] = posX;
        originalPositions[i3 + 1] = posY;
        originalPositions[i3 + 2] = posZ;

        // Coordenadas normalizadas do mural (0..1)
        gridUvs[i2] = c / (COLS - 1);
        gridUvs[i2 + 1] = r / (ROWS - 1);

        // Posição de Explosão 3D: grande dispersão radial e profunda em Z
        const explodeDist = 1100 + Math.random() * 1600;
        const normX = posX / (Math.abs(posX) + 0.1);
        const normY = posY / (Math.abs(posY) + 0.1);
        const dirX = normX * 1.5 + (Math.random() - 0.5) * 1.6;
        const dirY = normY * 1.4 + (Math.random() - 0.5) * 1.6;
        const dirZ = (Math.random() - 0.5) * 3.4;
        const length = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ) || 1;

        explodedPositions[i3] = posX + (dirX / length) * explodeDist;
        explodedPositions[i3 + 1] = posY + (dirY / length) * explodeDist;
        explodedPositions[i3 + 2] = posZ + (dirZ / length) * explodeDist;

        scales[i3] = 1.0;
        scales[i3 + 1] = 1.0;
        scales[i3 + 2] = 1.0;

        // Eixo de rotação acrobática individual
        const rx = (Math.random() - 0.5) * 2;
        const ry = (Math.random() - 0.5) * 2;
        const rz = (Math.random() - 0.5) * 2;
        const rNorm = Math.sqrt(rx * rx + ry * ry + rz * rz) || 1;
        rotAxes[i3] = rx / rNorm;
        rotAxes[i3 + 1] = ry / rNorm;
        rotAxes[i3 + 2] = rz / rNorm;

        rotSpeeds[index] = 1.2 + Math.random() * 2.4;

        // Delay: o centro resiste mais à dispersão
        const distCenterNorm = Math.sqrt(distSq) / (TOTAL_WIDTH * 0.55);
        delays[index] = Math.min(distCenterNorm, 1.0);

        phases[index] = Math.random() * Math.PI * 2;

        // =====================================================================
        // AJUSTE 1: ~42% DOS BLOCOS RECEBEM FORÇA PARA AVANÇAR PARA FRENTE (+Z)
        // =====================================================================
        // Blocos com peso alto (0.7..1.0) disparam em direção e ultrapassam a câmera
        const isForward = Math.random() < 0.42;
        forwardWeights[index] = isForward ? 0.72 + Math.random() * 0.28 : Math.random() * 0.22;

        // =====================================================================
        // AJUSTE 2: ORDEM DE CHEGADA ESCALONADA "BLOCO POR BLOCO" (0.0 .. 1.0)
        // =====================================================================
        // Combinação de padrão radial com dispersão pseudo-aleatória equilibrada
        const radialFactor = Math.sqrt(distSq) / (TOTAL_WIDTH * 0.55);
        const pseudoRandom = Math.abs(Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1;
        // O centro começa primeiro, mas com blocos vizinhos intercalados de forma orgânica
        arrivalOrders[index] = Math.min(1.0, Math.max(0.0, radialFactor * 0.45 + pseudoRandom * 0.55));

        index++;
      }
    }

    instancedGeometry.setAttribute('aInstanceOriginalPos', new THREE.InstancedBufferAttribute(originalPositions, 3));
    instancedGeometry.setAttribute('aInstanceExplodedPos', new THREE.InstancedBufferAttribute(explodedPositions, 3));
    instancedGeometry.setAttribute('aInstanceScale', new THREE.InstancedBufferAttribute(scales, 3));
    instancedGeometry.setAttribute('aInstanceRotAxis', new THREE.InstancedBufferAttribute(rotAxes, 3));
    instancedGeometry.setAttribute('aInstanceRotSpeed', new THREE.InstancedBufferAttribute(rotSpeeds, 1));
    instancedGeometry.setAttribute('aInstanceGridUv', new THREE.InstancedBufferAttribute(gridUvs, 2));
    instancedGeometry.setAttribute('aInstanceDelay', new THREE.InstancedBufferAttribute(delays, 1));
    instancedGeometry.setAttribute('aInstancePhase', new THREE.InstancedBufferAttribute(phases, 1));
    instancedGeometry.setAttribute('aInstanceForwardWeight', new THREE.InstancedBufferAttribute(forwardWeights, 1));
    instancedGeometry.setAttribute('aInstanceArrivalOrder', new THREE.InstancedBufferAttribute(arrivalOrders, 1));

    // Paletas de Cores Temáticas Curadas com Alto Contraste e Elegância
    const THEME_HERO = {
      core: new THREE.Color('#f59e0b'), // Âmbar dourado
      edge: new THREE.Color('#38e0e0'), // Ciano elétrico
    };

    const THEMES_SERVICES = [
      // 01: Automações - Ciano Neon & Turquesa
      { core: new THREE.Color('#06b6d4'), edge: new THREE.Color('#2dd4bf') },
      // 02: Sites & Dashboards - Violeta Elétrico & Magenta
      { core: new THREE.Color('#7c3aed'), edge: new THREE.Color('#ec4899') },
      // 03: Dados & Robôs - Esmeralda & Ciano
      { core: new THREE.Color('#10b981'), edge: new THREE.Color('#06b6d4') },
      // 04: Agentes IA - Rosa Choque & Fúcsia Púrpura
      { core: new THREE.Color('#ec4899'), edge: new THREE.Color('#a855f7') },
      // 05: Personalizados - Ouro Titânio & Âmbar Laranja
      { core: new THREE.Color('#eab308'), edge: new THREE.Color('#f97316') },
    ];

    const THEME_QUEM_PODE_USAR = {
      core: new THREE.Color('#8b5cf6'), // Violeta Estratégico
      edge: new THREE.Color('#38e0e0'), // Ciano Neon
    };

    const THEME_METODOLOGIA = {
      core: new THREE.Color('#10b981'), // Esmeralda Computacional
      edge: new THREE.Color('#06b6d4'), // Ciano Ártico
    };

    const THEME_CONTATO = {
      core: new THREE.Color('#2563eb'), // Azul Cobalto Deep
      edge: new THREE.Color('#38bdf8'), // Azul Céu Elétrico
    };

    const getThemeFor = (sec: number, step: number) => {
      if (sec === 0) return THEME_HERO;
      if (sec === 1) return THEMES_SERVICES[step] || THEMES_SERVICES[0];
      if (sec === 2) return THEME_QUEM_PODE_USAR;
      if (sec === 3) return THEME_METODOLOGIA;
      if (sec === 4) return THEME_CONTATO;
      return THEME_HERO;
    };

    const currentCoreColor = new THREE.Color('#f59e0b');
    const currentEdgeColor = new THREE.Color('#38e0e0');

    const blockMaterial = new THREE.ShaderMaterial({
      vertexShader: blockVertexShader,
      fragmentShader: blockFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uGlitchIntensity: { value: 0.0 },
        uThemeCoreColor: { value: new THREE.Color('#f59e0b') },
        uThemeEdgeColor: { value: new THREE.Color('#38e0e0') },
        uExplosionForce: { value: 1.6 },
        uIsSectionTransition: { value: 1.0 },
        uIsIntroGenesis: { value: 0.0 },
        uIntroExploded: { value: 0.0 },
        uMousePos: { value: new THREE.Vector2(9999, 9999) },
        uMuralBounds: { value: new THREE.Vector2(TOTAL_WIDTH, TOTAL_HEIGHT) },
      },
      transparent: true,
      depthWrite: true,
      depthTest: true,
      side: THREE.FrontSide,
    });

    (window as unknown as { __blockMaterial: typeof blockMaterial }).__blockMaterial = blockMaterial;

    const blockMesh = new THREE.Mesh(instancedGeometry, blockMaterial);
    scene.add(blockMesh);

    // 5. Rastreamento de Mouse para Interação Tátil e Parallax
    const mouse = {
      x: 0, y: 0, targetX: 0, targetY: 0,
      worldX: 9999, worldY: 9999, targetWorldX: 9999, targetWorldY: 9999,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / width - 0.5) * 2;
      const normY = -(e.clientY / height - 0.5) * 2; // Y+ é para cima no WebGL

      mouse.targetX = normX;
      mouse.targetY = normY;

      // Desprojeção matemática precisa para o plano dos cubos
      const fovRad = (camera.fov * Math.PI) / 180;
      const halfH = Math.tan(fovRad / 2) * camera.position.z;
      const halfW = halfH * (width / height);

      mouse.targetWorldX = normX * halfW;
      mouse.targetWorldY = normY * halfH;
    };

    const handleMouseLeave = () => {
      mouse.targetWorldX = 9999;
      mouse.targetWorldY = 9999;
    };

    if (!isStaticScene) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    // 7. Loop de Renderização & Ticker
    // Orçamento de GPU: pausa de verdade (nada de requestAnimationFrame) quando a aba
    // está oculta ou quando o canvas sai da viewport, em vez de só pular o trabalho.
    let animationFrameId: number | null = null;
    let isTabVisible = !document.hidden;
    let isInViewport = true;
    const shouldRender = () => !isStaticScene && isTabVisible && isInViewport;
    const clock = new THREE.Clock();
    let smoothProgress = 0;

    const render = () => {
      const elapsedTime = clock.getElapsedTime();
      const s = stateRef.current;
      const p = s.progress;
      const curSec = s.currentSection;
      const curStep = s.serviceStep;
      const isRebobinando = s.status === 'REBOBINANDO';
      const isIdle = s.status === 'IDLE_NA_SECAO';

      // Quando a seção está em repouso (IDLE), o progresso é ESTRITAMENTE 0.0!
      // Isso elimina 100% qualquer corte para segunda animação ou blocos se remontando de fora para dentro!
      if (isIdle) {
        smoothProgress = 0.0;
      } else {
        const diff = p - smoothProgress;
        if (Math.abs(diff) < 0.001) {
          smoothProgress = p;
        } else {
          smoothProgress += diff * 0.28;
        }
      }

      // Identifica se a transição atual é mudança de seção (EXPLOSÃO 3D) ou entre serviços (GLITCH)
      // Funciona bidirecionalmente (avançando ou retrocedendo de trás para frente)
      const targetSec = s.targetSection;
      const targetStep = s.targetServiceStep;

      let isSectionTransition = false;
      let isServiceInternalGlitch = false;

      if (!isIdle) {
        // Se estamos na seção de Serviços (curSec === 1):
        if (curSec === 1) {
          // Apenas do 4º serviço para a próxima seção (targetSec === 2) ou do 1º de volta ao Hero (targetSec === 0) explodem blocos!
          if (targetSec !== 1) {
            isSectionTransition = true;
            isServiceInternalGlitch = false;
          } else {
            // Entre serviços (1->2, 2->3, 3->4 e retrocedendo 4->3, 3->2, 2->1):
            // NUNCA EXPLODE! BLOCOS ESTÁTICOS + TV COLOR BARS GLITCH!
            isSectionTransition = false;
            isServiceInternalGlitch = true;
          }
        } else {
          // Demais transições de seções (Hero -> Serv. 1, Metodologia -> Contato, etc.):
          // EXPLOSÃO 3D DE BLOCOS!
          isSectionTransition = true;
          isServiceInternalGlitch = false;
        }
      }

      // O glitch de barras de cor e tremor é uma rajada breve, cirúrgica e delimitada
      // Ativa entre 0.05 e 0.48 e dissipa rapidamente, deixando o próximo serviço perfeitamente nítido
      let glitchIntensity = 0.0;
      if (isServiceInternalGlitch && smoothProgress > 0.05 && smoothProgress < 0.48) {
        const normG = (smoothProgress - 0.05) / 0.43;
        glitchIntensity = Math.pow(Math.sin(normG * Math.PI), 1.5);
      }

      // RESOLUÇÃO DE CORES DINÂMICAS:
      // O mural começa na cor da seção/serviço atual e migra para a cor de destino (avançando ou retrocedendo!)
      const currentTheme = getThemeFor(curSec, curStep);
      const nextTheme = getThemeFor(targetSec, targetStep);

      // Transição de cor durante o voo / glitch:
      // Seção: nos primeiros 35% de progresso, explode na cor de saída; de 35% a 46% migra para o tema de destino.
      // Serviços (glitch breve): a cor migra rapidamente entre 0.10 e 0.42
      let colorProgress = 0.0;
      if (s.status === 'TRANSICIONANDO' || isRebobinando) {
        if (isSectionTransition) {
          colorProgress = Math.min(1.0, Math.max(0.0, (smoothProgress - 0.35) / 0.11));
        } else {
          colorProgress = Math.min(1.0, Math.max(0.0, (smoothProgress - 0.10) / 0.32));
        }
      }

      const targetCore = currentTheme.core.clone().lerp(nextTheme.core, colorProgress);
      const targetEdge = currentTheme.edge.clone().lerp(nextTheme.edge, colorProgress);

      currentCoreColor.lerp(targetCore, 0.22);
      currentEdgeColor.lerp(targetEdge, 0.22);

      blockMaterial.uniforms.uThemeCoreColor.value.copy(currentCoreColor);
      blockMaterial.uniforms.uThemeEdgeColor.value.copy(currentEdgeColor);
      blockMaterial.uniforms.uTime.value = elapsedTime;
      blockMaterial.uniforms.uProgress.value = smoothProgress;
      blockMaterial.uniforms.uGlitchIntensity.value = glitchIntensity;
      blockMaterial.uniforms.uIsSectionTransition.value = isSectionTransition ? 1.0 : 0.0;
      blockMaterial.uniforms.uIsIntroGenesis.value = s.isIntroGenesis ? 1.0 : 0.0;
      blockMaterial.uniforms.uIntroExploded.value = s.introExploded ? 1.0 : 0.0;
      blockMaterial.uniforms.uExplosionForce.value = isRebobinando ? 2.6 : 1.6;

      // Suavização do mouse com inércia física orgânica
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      mouse.worldX += (mouse.targetWorldX - mouse.worldX) * 0.08;
      mouse.worldY += (mouse.targetWorldY - mouse.worldY) * 0.08;

      blockMaterial.uniforms.uMousePos.value.set(mouse.worldX, mouse.worldY);

      blockMesh.rotation.y = mouse.x * 0.05 + Math.sin(elapsedTime * 0.25) * 0.008;
      blockMesh.rotation.x = -mouse.y * 0.04 + Math.cos(elapsedTime * 0.2) * 0.006;

      // Renderização direta da cena 3D na tela com 100% de visibilidade e fluência
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      // Só reagenda o próximo frame se a aba estiver visível e o canvas na viewport —
      // caso contrário o loop para de verdade (nenhum requestAnimationFrame pendente).
      animationFrameId = shouldRender() ? requestAnimationFrame(render) : null;
    };

    const resumeRenderIfNeeded = () => {
      if (animationFrameId === null && shouldRender()) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      resumeRenderIfNeeded();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
        resumeRenderIfNeeded();
      },
      { threshold: 0 }
    );
    viewportObserver.observe(container);

    render();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = window.visualViewport?.height || container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderTarget.setSize(width, height);
      postMaterial.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      viewportObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);

      baseBoxGeometry.dispose();
      instancedGeometry.dispose();
      blockMaterial.dispose();
      postMaterial.dispose();
      renderTarget.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ height: '100dvh' }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          filter: isBlurred
            ? 'blur(0.5px) brightness(0.85) saturate(1.06)'
            : 'blur(0px) brightness(1.0) saturate(1.0)',
          transform: isBlurred ? 'scale(1.005)' : 'scale(1.0)',
          transition: 'filter 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}
