'use client';

import React from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { Phone, Clock, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/contact-config';

export default function SuportePage() {
    const slas = [
        {
            nivel: 'Severidade 1 (Crítico)',
            prazo: 'Em até 1 hora',
            desc: 'Parada total de operação, falha em disparos de leads ou indisponibilidade de canais essenciais.',
            badgeColor: 'text-red-400 bg-red-950/40 border-red-800/40'
        },
        {
            nivel: 'Severidade 2 (Alto Impacto)',
            prazo: 'Em até 4 horas úteis',
            desc: 'Falha parcial em uma integração secundária sem comprometer a captura de leads principal.',
            badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-800/40'
        },
        {
            nivel: 'Severidade 3 (Dúvidas & Ajustes)',
            prazo: 'Em até 8 horas úteis',
            desc: 'Solicitações de alteração de templates, novas regras de roteamento ou esclarecimento de métricas.',
            badgeColor: 'text-[#0D7C66] bg-[#0D7C66]/20 border-[#0D7C66]/40'
        }
    ];

    const faqSuporte = [
        {
            q: 'Como solicito uma alteração nas regras do meu bot ou CRM?',
            a: 'Basta enviar uma mensagem direta no WhatsApp de suporte da sua conta ou abrir chamado por e-mail informando o protocolo da sua empresa. Pequenos ajustes de fluxo são implementados em até 24h.'
        },
        {
            q: 'O que fazer se o WhatsApp desconectar da plataforma?',
            a: 'Nossa telemetria detecta desconexões automaticamente e envia um alerta imediato para o seu gestor. Basta reescanear o QR Code de autenticação no painel em menos de 1 minuto.'
        },
        {
            q: 'Minha equipe tem acesso a treinamento e gravação?',
            a: 'Sim! Todos os clientes contam com gravação do treinamento de onboarding e documentação passo a passo do fluxo para onboarding de novos funcionários.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#E7ECEF]">
            <GlassHeader />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg mb-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
                            Atendimento & Sucesso do Cliente
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extralight text-[#E7ECEF] mb-6">
                        Central de Suporte Operacional IDSR
                    </h1>
                    <p className="text-sm text-[#E7ECEF]/60 max-w-2xl mx-auto leading-relaxed">
                        Sua operação não pode parar. Nosso time de engenharia monitora sua infraestrutura 24 horas
                        por dia com SLAs rigorosos de resposta e atendimento humanizado direto com especialistas.
                    </p>
                </div>
            </section>

            {/* Status & Uptime Banner */}
            <div className="max-w-5xl mx-auto px-6 mb-12">
                <div className="p-4 rounded-2xl bg-[#111111] border border-[#2a2a2a] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981]"></span>
                        </span>
                        <div>
                            <span className="text-xs uppercase tracking-wider text-white font-medium">
                                Todos os Sistemas Operando Normalmente
                            </span>
                            <p className="text-[11px] text-white/50">
                                Uptime dos barramentos de mensageria: 99.98% nos últimos 90 dias
                            </p>
                        </div>
                    </div>
                    <span className="text-xs font-mono text-[#0D7C66] px-3 py-1 bg-[#0D7C66]/10 border border-[#0D7C66]/20 rounded-full">
                        Sistemas Ativos
                    </span>
                </div>
            </div>

            {/* Canais de Suporte */}
            <GlassSection className="py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-2xl sm:text-3xl font-extralight text-[#E7ECEF] mb-8 text-center">
                        Canais de Atendimento Rápido
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* WhatsApp para Clientes */}
                        <div className="p-8 rounded-2xl bg-[#111111] border border-[#2a2a2a] hover:border-[#0D7C66]/60 transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mb-6">
                                    <Phone className="w-6 h-6 text-[#0D7C66]" />
                                </div>
                                <h3 className="text-xl font-light text-[#E7ECEF] mb-2">
                                    WhatsApp Dedicado de Suporte
                                </h3>
                                <p className="text-sm text-[#E7ECEF]/60 mb-6 leading-relaxed font-light">
                                    Canal direto para clientes com operação ativa. Fale diretamente com o time de engenharia
                                    para resolução imediata de dúvidas e manutenções emergenciais.
                                </p>
                            </div>
                            <a
                                href={getWhatsAppUrl({ origem: 'suporte', customMessage: 'Olá time de suporte IDSR! Sou cliente ativo e preciso de auxílio com minha operação.' })}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 px-4 bg-[#0D7C66] text-white rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#0D7C66]/20"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Acionar Suporte no WhatsApp
                            </a>
                        </div>

                        {/* Abertura de Chamado via Protocolo */}
                        <div className="p-8 rounded-2xl bg-[#111111] border border-[#2a2a2a] hover:border-[#2a2a2a]/80 transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-6 h-6 text-[#E7ECEF]/70" />
                                </div>
                                <h3 className="text-xl font-light text-[#E7ECEF] mb-2">
                                    Abertura de Protocolo Rastreável
                                </h3>
                                <p className="text-sm text-[#E7ECEF]/60 mb-6 leading-relaxed font-light">
                                    Envie os detalhes do seu chamado com geração instantânea de protocolo único de atendimento
                                    para acompanhamento da nossa equipe técnica.
                                </p>
                            </div>
                            <a
                                href="/contato"
                                className="w-full py-3.5 px-4 bg-[#1a1a1a] border border-[#2a2a2a] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#252525] transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
                            >
                                <ArrowRight className="w-4 h-4" />
                                Abrir Protocolo no Site
                            </a>
                        </div>
                    </div>
                </div>
            </GlassSection>

            {/* SLA Table */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-6 h-6 text-[#0D7C66]" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extralight text-[#E7ECEF] mb-3">
                            Compromisso de SLA (Nível de Serviço)
                        </h2>
                        <p className="text-sm text-[#E7ECEF]/50 max-w-xl mx-auto">
                            Garantia formal de resposta conforme a severidade do incidente reportado.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {slas.map((item, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-[#111111] border border-[#2a2a2a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-base font-light text-[#E7ECEF]">
                                            {item.nivel}
                                        </h3>
                                        <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-medium ${item.badgeColor}`}>
                                            {item.prazo}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#E7ECEF]/60 font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Suporte */}
            <GlassSection className="py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl sm:text-3xl font-extralight text-[#E7ECEF] mb-8 text-center">
                        Dúvidas Rápidas de Operação
                    </h2>
                    <div className="space-y-4">
                        {faqSuporte.map((faq, i) => (
                            <div key={i} className="p-6 rounded-xl bg-[#111111] border border-[#2a2a2a]">
                                <h3 className="text-base font-light text-[#E7ECEF] mb-2">
                                    {faq.q}
                                </h3>
                                <p className="text-sm text-[#E7ECEF]/60 leading-relaxed font-light">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </GlassSection>

            {/* Bottom CTA */}
            <section className="py-20 px-6 text-center border-t border-[#1a1a1a]">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Ainda não é cliente IDSR?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8 leading-relaxed">
                        Conheça nossas soluções de automação operacional e descubra como colocar sua empresa para rodar 24/7 com suporte dedicado de engenharia.
                    </p>
                    <a
                        href="/produtos"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20 cursor-pointer"
                    >
                        Conhecer produtos e soluções
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
