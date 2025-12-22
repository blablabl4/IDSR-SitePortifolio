'use client';

import React, { useEffect, useRef } from 'react';

export function AntigravityBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let mouseX = 0;
        let mouseY = 0;
        let w = 0;
        let h = 0;

        const dots: { x: number; y: number; bx: number; by: number }[] = [];
        const spacing = 25; // Tighter grid

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            dots.length = 0;
            for (let x = 0; x < w; x += spacing) {
                for (let y = 0; y < h; y += spacing) {
                    dots.push({ x, y, bx: x, by: y });
                }
            }
        };

        const draw = () => {
            if (!ctx) return;
            // Draw background first
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, w, h);

            for (const dot of dots) {
                const dx = mouseX - dot.bx;
                const dy = mouseY - dot.by;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const maxDist = 150;
                let scale = 1;
                let alpha = 0.4; // Base alpha for visibility

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    scale = 1 + force * 2;
                    alpha = 0.4 + force * 0.6; // Brighten on hover
                }

                // Dot color: #022b22 with variable alpha
                ctx.fillStyle = `rgba(2, 43, 34, ${alpha})`;

                ctx.beginPath();
                ctx.arc(dot.bx, dot.by, 1.5 * scale, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
