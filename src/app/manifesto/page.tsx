'use client';

import React from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { Scroll, Terminal, ShieldAlert, Cpu, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { CONTACT_CONFIG, getWhatsAppUrl } from '@/lib/contact-config';

export default function ManifestoPage() {
    const mandamentos = [
        {
            num: '01',
            title: 'Nenhum lead espera mais de 3 segundos',
            desc: 'Em um mundo onde a atenção é o recurso mais escasso, demorar 40 minutos para responder um cliente no WhatsApp é jogar dinheiro de tráfego no lixo. A qualificação deve ser instantânea, precisa e disponível 24 horas por dia.'
        },
        {
            num: '02',
            title: 'Nenhum orçamento é abandonado no esquecimento',
            desc: 'A maioria das empresas não sofre de falta de leads, sofre de falta de follow-up. Nossa infraestrutura acompanha cada proposta até o fechamento ou descarte consciente, sem depender da memória ou da boa vontade da equipe.'
        },
        {
            num: '03',
            title: 'No-show não é fatalidade, é falha de processo',
            desc: 'Clínicas, consultórios e serviços perdem até 40% da receita quando clientes faltam sem avisar. Lembretes ativos, confirmações em 1 clique e reagendamento sem fricção reduzem faltas drasticamente.'
        },
        {
            num: '04',
            title: 'Gambiarras no-code custam o dobro no dia seguinte',
            desc: 'Automações frágeis montadas sem rastreabilidade, sem logs e sem tratamento de erros quebram exatamente quando você mais precisa: no pico da sua campanha. Nós construímos sistemas com fundação de engenharia para aguentar escala real.'
        },
        {
            num: '05',
            title: 'IA Corporativa exige travas e guardrails rígidos',
            desc: 'Inteligência Artificial sem guardrails alucina, inventa descontos e compromete a reputação da sua marca. Na IDSR, os agentes operam estritamente ancorados nos dados e regras da sua empresa.'
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
                            Manifesto de Engenharia
                        </p>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extralight text-[#E7ECEF] mb-6 leading-tight">
                        O Fim dos Atalhos na Engenharia Operacional
                    </h1>
                    <p className="text-lg text-[#0D7C66] font-light mb-6">
                        Por que empresas que querem crescer de verdade não podem depender de gambiarras
                    </p>
                    <p className="text-sm text-[#E7ECEF]/60 max-w-2xl mx-auto leading-relaxed">
                        Uma declaração aberta contra a ilusão de soluções mágicas, ferramentas frágeis e o custo
                        invisível do caos operacional.
                    </p>
                </div>
            </section>

            {/* Contexto do Manifesto */}
            <GlassSection className="py-16">
                <div className="max-w-3xl mx-auto px-6 space-y-8 text-sm sm:text-base text-[#E7ECEF]/70 leading-relaxed font-light">
                    <div className="border-l-2 border-[#0D7C66] pl-6 py-2 my-6">
                        <p className="text-lg sm:text-xl text-[#E7ECEF] italic font-normal">
                            &ldquo;Todo mundo quer automação rápida até o primeiro dia de campanha cair, os leads ficarem
                            travados no funil e o cliente do outro lado do WhatsApp receber uma resposta alucinada.&rdquo;
                        </p>
                    </div>

                    <p>
                        Nos últimos anos, o mercado foi inundado por promessas fáceis: "crie seu agente em 5 minutos",
                        "conecte 10 ferramentas sem saber programar", "deixe sua empresa no piloto automático sem esforço".
                    </p>

                    <p>
                        A realidade de quem tem uma folha de pagamento para honrar e centenas de clientes entrando por dia
                        é muito diferente. Ferramentas improvisadas quebram sem aviso, bancos de dados ficam dessincronizados,
                        e o dono da empresa se vê apagando incêndios operacionais às 22h de um domingo.
                    </p>

                    <p>
                        Na <strong>IDSR</strong>, nós nos recusamos a participar dessa farsa. Nós acreditamos que a operação
                        comercial de uma empresa é a sua artéria principal de sobrevivência — e você não opera o coração
                        do seu negócio com atalhos de fim de semana.
                    </p>
                </div>
            </GlassSection>

            {/* Os 5 Mandamentos */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center mx-auto mb-4">
                            <Terminal className="w-6 h-6 text-[#0D7C66]" />
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extralight text-[#E7ECEF] mb-4">
                            Os Cinco Princípios Inegociáveis da IDSR
                        </h2>
                        <p className="text-sm text-[#E7ECEF]/50 max-w-xl mx-auto">
                            O padrão de rigor técnico que aplicamos em cada sistema, integração e agente autônomo que colocamos em produção.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {mandamentos.map((item) => (
                            <div
                                key={item.num}
                                className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#2a2a2a] hover:border-[#0D7C66]/50 transition-all flex flex-col sm:flex-row items-start gap-6"
                            >
                                <span className="font-mono text-xl sm:text-2xl font-bold text-[#0D7C66] px-3 py-1 bg-[#0D7C66]/10 border border-[#0D7C66]/20 rounded-xl shrink-0">
                                    {item.num}
                                </span>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-light text-[#E7ECEF] mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-[#E7ECEF]/60 leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conclusão & Assinatura */}
            <GlassSection className="py-16">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF]">
                        Para Quem É e Para Quem Não É a IDSR
                    </h3>
                    <p className="text-sm sm:text-base text-[#E7ECEF]/70 leading-relaxed font-light">
                        Se você procura uma solução de R$ 50 para brincar de robô no fim de semana, nós não somos a sua empresa.
                        Mas se você gerencia uma operação séria, investe em tráfego, atende centenas de clientes e precisa de
                        um braço de engenharia de software para blindar suas vendas 24 horas por dia, <strong>seja muito bem-vindo</strong>.
                    </p>

                    <div className="pt-8 border-t border-[#2a2a2a] inline-block text-left">
                        <p className="font-mono text-sm font-bold text-[#E7ECEF]">
                            {CONTACT_CONFIG.founderFullName}
                        </p>
                        <p className="text-xs text-[#0D7C66] font-mono">
                            Fundador & Engenheiro de Sistemas · IDSR
                        </p>
                    </div>
                </div>
            </GlassSection>

            {/* Bottom CTA */}
            <section className="py-20 px-6 text-center border-t border-[#1a1a1a]">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Pronto para elevar o nível da sua operação?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8 leading-relaxed">
                        Converse diretamente com o Rocha e descubra como desenhar uma infraestrutura sob medida para suas vendas.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={getWhatsAppUrl({ origem: 'manifesto' })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20 cursor-pointer"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Falar com Rocha no WhatsApp
                        </a>
                        <a
                            href="/produtos"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#252525] transition-all"
                        >
                            Conhecer os produtos IDSR
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
