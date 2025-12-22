'use client';

import React from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { Target, Rocket, Shield, Users } from 'lucide-react';

export default function SobrePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#E7ECEF]">
            <GlassHeader />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg mb-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
                            Quem Somos
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extralight text-[#E7ECEF] mb-6">
                        IDSR
                    </h1>
                    <p className="text-xl font-light text-[#0D7C66] mb-6">
                        Infraestrutura de Dados, Sistemas e Rastreabilidade
                    </p>
                    <p className="text-sm text-[#E7ECEF]/50 max-w-2xl mx-auto leading-relaxed">
                        Nascemos para resolver um problema real: operações comerciais que param por falta de
                        rastreabilidade, processos que dependem demais de pessoas, decisões que demoram por
                        falta de dados claros.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <GlassSection className="py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-extralight text-[#E7ECEF] mb-6 text-center">
                        Nossa história
                    </h2>
                    <div className="space-y-6 text-sm text-[#E7ECEF]/60 leading-relaxed">
                        <p>
                            A IDSR nasceu da experiência direta com operações comerciais complexas. Vimos empresas
                            perdendo vendas porque não conseguiam acompanhar leads, processos travando porque
                            dependiam de planilhas manuais, e decisões sendo adiadas por falta de indicadores claros.
                        </p>
                        <p>
                            A resposta não estava em mais ferramentas genéricas. Estava em criar sistemas que
                            entendessem o contexto específico de cada operação: o fluxo real de trabalho, as
                            exceções que acontecem no dia a dia, os pontos onde a automação realmente libera tempo.
                        </p>
                        <p>
                            Hoje, entregamos automação com método. Não prometemos mágica — prometemos processos
                            definidos, rastreáveis e que funcionam mesmo quando a equipe cresce.
                        </p>
                    </div>
                </div>
            </GlassSection>

            {/* Values Section */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-extralight text-[#E7ECEF] mb-12 text-center">
                        Nossos valores
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Value 1 */}
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8">
                            <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-[#0D7C66]" />
                            </div>
                            <h3 className="text-xl font-light text-[#E7ECEF] mb-3">
                                Objetivo, nunca promessa
                            </h3>
                            <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                Não vendemos sonhos. Definimos objetivos claros, métricas rastreáveis e entregamos
                                exatamente o que foi combinado. Se não for viável, dizemos antes de começar.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8">
                            <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mb-6">
                                <Rocket className="w-6 h-6 text-[#0D7C66]" />
                            </div>
                            <h3 className="text-xl font-light text-[#E7ECEF] mb-3">
                                Método sobre mágica
                            </h3>
                            <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                Nosso diferencial não é tecnologia — é processo. Mapeamos, documentamos, testamos e
                                só então automatamos. Cada projeto tem um blueprint e um plano de ativação.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8">
                            <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-[#0D7C66]" />
                            </div>
                            <h3 className="text-xl font-light text-[#E7ECEF] mb-3">
                                Rastreabilidade total
                            </h3>
                            <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                Tudo que entra, processa e sai do sistema é registrado. Você sempre sabe onde está
                                cada lead, qual etapa está travada, e o que precisa ser feito.
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8">
                            <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-[#0D7C66]" />
                            </div>
                            <h3 className="text-xl font-light text-[#E7ECEF] mb-3">
                                Feito para escalar
                            </h3>
                            <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                Construímos pensando no futuro. O sistema que funciona para 10 clientes hoje vai
                                funcionar para 1000 amanhã, sem precisar refazer.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <GlassSection className="py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-extralight text-[#E7ECEF] mb-6">
                        Nossa missão
                    </h2>
                    <p className="text-lg text-[#E7ECEF]/60 leading-relaxed max-w-3xl mx-auto">
                        Liberar empresas de operações manuais e decisões às cegas. Entregar automação que funciona,
                        dados que fazem sentido, e processos que escalam sem depender de heróis.
                    </p>
                </div>
            </GlassSection>

            {/* CTA Section */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Pronto para começar?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8">
                        Vamos entender sua operação e mostrar como a IDSR pode ajudar.
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
