'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';

export interface Message {
    id: string;
    role: 'bot' | 'user';
    text: string;
    type?: 'text' | 'options';
    options?: { label: string; value: any }[];
}

interface ChatInterfaceProps {
    messages: Message[];
    onOptionSelect: (value: any) => void;
    onTextSubmit?: (text: string) => void;
    isTyping?: boolean;
    onStartDiagnosis?: () => void;
}

export function ChatInterface({ messages, onOptionSelect, onTextSubmit, isTyping, onStartDiagnosis }: ChatInterfaceProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const showSuggestions = messages.length === 0;

    return (
        <div className="flex flex-col h-full bg-transparent relative">

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>

                {/* Empty State / Suggestions */}
                {showSuggestions && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-8 animate-in fade-in duration-700">
                        <div className="w-12 h-12 bg-[#0a0a0a] border border-[#E7ECEF]/10 rounded-xl flex items-center justify-center shadow-lg shadow-[#0B3B2E]/10">
                            <Sparkles className="w-5 h-5 text-[#0B3B2E]" />
                        </div>

                        {/* Typewriter Header */}
                        <h2 className="text-xl font-light text-[#E7ECEF] text-center h-8">
                            <TypewriterEffect words={[{ text: "Como posso ajudar você hoje?" }]} />
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl">
                            <button
                                onClick={onStartDiagnosis}
                                className="text-left p-4 rounded-xl border border-[#E7ECEF]/10 bg-[#0a0a0a] hover:bg-[#E7ECEF]/5 hover:border-[#0B3B2E]/40 transition-all group"
                            >
                                <h4 className="text-[#E7ECEF] text-sm font-medium mb-1 group-hover:text-[#0B3B2E] transition-colors flex items-center gap-2">
                                    Diagnosticar Agora <span className="opacity-0 group-hover:opacity-100 transition-opacity">⚡</span>
                                </h4>
                                <p className="text-[#E7ECEF]/30 text-[10px] uppercase tracking-wide">Identificar Gaps & Soluções</p>
                            </button>
                            {/* Other buttons simpler */}
                            <button className="text-left p-4 rounded-xl border border-[#E7ECEF]/10 bg-[#0a0a0a] hover:bg-[#E7ECEF]/5 transition-all opacity-60 hover:opacity-100">
                                <h4 className="text-[#E7ECEF] text-sm font-medium mb-1">Entender produtos</h4>
                            </button>
                            <button className="text-left p-4 rounded-xl border border-[#E7ECEF]/10 bg-[#0a0a0a] hover:bg-[#E7ECEF]/5 transition-all opacity-60 hover:opacity-100">
                                <h4 className="text-[#E7ECEF] text-sm font-medium mb-1">Suporte Técnico</h4>
                            </button>
                            <button className="text-left p-4 rounded-xl border border-[#E7ECEF]/10 bg-[#0a0a0a] hover:bg-[#E7ECEF]/5 transition-all opacity-60 hover:opacity-100">
                                <h4 className="text-[#E7ECEF] text-sm font-medium mb-1">Planos & Preços</h4>
                            </button>
                        </div>
                    </div>
                )}

                {/* ... Message bubbles, logic remains, just tweaking colors ... */}
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                                "flex w-full",
                                msg.role === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "flex max-w-[85%] md:max-w-[70%] items-start gap-3",
                                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                            )}>
                                {/* Avatar (Minimal) */}
                                <div className={cn(
                                    "w-6 h-6 rounded-md flex items-center justify-center shrink-0 border",
                                    msg.role === 'user'
                                        ? "bg-[#0B3B2E]/10 border-[#0B3B2E]/30 text-[#0B3B2E]"
                                        : "bg-[#E7ECEF]/10 border-[#E7ECEF]/10 text-[#E7ECEF]"
                                )}>
                                    {msg.role === 'user' ? <User size={12} /> : <Sparkles size={12} />}
                                </div>

                                {/* Bubble (Obsidian/Glass, not solid green) */}
                                <div className="space-y-3">
                                    <div className={cn(
                                        "p-3 rounded-xl text-sm leading-relaxed backdrop-blur-md border",
                                        msg.role === 'user'
                                            ? "bg-[#0B3B2E]/10 border-[#0B3B2E]/20 text-[#E7ECEF]" /* User: Dark Green Glass */
                                            : "bg-[#0a0a0a] border-[#E7ECEF]/10 text-[#E7ECEF]" /* Bot: Obsidian + Thin Border */
                                    )}>
                                        {msg.text}
                                    </div>

                                    {/* Chips (Accent Outlined) */}
                                    {msg.type === 'options' && msg.options && (
                                        <div className="flex flex-wrap gap-2">
                                            {msg.options.map((opt) => (
                                                <button
                                                    key={opt.label}
                                                    onClick={() => onOptionSelect(opt.value)}
                                                    className="px-3 py-1.5 bg-transparent border border-[#E7ECEF]/10 rounded-lg text-xs text-[#E7ECEF]/70 hover:border-[#0B3B2E] hover:text-[#0B3B2E] transition-all"
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="flex gap-2 ml-9">
                        <span className="w-1 h-1 bg-[#E7ECEF] rounded-full animate-bounce" />
                        <span className="w-1 h-1 bg-[#E7ECEF] rounded-full animate-bounce delay-75" />
                        <span className="w-1 h-1 bg-[#E7ECEF] rounded-full animate-bounce delay-150" />
                    </motion.div>
                )}
            </div>

            {/* Input Area (Text Fallback) */}
            <div className="p-4 border-t border-[#E7ECEF]/5 bg-[#0a0a0a]">
                <form className="relative flex items-center opacity-50">
                    <input
                        type="text"
                        placeholder="Aguarde..."
                        className="w-full bg-transparent border-none text-[#E7ECEF] text-sm focus:ring-0 px-0"
                        disabled
                    />
                </form>
            </div>

        </div>
    );
}
