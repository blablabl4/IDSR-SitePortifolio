'use client';

import React from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { Target, Rocket, Shield, Users, ArrowRight, MessageSquare, Code2, CheckCircle2 } from 'lucide-react';
import { CONTACT_CONFIG, getWhatsAppUrl } from '@/lib/contact-config';

export default function SobrePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#E7ECEF]">
            <GlassHeader />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg mb-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
                            Quem Somos & Filosofia
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extralight text-[#E7ECEF] mb-6">
                        Engenharia Real para Quem Não Pode Parar
                    </h1>
                    <p className="text-xl font-light text-[#0D7C66] mb-6">
                        {CONTACT_CONFIG.nomeFantasia}
                    </p>
                    <p className="text-sm text-[#E7ECEF]/60 max-w-2xl mx-auto leading-relaxed">
                        Nascemos para resolver o maior gargalo das empresas em crescimento: operações comerciais
                        que sangram vendas por demora no atendimento, processos manuais que travam em planilhas
                        e decisões tomadas no escuro por falta de dados rastreáveis.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <GlassSection className="py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-6 justify-center">
                        <Code2 className="w-6 h-6 text-[#0D7C66]" />
                        <h2 className="text-2xl sm:text-3xl font-extralight text-[#E7ECEF]">
                            Nossa História & Por Que Existimos
                        </h2>
                    </div>
                    <div className="space-y-6 text-sm text-[#E7ECEF]/70 leading-relaxed">
                        <p>
                            A IDSR nasceu da vivência direta com o caos de operações comerciais em expansão. Vimos dezenas
                            de donos de negócios investindo pesado em tráfego pago e marketing, apenas para ver leads
                            esfriarem no WhatsApp por falta de resposta imediata, orçamentos ficarem esquecidos sem follow-up
                            e equipes sobrecarregadas copiando dados manualmente entre planilhas desconectadas.
                        </p>
                        <p>
                            A resposta comum do mercado para isso tem sido tentar enfiar ferramentas genéricas ou
                            gambiarras no-code construídas por curiosos — que quebram no primeiro pico de mensagens ou
                            alucinam com clientes em momentos críticos da venda.
                        </p>
                        <p>
                            Nós escolhemos o caminho oposto: <strong>engenharia de software séria</strong>. Fundada por {CONTACT_CONFIG.founderFullName},
                            a IDSR trata a operação comercial como um sistema de missão crítica. Construímos arquiteturas
                            orientadas a eventos, APIs resilientes, bancos de dados consistentes e agentes de IA com guardrails
                            estritos que nunca inventam respostas.
                        </p>
                        <div className="p-6 rounded-xl bg-[#111111] border border-[#0D7C66]/30 my-4">
                            <p className="text-base text-[#E7ECEF] font-light italic">
                                &ldquo;Não existem balas de prata nem atalhos mágicos. Software estável nasce de disciplina,
                                arquitetura limpa e leitura rigorosa de causa raiz. Quando a engenharia é bem feita, a empresa
                                escala sem sustos.&rdquo;
                            </p>
                            <p className="text-xs text-[#0D7C66] mt-2 font-mono">
                                — {CONTACT_CONFIG.founderName}, Fundador e Engenheiro-Chefe da IDSR
                            </p>
                        </div>
                    </div>
                </div>
            </GlassSection>

            {/* Values Section */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-extralight text-[#E7ECEF] mb-4 text-center">
                        Nossos Pilares Inegociáveis
                    </h2>
                    <p className="text-sm text-[#E7ECEF]/50 text-center mb-12 max-w-xl mx-auto">
                        Os quatro princípios que guiam cada linha de código e cada entrega da IDSR.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Value 1 */}
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#0D7C66]/50 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-[#0D7C66]" />
                            </div>
                            <h3 className="text-xl font-light text-[#E7ECEF] mb-3">
                                01. Diagnóstico Real, Nunca Promessa Vazia
                            </h3>
                            <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                Não vendemos sonhos de enriquecimento rápido. Medimos métricas reais da sua operação: tempo de resposta,
                                taxa de no-show, conversão de funil. Se uma automação não for viável ou não gerar ROI mensurável, dizemos
                                antes de você assinar o contrato.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#0D7C66]/50 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mb-6">
                                <Rocket className="w-6 h-6 text-[#0D7C66]" />
                            </div>
                            <h3 className="text-xl font-light text-[#E7ECEF] mb-3">
                                02. Engenharia sobre Gambiarra
                            </h3>
                            <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                Nosso diferencial não é apenas ligar webhooks. É arquitetura: filas distribuídas, retry com backoff exponencial,
                                normalização de dados e testes automatizados. O que a IDSR entrega aguenta picos de anúncios e continua funcionando.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#0D7C66]/50 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-[#0D7C66]" />
                            </div>
                            <h3 className="text-xl font-light text-[#E7ECEF] mb-3">
                                03. Rastreabilidade Total
                            </h3>
                            <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                Cada lead que entra gera um protocolo único. Cada ação, mensagem e transição de etapa possui registro de auditoria.
                                Você nunca mais vai ficar sem saber por que um cliente sumiu ou onde sua equipe travou.
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#0D7C66]/50 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-[#0D7C66]" />
                            </div>
                            <h3 className="text-xl font-light text-[#E7ECEF] mb-3">
                                04. Construído para Escalar
                            </h3>
                            <p className="text-sm text-[#E7ECEF]/60 leading-relaxed">
                                Pensamos na sua operação no dia 1 e no dia 1.000. O mesmo sistema que atende 50 clientes hoje foi arquitetado
                                para processar dezenas de milhares amanhã, sem precisar refazer a base ou reescrever código.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <GlassSection className="py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extralight text-[#E7ECEF] mb-6">
                        Nossa Missão
                    </h2>
                    <p className="text-base sm:text-lg text-[#E7ECEF]/70 leading-relaxed max-w-3xl mx-auto">
                        Liberar donos de empresas e gestores operacionais do trabalho repetitivo e das decisões tomadas no escuro.
                        Entregar automações que rodam 24/7 sem falhas, dados que geram previsibilidade de caixa e sistemas que
                        escalam sem exigir a contratação desordenada de pessoas.
                    </p>
                </div>
            </GlassSection>

            {/* Bottom CTA Section */}
            <section className="py-20 px-6 text-center border-t border-[#1a1a1a]">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Pronto para transformar sua operação?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8 leading-relaxed">
                        Vamos conversar diretamente sobre seu cenário atual, entender seus gargalos e mostrar como a engenharia da IDSR pode destravar seu crescimento.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={getWhatsAppUrl({ origem: 'sobre', customMessage: 'Olá Rocha! Li a história da IDSR e gostaria de agendar uma conversa sobre a operação da minha empresa.' })}
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
                            Solicitar diagnóstico técnico
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
