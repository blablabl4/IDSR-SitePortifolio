'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/contact-config';

const NAV_LINKS = [
  { href: '/produtos', label: 'Produtos', accent: false },
  { href: '/precos', label: 'Preços', accent: false },
  { href: '/sobre', label: 'Sobre', accent: false },
  { href: '/manifesto', label: 'Manifesto', accent: true },
  { href: '/suporte', label: 'Suporte', accent: false },
  { href: '/contato', label: 'Contato', accent: false },
];

export function GlassHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change or resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.header
                initial={{ height: 80, opacity: 0, y: -20 }}
                animate={{
                    height: isScrolled ? 60 : 80,
                    opacity: 1,
                    y: 0
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 border-b border-[#E7ECEF]/5"
                style={{
                    background: 'rgba(10, 10, 10, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <motion.span
                        animate={{ scale: isScrolled ? 0.95 : 1 }}
                        className="font-semibold text-xs uppercase tracking-[0.2em] text-[#E7ECEF] flex items-center gap-2 cursor-pointer"
                    >
                        <div className="w-2.5 h-2.5 bg-[#0D7C66] rounded-full shadow-[0_0_10px_#0D7C66] animate-pulse" />
                        IDSR
                    </motion.span>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] text-[#E7ECEF]/60 font-medium">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={
                                link.accent
                                    ? 'hover:text-[#B8956A] text-[#B8956A]/90 transition-colors'
                                    : 'hover:text-[#E7ECEF] transition-colors'
                            }
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <a
                        href={getWhatsAppUrl({ origem: 'header' })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex px-3.5 py-1.5 rounded-lg bg-[#0D7C66]/20 border border-[#0D7C66]/40 hover:bg-[#0D7C66]/40 text-[#E7ECEF] text-xs font-medium transition-all items-center gap-1.5 cursor-pointer"
                    >
                        <span>Falar no WhatsApp</span>
                        <ArrowRight className="w-3 h-3 text-[#0D7C66]" />
                    </a>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg bg-[#111111] border border-[#2a2a2a] text-[#E7ECEF]/70 hover:text-[#E7ECEF] transition-colors cursor-pointer"
                        aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/70 backdrop-blur-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                            className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#0c0c0c] border-l border-[#2a2a2a] pt-24 px-8 flex flex-col gap-2 shadow-2xl"
                        >
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                            link.accent
                                                ? 'text-[#B8956A] bg-[#B8956A]/5'
                                                : 'text-[#E7ECEF]/70 hover:text-[#E7ECEF] hover:bg-[#111111]'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="border-t border-[#2a2a2a] mt-4 pt-4">
                                <a
                                    href={getWhatsAppUrl({ origem: 'header' })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full px-4 py-3 rounded-xl bg-[#0D7C66] text-white text-sm font-medium text-center transition-all hover:bg-[#0F5A47] shadow-lg shadow-[#0D7C66]/20 cursor-pointer"
                                >
                                    Falar no WhatsApp
                                </a>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
