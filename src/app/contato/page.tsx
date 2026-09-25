'use client';

import React, { useState } from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { Phone, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle, Loader2, ArrowRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_CONFIG, getWhatsAppUrl } from '@/lib/contact-config';

export default function ContatoPage() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        segmento: 'varejo',
        mensagem: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [successData, setSuccessData] = useState<{ ticketId?: string; whatsappUrl?: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                const details = data.details ? Object.values(data.details).flat().join(', ') : '';
                throw new Error(details || data.error || 'Erro ao enviar mensagem.');
            }

            setSuccessData({
                ticketId: data.ticketId,
                whatsappUrl: data.whatsappUrl,
            });
            setStatus('success');
            setFormData({
                nome: '',
                email: '',
                telefone: '',
                empresa: '',
                segmento: 'varejo',
                mensagem: ''
            });
        } catch (err) {
            console.error('Submission error:', err);
            const message = err instanceof Error ? err.message : undefined;
            setErrorMessage(message || 'Falha na conexão. Por favor, tente novamente ou fale pelo WhatsApp.');
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#E7ECEF]">
            <GlassHeader />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg mb-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
                            Canais Diretos & Diagnóstico
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extralight text-[#E7ECEF] mb-6">
                        Vamos Estruturar sua Operação
                    </h1>
                    <p className="text-sm text-[#E7ECEF]/60 max-w-2xl mx-auto leading-relaxed">
                        Fale diretamente com quem arquiteta e escreve o código da sua solução. Sem intermediários,
                        sem enrolação comercial. Diagnóstico técnico e triagem em até {CONTACT_CONFIG.slaTriagemHoras} horas úteis.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <GlassSection className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Form / Success Card */}
                        <div>
                            <h2 className="text-2xl font-extralight text-[#E7ECEF] mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-[#0D7C66]" />
                                Solicitar Diagnóstico Operacional
                            </h2>

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-[#111111] border border-[#0D7C66]/50 rounded-2xl p-8 space-y-6 shadow-2xl shadow-[#0D7C66]/10"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-[#0D7C66]/20 border border-[#0D7C66]/40 flex items-center justify-center text-[#0D7C66]">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-light text-[#E7ECEF] mb-2">Protocolo registrado com sucesso!</h3>
                                            <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                                Sua solicitação foi gravada em nossa infraestrutura de rastreabilidade. {CONTACT_CONFIG.founderName} entrará em contato em menos de {CONTACT_CONFIG.slaTriagemHoras} horas úteis.
                                            </p>
                                        </div>

                                        {successData?.ticketId && (
                                            <div className="p-4 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl flex items-center justify-between">
                                                <span className="text-xs text-[#E7ECEF]/40 uppercase tracking-wider">Protocolo Rastreável</span>
                                                <span className="font-mono text-sm text-[#B8956A] font-medium">{successData.ticketId}</span>
                                            </div>
                                        )}

                                        {successData?.whatsappUrl && (
                                            <div className="pt-2">
                                                <p className="text-xs text-[#E7ECEF]/50 mb-3">Prefere agilizar a resposta agora?</p>
                                                <a
                                                    href={successData.whatsappUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full px-6 py-3.5 bg-[#0D7C66] text-white rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20 flex items-center justify-center gap-2 group cursor-pointer"
                                                >
                                                    <Phone className="w-4 h-4" />
                                                    Continuar no WhatsApp do {CONTACT_CONFIG.founderName}
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="text-xs text-[#E7ECEF]/40 hover:text-[#E7ECEF] transition-colors underline pt-2 block cursor-pointer"
                                        >
                                            Enviar outra mensagem
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl flex items-start gap-3 text-red-200 text-sm"
                                            >
                                                <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                                                <div>{errorMessage}</div>
                                            </motion.div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="nome" className="block text-xs uppercase tracking-wider text-[#E7ECEF]/60 mb-2 font-medium">
                                                    Seu Nome *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="nome"
                                                    required
                                                    value={formData.nome}
                                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                                    placeholder="Ex: Carlos Mendes"
                                                    className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] text-sm focus:border-[#0D7C66] focus:outline-none transition-colors placeholder:text-[#E7ECEF]/20"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="telefone" className="block text-xs uppercase tracking-wider text-[#E7ECEF]/60 mb-2 font-medium">
                                                    WhatsApp de Contato *
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="telefone"
                                                    required
                                                    value={formData.telefone}
                                                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                                    placeholder="(11) 99999-9999"
                                                    className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] text-sm focus:border-[#0D7C66] focus:outline-none transition-colors placeholder:text-[#E7ECEF]/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#E7ECEF]/60 mb-2 font-medium">
                                                    Email Corporativo (Opcional)
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="seuemail@empresa.com"
                                                    className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] text-sm focus:border-[#0D7C66] focus:outline-none transition-colors placeholder:text-[#E7ECEF]/20"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="empresa" className="block text-xs uppercase tracking-wider text-[#E7ECEF]/60 mb-2 font-medium">
                                                    Nome da Empresa
                                                </label>
                                                <input
                                                    type="text"
                                                    id="empresa"
                                                    value={formData.empresa}
                                                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                                                    placeholder="Sua Empresa Ltda"
                                                    className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] text-sm focus:border-[#0D7C66] focus:outline-none transition-colors placeholder:text-[#E7ECEF]/20"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="segmento" className="block text-xs uppercase tracking-wider text-[#E7ECEF]/60 mb-2 font-medium">
                                                Segmento do seu negócio
                                            </label>
                                            <select
                                                id="segmento"
                                                value={formData.segmento}
                                                onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                                                className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] text-sm focus:border-[#0D7C66] focus:outline-none transition-colors"
                                            >
                                                <option value="varejo">Varejo & E-commerce</option>
                                                <option value="restaurante">Restaurantes & Gastronomia</option>
                                                <option value="servicos">Serviços com Agendamento / Clínicas</option>
                                                <option value="b2b">Serviços B2B / Consultorias</option>
                                                <option value="outro">Outro Segmento</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="mensagem" className="block text-xs uppercase tracking-wider text-[#E7ECEF]/60 mb-2 font-medium">
                                                Qual é o maior gargalo operacional hoje? *
                                            </label>
                                            <textarea
                                                id="mensagem"
                                                required
                                                rows={4}
                                                value={formData.mensagem}
                                                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                                                placeholder="Descreva brevemente sua dor (ex: perda de leads por demora no atendimento, taxa alta de no-show em consultas, falta de follow-up pós-orçamento)..."
                                                className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] text-sm focus:border-[#0D7C66] focus:outline-none transition-colors resize-none placeholder:text-[#E7ECEF]/20"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full px-6 py-4 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-[#0D7C66]/30 flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Transmitindo protocolo...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Enviar Solicitação de Diagnóstico
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Contact Info & Direct Channels */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                                    Canais Oficiais
                                </h2>
                                <p className="text-sm text-[#E7ECEF]/60 mb-8 leading-relaxed">
                                    Se você precisa de retorno urgente ou quer destravar um projeto em andamento, acione diretamente nossos canais corporativos.
                                </p>
                            </div>

                            {/* WhatsApp Direct */}
                            <a
                                href={getWhatsAppUrl({ origem: 'contato' })}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-5 bg-[#111111] border border-[#2a2a2a] hover:border-[#0D7C66]/60 rounded-2xl transition-all group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0D7C66]/20 transition-colors">
                                        <Phone className="w-5 h-5 text-[#0D7C66]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-light text-[#E7ECEF]">WhatsApp Comercial</h3>
                                            <span className="text-[9px] uppercase tracking-wider bg-[#0D7C66]/20 text-[#0D7C66] px-2 py-0.5 rounded-full font-medium">
                                                Fale com {CONTACT_CONFIG.founderName}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#0D7C66] mt-0.5 font-mono">{CONTACT_CONFIG.whatsappDisplay}</p>
                                    </div>
                                </div>
                            </a>

                            {/* Horário e SLA */}
                            <div className="flex items-start gap-4 p-2">
                                <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-[#0D7C66]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-light text-[#E7ECEF] mb-1">Horário de Operação</h3>
                                    <p className="text-sm text-[#E7ECEF]/70">
                                        Segunda a Sexta das 8h às 20h
                                    </p>
                                    <p className="text-xs text-[#0D7C66] mt-0.5">
                                        Sistemas e bots operam 24/7 sem interrupção
                                    </p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4 p-2">
                                <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-[#0D7C66]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-light text-[#E7ECEF] mb-1">Sede Operacional</h3>
                                    <p className="text-sm text-[#E7ECEF]/60">
                                        {CONTACT_CONFIG.cidadeEstado}
                                    </p>
                                    <p className="text-xs text-[#E7ECEF]/40 mt-0.5">
                                        {CONTACT_CONFIG.enderecoCompleto}
                                    </p>
                                </div>
                            </div>

                            {/* Business SLA Notice */}
                            <div className="bg-[#111111]/90 border border-[#2a2a2a] rounded-2xl p-6 mt-6 space-y-2">
                                <div className="flex items-center gap-2 text-[#B8956A]">
                                    <Clock className="w-4 h-4" />
                                    <h3 className="text-xs uppercase tracking-wider font-medium">
                                        Compromisso de Rastreabilidade IDSR
                                    </h3>
                                </div>
                                <p className="text-xs text-[#E7ECEF]/60 leading-relaxed">
                                    Toda mensagem recebida gera um ticket rastreado. Não deixamos contatos perdidos no funil — triagem garantida em até {CONTACT_CONFIG.slaTriagemHoras} horas úteis.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </GlassSection>

            {/* Bottom CTA */}
            <section className="py-20 px-6 text-center border-t border-[#1a1a1a]">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Quer agilizar o atendimento agora mesmo?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8 leading-relaxed">
                        Abra uma conversa direta no WhatsApp com o Rocha e receba uma orientação inicial para sua empresa em poucos minutos.
                    </p>
                    <a
                        href={getWhatsAppUrl({ origem: 'contato', customMessage: 'Olá Rocha! Estou na página de contato e gostaria de iniciar um atendimento direto.' })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20 cursor-pointer"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Chamar Rocha no WhatsApp
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
