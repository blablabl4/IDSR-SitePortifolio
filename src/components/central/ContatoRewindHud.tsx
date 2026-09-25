'use client';

import React, { useState } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { DustText } from '@/components/ui/DustText';

import { CONTACT_CONFIG, getWhatsAppUrl } from '@/lib/contact-config';
import { MessageSquare, ArrowUpRight, Clock, ShieldCheck, Cpu } from 'lucide-react';

export function ContatoRewindHud() {
  const { status } = useTransition();
  const isIdle = status === 'IDLE_NA_SECAO';

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          empresa: 'Geral',
          segmento: 'outros',
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-12 py-3 sm:py-6 overflow-hidden select-none">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center z-10">
        {/* Coluna Esquerda: Badge + Título + Subtítulo + Canal WhatsApp Sênior */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/35 bg-sky-500/10 text-sky-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase w-fit backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>CANAL DIRETO · ENGENHARIA</span>
          </div>

          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-white tracking-[-0.03em] leading-[1.12] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <DustText
              text="Canal Direto & Diagnóstico Técnico"
              accentColor="#38bdf8"
              glowColor="#2563eb"
              delay={80}
              stagger={12}
              active={isIdle}
            />
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            <DustText
              text="Vamos construir o seu próximo patamar. Fale diretamente com quem arquiteta e desenvolve as soluções da sua empresa, sem intermediários e sem ruídos."
              mode="words"
              accentColor="#38bdf8"
              delay={260}
              stagger={14}
              active={isIdle}
            />
          </p>

          <div className="pt-2 flex flex-col gap-3">
            {/* Card Técnico de Contato Direto com Fundo Escuro Sólido */}
            <a
              href={getWhatsAppUrl({ origem: 'home' })}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="whatsapp"
              className="relative overflow-hidden p-4 sm:p-5 rounded-2xl border border-white/[0.12] bg-[#08090e]/95 backdrop-blur-2xl hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.85)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE // SLA RETORNO &lt; 2H</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="block font-mono text-xs font-bold text-white group-hover:text-emerald-300 transition-colors uppercase tracking-wider">
                    WHATSAPP COM ROCHA // ARQUITETURA
                  </span>
                  <span className="block text-xs text-zinc-400 font-sans mt-0.5">
                    {CONTACT_CONFIG.whatsappDisplay} · Atendimento direto pelo fundador
                  </span>
                </div>
              </div>
            </a>

            {/* Selos Técnicos de Confiança com Ícones Vetoriais e Fundo Sólido */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] bg-[#08090e]/92 backdrop-blur-xl">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wide">
                  TRIAGEM &lt; 2H
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] bg-[#08090e]/92 backdrop-blur-xl">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wide">
                  SIGILO & LGPD
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] bg-[#08090e]/92 backdrop-blur-xl">
                <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wide">
                  SOB MEDIDA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Modal de Vidro do Formulário de Diagnóstico */}
        <div className="lg:col-span-6 relative rounded-2xl border border-white/[0.12] bg-[#08090e]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
          {/* Topo do Modal */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3.5">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
              FORMULÁRIO DE DIAGNÓSTICO TÉCNICO
            </span>
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-sky-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>TERMINAL ROCHA // ONLINE</span>
            </div>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-2.5">
              <span className="w-12 h-12 rounded-full bg-[#38e0e0]/20 text-[#38e0e0] flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </span>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                PROTOCOLO TRANSMITIDO COM SUCESSO
              </h3>
              <p className="font-sans text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                Sua mensagem foi entregue diretamente ao terminal de engenharia do Rocha. Retornaremos em menos de 2 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                  Seu Nome ou Empresa
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Carlos Mendes · FinTech X"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#040407] text-zinc-100 font-mono text-xs focus:outline-none focus:border-[#38e0e0] focus:ring-1 focus:ring-[#38e0e0]/50 transition-all placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                  Seu WhatsApp de Retorno
                </label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="(11) 98342-6767"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#040407] text-zinc-100 font-mono text-xs focus:outline-none focus:border-[#38e0e0] focus:ring-1 focus:ring-[#38e0e0]/50 transition-all placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] sm:text-[10px] text-white/60 uppercase tracking-wider mb-1">
                  Qual o gargalo ou projeto a ser resolvido?
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  placeholder="Descreva brevemente o que você precisa automatizar ou integrar..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/50 text-white font-mono text-xs focus:outline-none focus:border-[#38e0e0] focus:ring-1 focus:ring-[#38e0e0]/50 transition-all resize-none placeholder:text-white/30"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                data-cursor="enviar"
                className="w-full py-3 rounded-xl bg-white hover:bg-[#38e0e0] text-black font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(56,224,224,0.4)] active:scale-98"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {submitting ? 'ENVIANDO PROTOCOLO...' : 'ENVIAR AO ROCHA [DIRETO]'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
