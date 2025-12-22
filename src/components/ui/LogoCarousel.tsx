'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ClientLogo {
    src: string;
    alt: string;
}

interface LogoCarouselProps {
    logos: ClientLogo[];
    className?: string;
}

export function LogoCarousel({ logos, className }: LogoCarouselProps) {
    // Duplicate logos for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div
                className="flex items-center gap-12 animate-scroll"
                style={{
                    width: 'max-content',
                }}
            >
                {duplicatedLogos.map((logo, i) => (
                    <div
                        key={i}
                        className="w-24 h-16 flex items-center justify-center shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                    >
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={96}
                            height={64}
                            className="object-contain w-full h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
