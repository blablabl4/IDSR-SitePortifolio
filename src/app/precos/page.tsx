'use client';

import React from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { Check } from 'lucide-react';

export default function PrecosPage() {
    const plans = [
        {
            name: 'Inicial',
            price: 'Sob consulta',
            description: 'Para empresas começando a automatizar',
            features: [
                '1 produto à escolha',
                'Até 1.000 contatos/mês',
                'Suporte por email',
                'Onboarding guiado',
                'Integrações básicas'
            ],
            cta: 'Começar',
            highlight: false
        },
        {
            name: 'Crescimento',
            price: 'Sob consulta',
            description: 'Para operações em expansão',
            features: [
                'Até 3 produtos',
                'Até 5.000 contatos/mês',
                'Suporte prioritário',
                'Customizações leves',
                'Integrações avançadas',
                'Relatórios personalizados'
            ],
            cta: 'Falar com time',
            highlight: true
        },
        {
            name: 'Empresa',
            price: 'Custom',
            description: 'Para operações complexas',
            features: [
                'Todos os produtos',
                'Volume ilimitado',
                'Suporte dedicado',
                'SLA garantido',
                'Desenvolvimento sob medida',
                'Governança e compliance',
                'Gerente de conta'
            ],
            cta: 'Agendar conversa',
            highlight: false
        }
    ];

    const faqs = [
        {
            question: 'Como funciona o preço?',
            answer: 'Personalizamos a proposta conforme volume, produtos escolhidos e necessidade de customização. Entre em contato para um orçamento preciso.'
        },
        {
            question: 'Tem período de teste?',
            answer: 'Oferecemos diagnóstico gratuito e demonstração completa. O período de teste pode ser negociado conforme o projeto.'
        },
        {
            question: 'Posso começar com um produto e adicionar outros depois?',
            answer: 'Sim! Nossa estrutura é modular. Você pode começar com um produto e expandir conforme a operação cresce.'
        },
        {
            question: 'Tem taxa de setup?',
            answer: 'Depende da complexidade. Projetos padrão podem ter taxa única de onboarding. Projetos custom incluem blueprint e setup no escopo.'
        },
        {
            question: 'Como funciona o suporte?',
            answer: 'Planos Inicial têm suporte por email (até 48h). Crescimento tem suporte prioritário. Empresa tem suporte dedicado com SLA.'
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
                            Preços
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extralight text-[#E7ECEF] mb-6">
                        Transparência total
                    </h1>
                    <p className="text-sm text-[#E7ECEF]/50 max-w-2xl mx-auto">
                        Preços personalizados conforme volume e produtos. Sem surpresas, sem taxa escondida.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <GlassSection className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`rounded-2xl p-8 flex flex-col h-full ${plan.highlight
                                    ? 'bg-[#0D7C66]/10 border-2 border-[#0D7C66]/60'
                                    : 'bg-[#111111] border border-[#2a2a2a]'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="inline-block px-3 py-1 bg-[#0D7C66]/20 border border-[#0D7C66]/30 rounded-full text-[10px] uppercase tracking-wide text-[#0D7C66] mb-4">
                                        Mais popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-light text-[#E7ECEF] mb-2">{plan.name}</h3>
                                <p className="text-3xl font-extralight text-[#E7ECEF] mb-4">{plan.price}</p>
                                <p className="text-sm text-[#E7ECEF]/50 mb-8">{plan.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[#E7ECEF]/60">
                                            <Check className="w-4 h-4 text-[#0D7C66] mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/"
                                    className={`block w-full px-6 py-3 rounded-xl text-sm font-medium text-center transition-all mt-auto ${plan.highlight
                                        ? 'bg-[#0D7C66] text-[#E7ECEF] hover:bg-[#0F5A47] shadow-lg shadow-[#0D7C66]/30'
                                        : 'bg-[#1a1a1a] text-[#E7ECEF] hover:bg-[#2a2a2a] border border-[#2a2a2a]'
                                        }`}
                                >
                                    {plan.cta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </GlassSection>

            {/* FAQ Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extralight text-[#E7ECEF] mb-12 text-center">
                        Perguntas frequentes
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6"
                            >
                                <h3 className="text-lg font-light text-[#E7ECEF] mb-3">
                                    {faq.question}
                                </h3>
                                <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Ainda com dúvidas?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8">
                        Vamos montar uma proposta personalizada para sua operação.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20"
                    >
                        Começar diagnóstico
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
