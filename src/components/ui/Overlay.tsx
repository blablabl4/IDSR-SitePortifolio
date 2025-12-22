'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverlayProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    fullScreen?: boolean;
}

export function Overlay({ isOpen, onClose, children, className, fullScreen = false }: OverlayProps) {
    useEffect(() => {
        if (isOpen) {
            // Only scroll to top for fullscreen modals to center them
            if (fullScreen) {
                // Use requestAnimationFrame to ensure layout is ready
                requestAnimationFrame(() => {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                });
            }
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, fullScreen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 w-screen h-screen z-50 bg-[#0a0a0a]/90 backdrop-blur-md"
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "fixed z-50 overflow-hidden",
                            fullScreen
                                ? "left-0 right-0 top-1/2 -translate-y-1/2 mx-4 md:mx-8 max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] rounded-2xl bg-[#0a0a0a] border border-[#E7ECEF]/10 shadow-2xl shadow-black/50 flex flex-col"
                                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0a0a0a] rounded-2xl border border-[#E7ECEF]/10 p-6",
                            className
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#E7ECEF]/5 transition-colors z-10"
                        >
                            <X className="w-5 h-5 text-[#E7ECEF]/40 hover:text-[#E7ECEF]" />
                        </button>

                        <div className="h-full overflow-y-auto custom-scrollbar relative">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
