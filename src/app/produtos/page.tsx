'use client';

import React, { useState, useEffect } from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { Footer } from '@/components/ui/Footer';
import { 
  MessageSquare, 
  LayoutDashboard, 
  Cpu, 
  Bot, 
  Layers, 
  ChevronDown, 
  Check, 
  ArrowRight, 
  Zap,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppUrl } from '@/lib/contact-config';
import { QuemPodeUsarSection } from '@/components/ui/QuemPodeUsarSection';

export default function ProdutosPage() {
    const products = [
        {
            id: 'automacoes',
            icon: MessageSquare,
            name: 'Automações Comerciais',
            tagline: 'WhatsApp, Direct & Telegram 24/7',
            subtitle: 'Atendimento e qualificação instantânea sem perder vendas por demora',
            description: 'Robôs e fluxos autônomos que qualificam contatos em menos de 3 segundos, enviam orçamentos, agendam horários e cobram follow-up 24 horas por dia, 7 dias por semana.',
            detailedDescription: 'Sistema completo de automação conversacional multicanal. Conecta seu tráfego de anúncios ao WhatsApp Oficial, Instagram Direct e Telegram. O lead é qualificado em segundos com triagem de perfil, recebe proposta instantânea e é direcionado ao vendedor ou tem o agendamento confirmado na hora.',
            salesTrigger: '78% dos clientes compram da primeira empresa que responde. Quem demora perde o lead para o concorrente.',
            features: [
                'Atendimento inteligente 24/7 no WhatsApp, Instagram e Telegram',
                'Qualificação automática de leads com triagem de perfil e renda',
                'Régua ativa de follow-up que impede orçamentos de esfriarem',
                'Distribuição automática de oportunidades quentes para corretores/vendedores',
                'Integração nativa com CRMs e planilhas em tempo real'
            ],
            useCases: [
                'Atender e qualificar leads de tráfego pago em menos de 3 segundos',
                'Operar vendas e suporte 24 horas por dia sem inflar equipe',
                'Recuperação automática de propostas e orçamentos parados',
                'Agendamento automático de consultas, reuniões e visitas'
            ],
            integrations: ['WhatsApp Business Cloud API', 'Instagram Direct', 'Telegram', 'HubSpot', 'Pipedrive', 'RD Station'],
            pricing: 'A partir de R$ 997/mês',
            accentColor: '#38e0e0',
            metrics: 'RESPOSTA < 3s · ATÉ 3X MAIS CONVERSÃO'
        },
        {
            id: 'sites-dashboards',
            icon: LayoutDashboard,
            name: 'Sites, Landing Pages & Dashboards',
            tagline: 'Alta Conversão & BI em Tempo Real',
            subtitle: 'Páginas ultravelozes e painéis analíticos para gestão visual sem planilhas',
            description: 'Páginas desenhadas para transformar visitantes em dinheiro e painéis de leitura executiva para enxergar seus números em tempo real. Carregamento em milissegundos e métricas transparentes.',
            detailedDescription: 'Desenvolvimento de interfaces de altíssimo impacto visual e performance extrema. Landing pages com copywriting persuasivo desenhadas para maximizar o retorno dos seus anúncios pagos, somadas a painéis de Business Intelligence (BI) para acompanhar faturamento, CAC, ROAS e conversão por canal.',
            salesTrigger: 'Design amador custa caro: páginas lentas perdem 20% das vendas a cada segundo de atraso. Construa autoridade imediata.',
            features: [
                'Landing Pages de altíssima conversão otimizadas para Meta Ads e Google Ads',
                'Dashboards analíticos interativos com atualização em tempo real',
                'Carregamento ultrarrápido (<0.8s) com nota 95+ no Google PageSpeed',
                'Painel de leitura executiva com faturamento, conversão e CAC por canal',
                'Rastreamento avançado com Pixel, Google Tag Manager e Server-Side API'
            ],
            useCases: [
                'Páginas de vendas para lançamento de infoprodutos ou serviços de alto ticket',
                'Substituição de planilhas confusas por um dashboard executivo direto',
                'Acompanhamento do funil de vendas e desempenho do time comercial',
                'Sites institucionais premium que transmitem autoridade corporativa'
            ],
            integrations: ['Next.js / React', 'Google Tag Manager', 'Meta Pixel', 'PostgreSQL / Supabase', 'Google Analytics 4'],
            pricing: 'Projetos a partir de R$ 2.497',
            accentColor: '#8b5cf6',
            metrics: 'PAGESPEED 95+ · CARREGAMENTO < 0.8s'
        },
        {
            id: 'dados-robos',
            icon: Cpu,
            name: 'Dados, Scrapers & Robôs (RPA)',
            tagline: 'Automação de Processos & Zero Erro',
            subtitle: 'Robôs que executam o trabalho repetitivo da sua empresa com precisão cirúrgica',
            description: 'Robôs autônomos que realizam tarefas repetitivas sem errar e sem cansar: extração de dados da web, monitoramento de concorrentes, conciliação fiscal e alimentação de ERPs.',
            detailedDescription: 'Engenharia de automação robótica de processos (RPA) e pipelines de dados. Seus funcionários não precisam passar o dia digitando notas, baixando relatórios de bancos ou checando estoques manualmente. Nossos robôs executam tarefas com precisão matemática e enviam relatórios auditados direto no seu canal de preferência.',
            salesTrigger: 'Acabe com o erro humano de digitação em notas e pedidos. Economize centenas de horas de trabalho braçal todo mês.',
            features: [
                'Robôs de RPA para conciliação bancária, emissão de NFe e cadastros',
                'Web Scrapers inteligentes para mineração de mercado e preços de concorrentes',
                'Sincronização bidirecional entre sistemas legados, ERPs e bancos de dados',
                'Alertas em tempo real no Telegram/WhatsApp para anomalias ou divergências',
                'Logs e trilha de auditoria completa para conformidade e segurança'
            ],
            useCases: [
                'Conciliação bancária e fiscal automática sem conferência manual',
                'Monitoramento contínuo de preços de concorrentes em marketplaces',
                'Sincronização de estoque e pedidos entre múltiplos ERPs e lojas',
                'Automação de rotinas contábeis, emissão de guias e relatórios periódicos'
            ],
            integrations: ['Bling', 'Tiny', 'Omie', 'TOTVS', 'Bancos & Gateways de Pagamento', 'Python / Playwright'],
            pricing: 'A partir de R$ 1.497/mês',
            accentColor: '#10b981',
            metrics: '0% ERRO HUMANO · -90% TEMPO OPERACIONAL'
        },
        {
            id: 'agentes-ia',
            icon: Bot,
            name: 'Agentes de IA Corporativa',
            tagline: 'RAG & Guardrails Estritos',
            subtitle: 'Inteligência artificial calibrada para sua empresa sem alucinações',
            description: 'Agentes inteligentes treinados exclusivamente na base de dados, catálogos e regras da sua empresa. Atendimento consultivo que negocia, tira dúvidas complexas e agenda compromissos.',
            detailedDescription: 'Implementação de modelos de inteligência artificial aplicados aos processos corporativos reais. Nossos agentes utilizam arquitetura RAG (Retrieval-Augmented Generation) com guardrails rígidos anti-alucinação: eles respondem com precisão com base nos manuais, contratos e catálogos da sua empresa, compreendendo áudios, imagens e textos.',
            salesTrigger: 'A IA fala apenas a verdade da sua empresa com segurança jurídica e transbordo humano no ápice da negociação.',
            features: [
                'Agentes treinados no acervo de produtos, PDFs e manuais internos da sua empresa',
                'Guardrails estritos de conformidade (zero alucinações e respostas inventadas)',
                'Capacidade nativa de escutar e responder áudios no WhatsApp',
                'Transbordo suave e contextualizado para atendentes humanos quando necessário',
                'Rastreabilidade total das conversas com logs de raciocínio da IA'
            ],
            useCases: [
                'Suporte técnico e consultivo de produtos complexos no WhatsApp',
                'Triagem médica ou jurídica preliminar antes do atendimento especialista',
                'Consulta instantânea de manuais e regulamentos por funcionários internos',
                'Negociação automatizada de planos e propostas pré-estabelecidas'
            ],
            integrations: ['OpenAI / Claude', 'LangChain', 'Pinecone / Pgvector', 'WhatsApp Cloud API', 'Webhooks'],
            pricing: 'A partir de R$ 1.897/mês',
            accentColor: '#ec4899',
            metrics: '0% ALUCINAÇÃO · 85% RESOLUÇÃO IMEDIATA'
        },
        {
            id: 'personalizados',
            icon: Layers,
            name: 'Sistemas Sob Medida',
            tagline: 'Engenharia Dedicada & Arquitetura',
            subtitle: 'Desenvolvimento proprietário quando ferramentas prontas não atendem',
            description: 'Quando ferramentas de prateleira travam o crescimento da sua empresa, construímos o sistema perfeito para sua regra de negócio. Portais de clientes, ERPs internos e infraestruturas escaláveis.',
            detailedDescription: 'Engenharia de software de ponta para empresas que exigem arquitetura dedicada, segurança máxima e independência de plataformas genéricas. Desenvolvemos desde portais de autoatendimento para clientes até esteiras operacionais completas para indústrias, franquias e operações financeiras de alta concorrência.',
            salesTrigger: 'Não pague mensalidades astronômicas por usuário em ferramentas genéricas. Tenha um sistema proprietário que valoriza sua empresa.',
            features: [
                'Desenvolvimento Full-Stack moderno com React/Next.js, Node e bancos velozes',
                'Portais de clientes, painéis internos e sistemas de gestão dedicados',
                'Integração e modernização de softwares legados via APIs seguras',
                'Infraestrutura em nuvem resiliente com monitoramento 24/7 e deploy contínuo',
                'Código-fonte proprietário da sua empresa sem dependência de terceiros'
            ],
            useCases: [
                'Portal B2B de pedidos com tabela personalizada por perfil de cliente',
                'Substituição de múltiplos SaaS caros por uma plataforma unificada própria',
                'Plataformas de gestão de franquias com consolidação de faturamento',
                'Sistemas com regras fiscais, tributárias ou operacionais complexas'
            ],
            integrations: ['APIs REST/gRPC', 'PostgreSQL / Redis', 'AWS / Vercel', 'ERPs Legados'],
            pricing: 'Projetos a partir de R$ 4.900',
            accentColor: '#f59e0b',
            metrics: '100% PROPRIETÁRIO · ALTA CONCORRÊNCIA'
        }
    ];

    // Lê o hash da URL já no estado inicial (em vez de montar sempre com 'automacoes'
    // e corrigir depois num efeito) — evita o setState síncrono dentro do useEffect
    // e o "flash" do produto errado expandido antes da correção.
    const [expandedProduct, setExpandedProduct] = useState<string | null>(() => {
        if (typeof window === 'undefined') return 'automacoes';
        const hash = window.location.hash.replace('#', '');
        return products.some(p => p.id === hash) ? hash : 'automacoes';
    });

    useEffect(() => {
        // products é recriado a cada render (não memoizado); incluir como dep faria
        // este efeito rodar em todo render e reagendar o scroll repetidamente.
        const hash = window.location.hash.replace('#', '');
        if (hash && products.some(p => p.id === hash)) {
            const timer = setTimeout(() => {
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, []);

    const toggleProduct = (productId: string) => {
        setExpandedProduct(expandedProduct === productId ? null : productId);
        window.history.replaceState(null, '', expandedProduct === productId ? '#' : `#${productId}`);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-[#E7ECEF]">
            <GlassHeader />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-[#38e0e0]" />
                        <span className="text-[11px] uppercase tracking-widest text-[#38e0e0] font-mono font-bold">
                            ENGENHARIA & AUTOMAÇÃO IDSR
                        </span>
                    </div>

                    <h1 
                        className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Soluções Construídas para Escalar
                    </h1>

                    <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
                        Eliminamos a perda de leads, o retrabalho braçal e os gargalos de software da sua operação. Explore cada pilar técnico ou veja como combiná-los para o seu nicho.
                    </p>
                </div>
            </section>

            {/* Products Accordion */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto space-y-4">
                    {products.map((product) => {
                        const isExpanded = expandedProduct === product.id;
                        const Icon = product.icon;

                        return (
                            <div
                                key={product.id}
                                id={product.id}
                                className={`bg-[#121318] border rounded-2xl overflow-hidden transition-all duration-300 ${
                                    isExpanded 
                                        ? 'border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.6)]' 
                                        : 'border-white/10 hover:border-white/20'
                                }`}
                            >
                                {/* Header - Always Visible */}
                                <button
                                    type="button"
                                    onClick={() => toggleProduct(product.id)}
                                    className="w-full p-6 sm:p-8 flex items-center justify-between text-left cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center gap-5 sm:gap-6">
                                        <div 
                                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 border transition-colors"
                                            style={{
                                                backgroundColor: `${product.accentColor}15`,
                                                borderColor: `${product.accentColor}30`,
                                                color: product.accentColor
                                            }}
                                        >
                                            <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span 
                                                    className="text-xs font-mono font-bold tracking-wider uppercase"
                                                    style={{ color: product.accentColor }}
                                                >
                                                    {product.tagline}
                                                </span>
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                                                {product.name}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-white/60">
                                                {product.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="shrink-0 ml-4"
                                    >
                                        <ChevronDown className="w-6 h-6 text-white/50" />
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
                                            className="border-t border-white/10"
                                        >
                                            <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                                                {/* Gatilho Comercial em Destaque */}
                                                <div 
                                                    className="p-4 rounded-xl border flex items-center gap-3"
                                                    style={{
                                                        backgroundColor: `${product.accentColor}0a`,
                                                        borderColor: `${product.accentColor}30`
                                                    }}
                                                >
                                                    <Zap className="w-5 h-5 shrink-0" style={{ color: product.accentColor }} />
                                                    <p className="text-xs sm:text-sm font-semibold text-white/90">
                                                        <strong style={{ color: product.accentColor }}>POR QUE CONTRATAR:</strong> {product.salesTrigger}
                                                    </p>
                                                </div>

                                                {/* Description */}
                                                <div>
                                                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-2">
                                                        {'// VISÃO GERAL DA SOLUÇÃO'}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                                                        {product.detailedDescription}
                                                    </p>
                                                </div>

                                                {/* Features */}
                                                <div>
                                                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-3">
                                                        {'// ENTREGÁVEIS & RECURSOS'}
                                                    </h3>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                                        {product.features.map((feature, i) => (
                                                            <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs sm:text-sm text-white/80">
                                                                <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: product.accentColor }} />
                                                                <span>{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Use Cases */}
                                                <div>
                                                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-3">
                                                        {'// CASOS DE APLICAÇÃO IMEDIATA'}
                                                    </h3>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {product.useCases.map((useCase, i) => (
                                                            <div key={i} className="flex items-center gap-2.5 text-xs text-white/70">
                                                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: product.accentColor }} />
                                                                <span>{useCase}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Integrations */}
                                                <div>
                                                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 mb-3">
                                                        {'// COMPATIBILIDADE & INTEGRAÇÕES'}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {product.integrations.map((integration, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-3 py-1 rounded-md border border-white/10 bg-black/40 text-xs font-mono text-white/75"
                                                            >
                                                                {integration}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Pricing & CTA */}
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                                                    <div>
                                                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-0.5">Investimento Estimado</p>
                                                        <p className="text-base sm:text-lg font-bold text-white">{product.pricing}</p>
                                                        <span className="text-[10px] font-mono" style={{ color: product.accentColor }}>{product.metrics}</span>
                                                    </div>
                                                    <a
                                                        href={getWhatsAppUrl(`Olá Rocha! Vim pela página de Produtos e gostaria de agendar uma demonstração técnica de ${product.name} para minha empresa.`)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 group cursor-pointer transition-all shadow-lg text-black hover:brightness-110 active:scale-95"
                                                        style={{ backgroundColor: product.accentColor }}
                                                    >
                                                        <MessageSquare className="w-4 h-4" />
                                                        <span>Agendar Demonstração no WhatsApp</span>
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

            {/* SEÇÃO QUEM PODE USAR / NICHOS & COMBINAÇÕES */}
            <QuemPodeUsarSection />

            {/* CTA Final */}
            <section className="py-20 px-6 text-center border-t border-white/10 bg-black/60">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981] font-mono text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" />
                        <span>ATENDIMENTO DIRETO COM ENGENHEIRO SÊNIOR</span>
                    </div>

                    <h3 
                        className="text-2xl sm:text-4xl font-black text-white tracking-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Precisa de um ecossistema sob medida para sua operação?
                    </h3>

                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl mx-auto">
                        Sem vendedores agressivos ou intermediários. Você conversa diretamente com quem desenha a arquitetura técnica da sua solução.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <a
                            href={getWhatsAppUrl('Olá Rocha! Gostaria de conversar sobre uma arquitetura de automação e software sob medida para a minha empresa.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#10b981] to-[#38e0e0] text-black rounded-xl text-xs sm:text-sm font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] cursor-pointer"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Falar no WhatsApp (11) 98342-6767</span>
                        </a>
                        <a
                            href="/precos"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                        >
                            <span>Ver Planos e Pacotes</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
