'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassSectionProps {
    children: React.ReactNode;
    className?: string;
}

export function GlassSection({ children, className }: GlassSectionProps) {
    return (
        <section
            className={cn(
                "relative w-full",
                className
            )}
            style={{
                background: 'rgba(15, 15, 15, 0.6)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
        >
            {children}
        </section>
    );
}
