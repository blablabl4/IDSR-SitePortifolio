'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function GrafoDadosHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 80;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Nodes Generation
    const nodeCount = 36;
    const nodes: THREE.Vector3[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x4ade80 });

    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35
      );
      nodes.push(pos);

      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      mesh.position.copy(pos);
      nodesGroup.add(mesh);
    }

    // 4. Edges / Lines between close nodes
    const linePositions: number[] = [];
    const maxDist = 32;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < maxDist) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x25384f,
      transparent: true,
      opacity: 0.5,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // 5. Data Packets (pulsing light particles traveling on lines)
    const packetCount = 12;
    const packetGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const packetMaterial = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const packets: { mesh: THREE.Mesh; pA: THREE.Vector3; pB: THREE.Vector3; progress: number; speed: number }[] = [];

    for (let k = 0; k < packetCount; k++) {
      const idxA = Math.floor(Math.random() * nodeCount);
      const idxB = (idxA + 1 + Math.floor(Math.random() * (nodeCount - 1))) % nodeCount;
      const mesh = new THREE.Mesh(packetGeometry, packetMaterial);
      scene.add(mesh);
      packets.push({
        mesh,
        pA: nodes[idxA],
        pB: nodes[idxB],
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
      });
    }

    // 6. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 8;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Subtle slow rotation of network
      nodesGroup.rotation.y += 0.001;
      lineSegments.rotation.y += 0.001;

      // Parallax easing
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Packets motion
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        p.mesh.position.lerpVectors(p.pA, p.pB, p.progress);
      });

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || 600;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      packetGeometry.dispose();
      packetMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden"
      aria-hidden="true"
    />
  );
}
