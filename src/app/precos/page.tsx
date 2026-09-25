'use client';

import React from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { Check, ArrowRight, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/contact-config';

export default function PrecosPage() {
    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            badge: 'Essencial para Começar',
            price: 'R$ 997',
            period: '/mês',
            description: 'Para empresas que perdem vendas fora do horário e precisam de atendimento imediato 24/7.',
            features: [
                '1 Solução IDSR (Automação Comercial 24/7 no WhatsApp ou Robô de Dados)',
                'Até 1.500 conversas ativas/mês no WhatsApp',
                'Qualificação automática de leads com triagem de perfil',
                'Notificação imediata para equipe no celular',
                'Onboarding assistido e ativação em até 7 dias úteis',
                'Suporte técnico via WhatsApp (SLA 8h úteis)',
                'Garantia de estabilidade e uptime 99.9%'
            ],
            cta: 'Contratar Plano Starter',
            highlight: false
        },
        {
            id: 'growth',
            name: 'Growth',
            badge: 'Mais Escolhido para Escala',
            price: 'R$ 1.997',
            period: '/mês',
            description: 'A máquina completa para quem investe em tráfego pago, precisa de follow-up implacável e zero no-show.',
            features: [
                'Stack Integrado: Automação 24/7 + Agente de IA com RAG + Dashboard Analítico',
                'Volume de até 6.000 conversas ativas/mês',
                'Régua ativa de follow-up para orçamentos e leads parados',
                'Confirmação automática de agendamentos (reduz no-show em até 80%)',
                'Integrações com Google Sheets, Webhooks e CRM atual',
                'Suporte prioritário diretamente com engenheiro (SLA 4h úteis)',
                'Painel executivo com métricas em tempo real de faturamento e conversão'
            ],
            cta: 'Escalar com Plano Growth',
            highlight: true
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            badge: 'Arquitetura Dedicada',
            price: 'Sob Blueprint',
            period: 'Escopo customizado',
            description: 'Para operações complexas que demandam integração com ERPs legados, alta concorrência e governança.',
            features: [
                'Todos os 5 pilares IDSR: Automações + Agentes IA + Robôs RPA + Sistemas Sob Medida',
                'Volume de conversas ilimitado e alta vazão para grandes volumes',
                'Integração dedicada com ERPs (Bling, Tiny, Omie, TOTVS, SAP)',
                'Agentes de IA com guardrails avançados e regras de negócio proprietárias',
                'SLA contratual garantido com canal direto de emergência',
                'Treinamento de equipe e documentação técnica completa',
                'Acompanhamento de arquitetura e performance com engenheiro sênior'
            ],
            cta: 'Solicitar Blueprint Dedicado',
            highlight: false
        }
    ];

    const faqs = [
        {
            question: 'Em quanto tempo a automação começa a rodar na minha empresa?',
            answer: 'Nos planos Starter e Growth, o onboarding e ativação ocorrem entre 5 e 10 dias úteis. No plano Enterprise, definimos um cronograma ágil por marcos de entrega para colocar a primeira versão no ar o mais rápido possível.'
        },
        {
            question: 'Preciso trocar o número de WhatsApp que minha empresa já usa?',
            answer: 'Não! Nós conectamos a automação diretamente ao seu número comercial atual. Você não perde nenhum contato, histórico ou cliente da sua base.'
        },
        {
            question: 'E se minha equipe não tiver conhecimento técnico para mexer?',
            answer: 'A IDSR foi construída exatamente para eliminar a complexidade. Sua equipe utiliza ferramentas limpas e intuitivas, e nós entregamos todo o treinamento prático e suporte para que todos se sintam seguros desde o primeiro dia.'
        },
        {
            question: 'O que acontece quando um cliente faz uma pergunta complexa que a IA não sabe responder?',
            answer: 'Nossos agentes contam com guardrails rígidos anti-alucinação. Quando uma dúvida foge ao escopo ou exige negociação humana, a conversa é transbordada suavemente para o atendente responsável, acompanhada de um resumo do histórico do lead.'
        },
        {
            question: 'Como funciona o contrato? Tem fidelidade ou multa de cancelamento?',
            answer: 'Trabalhamos com transparência radical. Nossos contratos padrão têm ciclos mensais ou semestrais claros, sem letras miúdas ou pegadinhas. Conquistamos a permanência dos nossos clientes pela estabilidade do software e pelo aumento de receita entregue.'
        },
        {
            question: 'Posso começar com um produto e adicionar outros depois?',
            answer: 'Com certeza! Toda a infraestrutura da IDSR é modular. Você pode começar resolvendo o atendimento inicial no WhatsApp e, conforme o tráfego e as vendas aumentarem, plugar o CRM, a agenda e as integrações de ERP.'
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
                            Investimento & Planos
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extralight text-[#E7ECEF] mb-6">
                        Planos Transparentes, Retorno Imediato
                    </h1>
                    <p className="text-sm text-[#E7ECEF]/50 max-w-2xl mx-auto leading-relaxed">
                        Elimine o custo oculto de leads perdidos por demora no atendimento e processos manuais. Escolha o plano ideal para a escala da sua empresa.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <GlassSection className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`rounded-2xl p-8 flex flex-col h-full relative transition-all ${plan.highlight
                                    ? 'bg-[#0D7C66]/10 border-2 border-[#0D7C66]/60 shadow-2xl shadow-[#0D7C66]/15'
                                    : 'bg-[#111111] border border-[#2a2a2a] hover:border-[#2a2a2a]/70'
                                    }`}
                            >
                                <div className="mb-4">
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wide font-medium ${
                                        plan.highlight 
                                            ? 'bg-[#0D7C66]/20 border border-[#0D7C66]/40 text-[#0D7C66]' 
                                            : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#E7ECEF]/60'
                                    }`}>
                                        {plan.badge}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-light text-[#E7ECEF] mb-2">{plan.name}</h3>
                                
                                <div className="flex items-baseline gap-1.5 mb-4">
                                    <span className="text-3xl sm:text-4xl font-extralight text-[#E7ECEF]">{plan.price}</span>
                                    <span className="text-xs text-[#E7ECEF]/40">{plan.period}</span>
                                </div>

                                <p className="text-sm text-[#E7ECEF]/60 mb-8 min-h-[48px] leading-relaxed">
                                    {plan.description}
                                </p>

                                <div className="border-t border-[#2a2a2a] pt-6 mb-8 flex-1">
                                    <p className="text-xs uppercase tracking-wider text-[#E7ECEF]/40 font-medium mb-4">
                                        O que está incluso:
                                    </p>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-[#E7ECEF]/70">
                                                <Check className="w-4 h-4 text-[#0D7C66] mt-0.5 shrink-0" />
                                                <span className="leading-snug">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <a
                                    href={getWhatsAppUrl({ origem: 'precos', plano: plan.id })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full px-6 py-3.5 rounded-xl text-sm font-medium text-center transition-all mt-auto flex items-center justify-center gap-2 group cursor-pointer ${plan.highlight
                                        ? 'bg-[#0D7C66] text-[#E7ECEF] hover:bg-[#0F5A47] shadow-lg shadow-[#0D7C66]/30'
                                        : 'bg-[#1a1a1a] text-[#E7ECEF] hover:bg-[#2a2a2a] border border-[#2a2a2a]'
                                        }`}
                                >
                                    <span>{plan.cta}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Guarantees Box */}
                    <div className="mt-12 p-6 rounded-2xl bg-[#111111]/80 border border-[#2a2a2a] grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <ShieldCheck className="w-6 h-6 text-[#0D7C66] shrink-0" />
                            <div>
                                <h4 className="text-sm font-medium text-[#E7ECEF]">Onboarding Assistido</h4>
                                <p className="text-xs text-[#E7ECEF]/50">Configuramos e testamos tudo com você</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <Zap className="w-6 h-6 text-[#0D7C66] shrink-0" />
                            <div>
                                <h4 className="text-sm font-medium text-[#E7ECEF]">Ativação Rápida</h4>
                                <p className="text-xs text-[#E7ECEF]/50">Seu sistema rodando em dias, não meses</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <MessageSquare className="w-6 h-6 text-[#0D7C66] shrink-0" />
                            <div>
                                <h4 className="text-sm font-medium text-[#E7ECEF]">Suporte com Engenheiro</h4>
                                <p className="text-xs text-[#E7ECEF]/50">Atendimento direto com quem constrói</p>
                            </div>
                        </div>
                    </div>
                </div>
            </GlassSection>

            {/* FAQ Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extralight text-[#E7ECEF] mb-4 text-center">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-sm text-[#E7ECEF]/50 text-center mb-12 max-w-xl mx-auto">
                        Tire suas dúvidas sobre implantação, tecnologia e funcionamento prático da IDSR.
                    </p>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#2a2a2a]/80 transition-colors"
                            >
                                <h3 className="text-base font-light text-[#E7ECEF] mb-3 flex items-start gap-2">
                                    <span className="text-[#0D7C66] font-mono font-bold text-sm">0{index + 1}.</span>
                                    {faq.question}
                                </h3>
                                <p className="text-sm text-[#E7ECEF]/60 leading-relaxed pl-6">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-20 px-6 text-center border-t border-[#1a1a1a]">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Ainda com dúvidas sobre o melhor plano?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8 leading-relaxed">
                        Faça um diagnóstico operacional gratuito com o Rocha e descubra qual modelo traz o maior retorno financeiro para o momento da sua empresa.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={getWhatsAppUrl({ origem: 'precos', customMessage: 'Olá Rocha! Gostaria de um diagnóstico rápido para saber qual plano da IDSR faz mais sentido para minha operação.' })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20 cursor-pointer"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Falar com Rocha no WhatsApp
                        </a>
                        <a
                            href="/contato"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#252525] transition-all"
                        >
                            Solicitar diagnóstico no site
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
