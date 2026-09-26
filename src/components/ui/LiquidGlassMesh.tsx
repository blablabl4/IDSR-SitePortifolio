'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { liquidGlassVertexShader, liquidGlassFragmentShader } from '@/scenes/LiquidGlassShader';

interface LiquidGlassMeshProps {
  className?: string;
  refractionStrength?: number;
  dispersionStrength?: number;
  children?: React.ReactNode;
}

export function LiquidGlassMesh({
  className = '',
  refractionStrength = 0.07,
  dispersionStrength = 0.02,
  children,
}: LiquidGlassMeshProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Fallback gracioso se WebGL não for suportado
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 2.75);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRefraction: { value: refractionStrength },
      uDispersion: { value: dispersionStrength },
      uGlassOpacity: { value: 0.12 },
      uHover: { value: 0 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: liquidGlassVertexShader,
      fragmentShader: liquidGlassFragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const quad = new THREE.Mesh(geometry, material);
    // Leve ângulo de repouso (2 a 4 graus) para dar profundidade de cena
    quad.rotation.set(0.045, -0.035, 0.0);
    scene.add(quad);

    let animationFrameId: number;
    const clock = new THREE.Clock();
    let targetHover = 0;
    let currentHover = 0;
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const currentMouse = new THREE.Vector2(0.5, 0.5);

    const render = () => {
      const delta = clock.getDelta();
      uniforms.uTime.value += delta;

      // Drift de repouso: ciclo senoidal contínuo de 8-10s
      quad.position.y = Math.sin(uniforms.uTime.value * 0.75) * 0.02;

      // Interpolação suave do mouse e do hover
      currentHover += (targetHover - currentHover) * 0.08;
      uniforms.uHover.value = currentHover;

      currentMouse.lerp(targetMouse, 0.08);
      uniforms.uMouse.value.copy(currentMouse);

      renderer?.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Eventos de Ponteiro
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse.set(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)));
    };

    const handleMouseEnter = () => {
      targetHover = 1.0;
    };

    const handleMouseLeave = () => {
      targetHover = 0.0;
      targetMouse.set(0.5, 0.5);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Redimensionamento
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && renderer) {
          renderer.setSize(newW, newH);
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          uniforms.uResolution.value.set(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      geometry.dispose();
      material.dispose();
      renderer?.dispose();
    };
  }, [refractionStrength, dispersionStrength]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-white/20 border-t-white/35 backdrop-blur-[16px] bg-white/[0.08] transition-all duration-300 ${className}`}
    >
      {/* Three.js Canvas em segundo plano do vidro líquido */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full opacity-85 z-0"
        aria-hidden="true"
      />

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
