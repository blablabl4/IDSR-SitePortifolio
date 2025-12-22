'use client';

import React, { useState, useEffect } from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { Footer } from '@/components/ui/Footer';
import { Zap, Calendar, Users2, ClipboardList, Target, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProdutosPage() {
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

    const products = [
        {
            id: 'central',
            icon: Zap,
            name: 'Central',
            tagline: 'Pulse',
            subtitle: 'Atendimento que não para',
            description: 'Chat inteligente que qualifica, responde e roteia. Funciona 24/7, registra tudo, escala sem contratar.',
            detailedDescription: 'Sistema completo de atendimento automatizado que entende contexto, qualifica leads e roteia para o time certo. Integra com WhatsApp, Instagram, Messenger e website.',
            features: [
                'Respostas automáticas baseadas em contexto',
                'Qualificação de leads em tempo real',
                'Roteamento inteligente para equipe',
                'Registro completo de todas as conversas',
                'Integrações com WhatsApp, Instagram, Web'
            ],
            useCases: [
                'Atendimento 24/7 sem aumentar equipe',
                'Qualificação de leads antes de passar para vendas',
                'Redução de tempo de resposta de horas para segundos',
                'Triagem automática de solicitações'
            ],
            integrations: ['WhatsApp Business', 'Instagram Direct', 'Facebook Messenger', 'Website Chat'],
            pricing: 'A partir de R$ X/mês'
        },
        {
            id: 'vendas',
            icon: Users2,
            name: 'Vendas',
            tagline: 'LeadFlow',
            subtitle: 'Pipeline que não trava',
            description: 'CRM que acompanha cada lead do primeiro contato até o fechamento. Sem etapa perdida, sem follow-up esquecido.',
            detailedDescription: 'CRM visual e intuitivo que mantém seu pipeline organizado. Automatiza follow-ups, alerta sobre leads parados e mostra exatamente onde cada oportunidade está.',
            features: [
                'Funil visual com status em tempo real',
                'Automação de follow-ups',
                'Indicadores de conversão por etapa',
                'Alertas de leads parados',
                'Relatórios de performance'
            ],
            useCases: [
                'Eliminar leads perdidos no processo',
                'Automatizar sequências de follow-up',
                'Identificar gargalos no funil',
                'Previsibilidade de vendas por estágio'
            ],
            integrations: ['Email', 'WhatsApp', 'Calendário', 'Google Sheets'],
            pricing: 'A partir de R$ Y/mês'
        },
        {
            id: 'agenda',
            icon: Calendar,
            name: 'Agenda',
            tagline: 'ScheduleFlow',
            subtitle: 'Agendamento sem conflito',
            description: 'Agenda inteligente que evita no-shows, manda lembretes e libera você de ficar confirmando manualmente.',
            detailedDescription: 'Gestão completa de agendamentos com confirmação automática, lembretes programados e reagendamento simplificado. Reduz no-shows em até 80%.',
            features: [
                'Confirmação automática via WhatsApp',
                'Lembretes programados',
                'Reagendamento simplificado',
                'Bloqueio de horários conflitantes',
                'Métricas de no-show e ocupação'
            ],
            useCases: [
                'Reduzir no-shows drasticamente',
                'Liberar equipe de confirmar manualmente',
                'Otimizar taxa de ocupação',
                'Reagendamentos sem fricção'
            ],
            integrations: ['Google Calendar', 'WhatsApp', 'Email', 'Zoom'],
            pricing: 'A partir de R$ Z/mês'
        },
        {
            id: 'operacao',
            icon: ClipboardList,
            name: 'Operação',
            tagline: 'OpsFlow',
            subtitle: 'Tarefas que não somem',
            description: 'Checklists rastreáveis com registro de execução. Você sabe o que foi feito, quando e por quem.',
            detailedDescription: 'Sistema de gestão operacional com checklists inteligentes, rastreamento completo e identificação automática de gargalos. Cada tarefa registrada, cada ação documentada.',
            features: [
                'Checklists com registro de execução',
                'Status de tarefas em tempo real',
                'Identificação de gargalos por tempo de ciclo',
                'Histórico completo de ações',
                'Alertas de tarefas atrasadas'
            ],
            useCases: [
                'Padronização de processos operacionais',
                'Rastreabilidade total de execução',
                'Identificação de pontos de travamento',
                'Auditoria completa de atividades'
            ],
            integrations: ['Slack', 'Email', 'Google Drive', 'Notion'],
            pricing: 'A partir de R$ W/mês'
        },
        {
            id: 'sob-medida',
            icon: Target,
            name: 'Sob Medida',
            tagline: 'Custom',
            subtitle: 'Quando o padrão não atende',
            description: 'Integrações complexas, processos específicos e governança sob medida. Blueprint dedicado e suporte prioritário.',
            detailedDescription: 'Desenvolvimento personalizado para operações que exigem mais. Integrações com sistemas legados, processos específicos do seu negócio e governança customizada.',
            features: [
                'Integrações complexas',
                'Governança e compliance',
                'Blueprint dedicado',
                'Suporte prioritário',
                'Desenvolvimento personalizado'
            ],
            useCases: [
                'Integração com ERP/CRM legado',
                'Processos específicos não-padrão',
                'Compliance e auditoria rigorosa',
                'Escalabilidade além do comum'
            ],
            integrations: ['APIs customizadas', 'Sistemas legados', 'Bancos de dados proprietários'],
            pricing: 'Sob consulta'
        }
    ];

    // Auto-expand based on URL hash
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && products.find(p => p.id === hash)) {
            setExpandedProduct(hash);
            // Scroll to the product
            setTimeout(() => {
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, []);

    const toggleProduct = (productId: string) => {
        setExpandedProduct(expandedProduct === productId ? null : productId);
        // Update URL hash
        window.history.replaceState(null, '', expandedProduct === productId ? '#' : `#${productId}`);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#E7ECEF]">
            <GlassHeader />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg mb-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
                            Soluções
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extralight text-[#E7ECEF] mb-6">
                        Produtos IDSR
                    </h1>
                    <p className="text-sm text-[#E7ECEF]/50 max-w-2xl mx-auto">
                        Automação modular com rastreabilidade total. Clique em cada produto para ver todos os detalhes.
                    </p>
                </div>
            </section>

            {/* Products Accordion */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto space-y-4">
                    {products.map((product) => {
                        const isExpanded = expandedProduct === product.id;

                        return (
                            <div
                                key={product.id}
                                id={product.id}
                                className={`bg-[#111111] border rounded-2xl overflow-hidden transition-all ${isExpanded ? 'border-[#0D7C66]/60' : 'border-[#2a2a2a] hover:border-[#2a2a2a]/60'
                                    }`}
                            >
                                {/* Header - Always Visible */}
                                <button
                                    onClick={() => toggleProduct(product.id)}
                                    className="w-full p-8 flex items-center justify-between text-left"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center shrink-0">
                                            <product.icon className="w-7 h-7 text-[#0D7C66]" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-extralight text-[#E7ECEF] mb-1">
                                                {product.name}
                                            </h2>
                                            <p className="text-sm text-[#0D7C66]">{product.tagline}</p>
                                            <p className="text-sm text-[#E7ECEF]/60 mt-2">{product.subtitle}</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="w-6 h-6 text-[#E7ECEF]/40" />
                                    </motion.div>
                                </button>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-[#2a2a2a]"
                                        >
                                            <div className="p-8 space-y-8">
                                                {/* Description */}
                                                <div>
                                                    <h3 className="text-lg font-light text-[#E7ECEF] mb-3">Sobre</h3>
                                                    <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                                        {product.detailedDescription}
                                                    </p>
                                                </div>

                                                {/* Features */}
                                                <div>
                                                    <h3 className="text-lg font-light text-[#E7ECEF] mb-4">Recursos principais</h3>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {product.features.map((feature, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-[#E7ECEF]/60">
                                                                <Check className="w-4 h-4 text-[#0D7C66] mt-0.5 shrink-0" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Use Cases */}
                                                <div>
                                                    <h3 className="text-lg font-light text-[#E7ECEF] mb-4">Casos de uso</h3>
                                                    <ul className="space-y-2">
                                                        {product.useCases.map((useCase, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-[#E7ECEF]/60">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#0D7C66] mt-2 shrink-0" />
                                                                {useCase}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Integrations */}
                                                <div>
                                                    <h3 className="text-lg font-light text-[#E7ECEF] mb-4">Integrações</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {product.integrations.map((integration, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-3 py-1.5 bg-[#0D7C66]/10 border border-[#0D7C66]/20 rounded-lg text-xs text-[#E7ECEF]/60"
                                                            >
                                                                {integration}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Pricing & CTA */}
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#2a2a2a]">
                                                    <div>
                                                        <p className="text-xs text-[#E7ECEF]/40 mb-1">Investimento</p>
                                                        <p className="text-lg font-light text-[#E7ECEF]">{product.pricing}</p>
                                                    </div>
                                                    <a
                                                        href="/"
                                                        className="px-6 py-3 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20"
                                                    >
                                                        Começar com {product.name}
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Não encontrou o que precisa?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8">
                        Nosso time pode criar uma solução personalizada para sua operação.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20"
                    >
                        Falar com especialista
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
