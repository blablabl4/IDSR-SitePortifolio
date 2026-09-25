'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PainPoint {
    pain: string;
    solution: string;
}

interface PainCarouselProps {
    items: PainPoint[];
    autoPlayInterval?: number;
    className?: string;
}

export function PainCarousel({ items, autoPlayInterval = 4000, className }: PainCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const next = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    const togglePause = () => setIsPaused(!isPaused);

    // Auto-play
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(next, autoPlayInterval);
        return () => clearInterval(interval);
    }, [isPaused, next, autoPlayInterval]);

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 100 : -100,
            opacity: 0
        })
    };

    return (
        <div
            className={cn("relative w-full", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Side Button - Left */}
            <motion.button
                onClick={prev}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.2 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{
                    background: 'rgba(10, 10, 10, 0.6)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(231, 236, 239, 0.1)'
                }}
                aria-label="Anterior"
            >
                <ChevronLeft className="w-5 h-5 text-[#E7ECEF]/70" />
            </motion.button>

            {/* Side Button - Right */}
            <motion.button
                onClick={next}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.2 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{
                    background: 'rgba(10, 10, 10, 0.6)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(231, 236, 239, 0.1)'
                }}
                aria-label="Próximo"
            >
                <ChevronRight className="w-5 h-5 text-[#E7ECEF]/70" />
            </motion.button>

            {/* Main Content */}
            <div className="relative overflow-hidden min-h-[180px] flex items-center justify-center px-16">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 30,
                            mass: 0.8
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                    >
                        {/* Pain */}
                        <p className="text-lg md:text-xl text-[#E7ECEF]/50 font-light mb-4 max-w-2xl italic">
                            &quot;{items[currentIndex].pain}&quot;
                        </p>
                        {/* Solution */}
                        <p className="text-xl md:text-2xl font-extralight text-[#E7ECEF] max-w-2xl leading-relaxed">
                            {items[currentIndex].solution}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots + Pause Control */}
            <div className="flex items-center justify-center gap-3 mt-6">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                        }}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            i === currentIndex
                                ? "bg-[#0B3B2E] w-6"
                                : "bg-[#E7ECEF]/20 hover:bg-[#E7ECEF]/40"
                        )}
                        aria-label={`Ir para item ${i + 1}`}
                    />
                ))}

                <div className="w-px h-4 bg-[#E7ECEF]/10 mx-2" />

                <button
                    onClick={togglePause}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#E7ECEF]/5 transition-colors"
                    aria-label={isPaused ? "Reproduzir" : "Pausar"}
                >
                    {isPaused ? (
                        <Play className="w-3 h-3 text-[#E7ECEF]/40" />
                    ) : (
                        <Pause className="w-3 h-3 text-[#E7ECEF]/40" />
                    )}
                </button>
            </div>
        </div>
    );
}
