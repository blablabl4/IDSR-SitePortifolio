'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function GlassHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ height: 80, opacity: 0, y: -20 }}
            animate={{
                height: isScrolled ? 56 : 80,
                opacity: 1,
                y: 0
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 border-b border-[#E7ECEF]/5"
            style={{
                background: 'rgba(10, 10, 10, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            }}
        >
            {/* Logo */}
            <Link href="/">
                <motion.span
                    animate={{ scale: isScrolled ? 0.9 : 1 }}
                    className="font-semibold text-xs uppercase tracking-[0.2em] text-[#E7ECEF] flex items-center gap-2 cursor-pointer"
                >
                    <div className="w-2 h-2 bg-[#0B3B2E] rounded-full shadow-[0_0_8px_#0B3B2E]" />
                    IDSR
                </motion.span>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] text-[#E7ECEF]/50 font-medium">
                <Link href="/produtos" className="hover:text-[#E7ECEF] transition-colors">
                    Produtos
                </Link>
                <Link href="/precos" className="hover:text-[#E7ECEF] transition-colors">
                    Preços
                </Link>
                <Link href="/sobre" className="hover:text-[#E7ECEF] transition-colors">
                    Sobre
                </Link>
                <Link href="/contato" className="hover:text-[#E7ECEF] transition-colors">
                    Contato
                </Link>
            </nav>
        </motion.header>
    );
}
