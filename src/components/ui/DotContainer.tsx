'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface DotContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function DotContainer({ children, className }: DotContainerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const animationId = useRef<number | undefined>(undefined);

    // Intersection Observer to pause when off-screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let mouseX = -1000;
        let mouseY = -1000;
        let time = 0;

        const dots: { x: number; y: number; bx: number; by: number }[] = [];
        const spacing = 20; // Reduced from 30 to get more dots

        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            dots.length = 0;
            for (let x = 0; x < canvas.width; x += spacing) {
                for (let y = 0; y < canvas.height; y += spacing) {
                    dots.push({ x, y, bx: x, by: y });
                }
            }
        };

        const animate = () => {
            if (!canvas || !ctx) return;

            // Pause animation if not visible
            if (!isVisible) {
                animationId.current = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            time += 0.015;

            // Center of canvas for radial wave
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Breathing effect - global pulse
            const breathingPulse = Math.sin(time * 0.8) * 0.3;

            for (const dot of dots) {
                // Distance from center for radial wave
                const dcx = dot.bx - centerX;
                const dcy = dot.by - centerY;
                const distFromCenter = Math.sqrt(dcx * dcx + dcy * dcy);

                // Radial wave emanating from center
                const waveFrequency = 0.01;
                const radialWave = Math.sin(distFromCenter * waveFrequency - time * 2) * 0.6;

                // Mouse interaction
                const dx = mouseX - dot.bx;
                const dy = mouseY - dot.by;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const maxDist = 120;
                let scale = 1;
                let alpha = 0.25;

                // Combine breathing + radial wave
                const combinedWave = breathingPulse + radialWave;

                scale = 0.7 + combinedWave * 0.4;
                alpha = 0.2 + Math.abs(combinedWave) * 0.15;

                // Mouse hover effect (adds to ambient)
                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    scale += force * 1.5;
                    alpha += force * 0.5;
                }

                // Clamp values
                scale = Math.max(0.3, Math.min(2.5, scale));
                alpha = Math.max(0.1, Math.min(0.8, alpha));

                ctx.fillStyle = `rgba(11, 59, 46, ${alpha})`;
                ctx.beginPath();
                ctx.arc(dot.bx, dot.by, 1.5 * scale, 0, Math.PI * 2);
                ctx.fill();
            }

            animationId.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        window.addEventListener('resize', resize);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        // ResizeObserver to handle container size changes (e.g., modal expansion)
        const resizeObserver = new ResizeObserver(() => {
            resize();
        });
        resizeObserver.observe(container);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            resizeObserver.disconnect();
            if (animationId.current) {
                cancelAnimationFrame(animationId.current);
            }
        };
    }, [isVisible]);

    return (
        <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
