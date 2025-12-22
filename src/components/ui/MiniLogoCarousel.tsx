'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ClientLogo {
    src: string;
    alt: string;
}

interface MiniLogoCarouselProps {
    logos: ClientLogo[];
    autoPlayInterval?: number;
    className?: string;
}

export function MiniLogoCarousel({
    logos,
    autoPlayInterval = 3000,
    className
}: MiniLogoCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, [logos.length]);

    // Auto-play
    useEffect(() => {
        if (logos.length <= 1) return;
        const interval = setInterval(next, autoPlayInterval);
        return () => clearInterval(interval);
    }, [next, autoPlayInterval, logos.length]);

    // Get 3 visible logos (prev, current, next)
    const getVisibleLogos = () => {
        if (logos.length === 0) return [];
        if (logos.length === 1) return [{ ...logos[0], position: 'center', originalIndex: 0 }];
        if (logos.length === 2) {
            return [
                { ...logos[(currentIndex) % logos.length], position: 'left', originalIndex: (currentIndex) % logos.length },
                { ...logos[(currentIndex + 1) % logos.length], position: 'right', originalIndex: (currentIndex + 1) % logos.length },
            ];
        }

        const prevIndex = (currentIndex - 1 + logos.length) % logos.length;
        const nextIndex = (currentIndex + 1) % logos.length;

        return [
            { ...logos[prevIndex], position: 'left', originalIndex: prevIndex },
            { ...logos[currentIndex], position: 'center', originalIndex: currentIndex },
            { ...logos[nextIndex], position: 'right', originalIndex: nextIndex },
        ];
    };

    const visibleLogos = getVisibleLogos();

    const getScale = (position: string, isHovered: boolean) => {
        if (isHovered) return 1.1;
        if (position === 'center') return 1;
        return 0.7;
    };

    const getOpacity = (position: string, isHovered: boolean) => {
        if (isHovered) return 1;
        if (position === 'center') return 0.8;
        return 0.4;
    };

    return (
        <div className={cn("flex items-center justify-center md:justify-end gap-6", className)}>
            {visibleLogos.map((logo, i) => {
                const isHovered = hoveredIndex === logo.originalIndex;

                return (
                    <motion.div
                        key={logo.originalIndex}
                        animate={{
                            scale: getScale(logo.position, isHovered),
                            opacity: getOpacity(logo.position, isHovered),
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onMouseEnter={() => setHoveredIndex(logo.originalIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={cn(
                            "cursor-pointer transition-all duration-500",
                            isHovered ? "" : "grayscale"
                        )}
                    >
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={logo.position === 'center' ? 100 : 80}
                            height={logo.position === 'center' ? 100 : 80}
                            className="object-contain"
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
