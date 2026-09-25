'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '@/motion-system-idsr';
import { SectionHeader } from '@/components/ui/SectionHeader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContatoSimples() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    segmento: 'varejo',
    mensagem: '',
  });

  const [loading, setLoading] = useState(false);
  const [ticketResult, setTicketResult] = useState<{
    ticketId: string;
    whatsappUrl?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (headerRef.current) {
          gsap.from(headerRef.current.children, {
            opacity: 0,
            y: MOTION.distance.small,
            duration: MOTION.duration.base,
            stagger: MOTION.stagger.normal,
            ease: MOTION.ease.out,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }

        if (formRef.current) {
          gsap.from(formRef.current, {
            opacity: 0,
            y: MOTION.distance.medium,
            scale: 0.98,
            duration: MOTION.duration.base,
            ease: MOTION.ease.out,
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from([headerRef.current, formRef.current], {
          opacity: 0,
          duration: MOTION.duration.base,
          stagger: MOTION.stagger.normal,
          ease: 'none',
        });
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao registrar solicitação.');
      }

      setTicketResult({
        ticketId: data.ticketId,
        whatsappUrl: data.whatsappUrl,
      });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Falha na conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-24 px-6 sm:px-12 bg-[#0a0a0b] relative"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader index="05" label="CONTATO DIRETO" />

        <div ref={headerRef} className="text-center mb-12" data-reveal="header">
          <h2
            className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.03em] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Inicie seu <span className="text-aurora">diagnóstico de automação.</span>
          </h2>
          <p className="mt-3 text-base text-white/70 max-w-xl mx-auto font-sans">
            Sem intermediários comerciais. Converse diretamente com quem projeta e implementa a arquitetura dos seus fluxos.
          </p>
        </div>

        {/* Success Protocol Card */}
        {ticketResult ? (
          <div
            className="p-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl text-center max-w-xl mx-auto animate-in fade-in duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 text-white text-2xl flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <span className="font-mono text-xs text-[#38e0e0] tracking-widest uppercase block mb-1">
              DEMANDA REGISTRADA COM SUCESSO
            </span>
            <h3 className="text-2xl font-sans font-bold text-white mb-2">
              Protocolo: <span className="font-mono text-[#7c6cf6]">{ticketResult.ticketId}</span>
            </h3>
            <p className="text-sm text-white/70 mb-6 font-sans leading-relaxed">
              Sua solicitação foi indexada em nossa central. Para atendimento prioritário imediato, acione o WhatsApp com seu protocolo:
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {ticketResult.whatsappUrl && (
                <a
                  href={ticketResult.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-white text-black font-semibold text-xs tracking-wider transition-colors inline-flex items-center justify-center gap-2 hover:bg-white/90"
                >
                  <span>ACIONAR WHATSAPP IMEDIATO</span>
                  <span>↗</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setTicketResult(null)}
                className="px-4 py-3 rounded-lg border border-white/15 text-xs font-mono text-white/70 hover:text-white transition-colors"
              >
                NOVO CONTATO
              </button>
            </div>
          </div>
        ) : (
          /* Liquid Glass Form */
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            data-reveal="card"
            data-cursor="contato"
            className="p-8 sm:p-10 rounded-2xl relative overflow-hidden space-y-6 max-w-2xl mx-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderTopColor: 'rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 50px -10px rgba(0,0,0,0.7)',
            }}
          >
            {/* Top Specular Shine */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">
                  SEU NOME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Carlos Mendes"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 text-white text-sm font-sans focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">
                  WHATSAPP / TELEFONE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 text-white text-sm font-sans focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">
                  EMAIL CORPORATIVO *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="carlos@empresa.com.br"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 text-white text-sm font-sans focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">
                  EMPRESA *
                </label>
                <input
                  type="text"
                  required
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  placeholder="Nome da sua empresa"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 text-white text-sm font-sans focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase tracking-wider">
                DESCREVA O PROCESSO OU GARGALO MANUAL *
              </label>
              <textarea
                required
                rows={3}
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                placeholder="Descreva o processo manual, os sistemas que deseja integrar ou o fluxo a ser automatizado..."
                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 text-white text-sm font-sans focus:outline-none focus:border-white/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-white hover:bg-white/90 disabled:opacity-50 text-black font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_4px_25px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              {loading ? 'REGISTRANDO PROTOCOLO...' : 'ENVIAR & GERAR PROTOCOLO ↵'}
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-2">
              <span>✓ CONFORMIDADE LGPD</span>
              <span>RESPOSTA EM &lt; 2 HORAS</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
