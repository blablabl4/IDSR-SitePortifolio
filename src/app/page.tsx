'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { DotContainer } from '@/components/ui/DotContainer';
import { GlassSection } from '@/components/ui/GlassSection';
import { TypewriterPlaceholder } from '@/components/ui/TypewriterPlaceholder';
import { PainCarousel } from '@/components/ui/PainCarousel';
import { MiniLogoCarousel } from '@/components/ui/MiniLogoCarousel';
import { Footer } from '@/components/ui/Footer';
import { ChatConsentBanner } from '@/components/ui/ChatConsentBanner';
import { ArrowRight, Zap, Calendar, Users2, ClipboardList, X, Sparkles, MessageSquare, CheckCircle, Shield, Send, ArrowUpRight, Route, FileText, Rocket, Target, Activity, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Center modal when expanded
  useEffect(() => {
    if (isExpanded && modalRef.current) {
      const modalRect = modalRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const modalCenter = modalRect.top + modalRect.height / 2;
      const scrollOffset = modalCenter - viewportCenter;

      window.scrollBy({
        top: scrollOffset,
        behavior: 'smooth'
      });
    }
  }, [isExpanded]);

  // Removed auto-scroll to prevent page from scrolling when modal opens
  // The chat content scrolls internally via ChatInterface component
  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  // Section title glow effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const titles = document.querySelectorAll(`[data-section="${sectionId}"]`);

          titles.forEach((title) => {
            if (entry.isIntersecting) {
              title.classList.add('active');
            } else {
              title.classList.remove('active');
            }
          });
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('section[id], .glass-section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Check consent
    if (!hasConsent) {
      alert('Por favor, aceite os termos para usar o chat.');
      return;
    }

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue("");

    if (!isExpanded) {
      setIsExpanded(true);
    }

    setIsTyping(true);

    try {
      // Call AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'bot',
            content: m.text
          })),
          userConsent: hasConsent
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: data.response
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente.'
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleConsentAccept = () => {
    setHasConsent(true);
    setShowConsentBanner(false);
    // Store consent in localStorage
    localStorage.setItem('idsr_chat_consent', 'true');
  };

  const handleConsentDecline = () => {
    setHasConsent(false);
    setShowConsentBanner(false);
    setIsExpanded(false);
  };

  // Check for existing consent on mount
  useEffect(() => {
    const consent = localStorage.getItem('idsr_chat_consent');
    if (consent === 'true') {
      setHasConsent(true);
      setShowConsentBanner(false);
    }
  }, []);

  const handleClose = () => {
    setIsExpanded(false);
    setMessages([]);
    setInputValue("");
  };

  return (
    <main className="relative min-h-screen flex flex-col text-[#E7ECEF] selection:bg-[#0B3B2E] selection:text-white bg-[#0a0a0a]">
      <GlassHeader />

      {/* Hero Section - WITH DOT EFFECT */}
      <DotContainer className="w-full pt-32 pb-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center px-6">

          <motion.div
            animate={{
              opacity: isExpanded ? 0 : 1,
              y: isExpanded ? -30 : 0,
              scale: isExpanded ? 0.95 : 1
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn("w-full text-center mb-8", isExpanded && "pointer-events-none")}
          >
            {/* Tagline */}
            <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
                Automação + Dados
              </p>
            </div>
            {/* Title - SEO optimized */}
            <h1 className="text-3xl md:text-5xl font-extralight tracking-tight text-[#E7ECEF] leading-tight mb-6">
              Operação que funciona enquanto você dorme.
            </h1>
            {/* Subtitle - SEO optimized */}
            <p className="text-base text-[#E7ECEF]/50 max-w-2xl mx-auto font-light">
              Automação de atendimento, agendamento e gestão para varejo, restaurantes e serviços.
            </p>
          </motion.div>

          {/* Chat Container */}
          <motion.div
            ref={modalRef}
            layout
            animate={{
              height: isExpanded ? '60vh' : 56,
              width: isExpanded ? '100%' : '100%'
            }}
            transition={{ type: "spring", stiffness: 200, damping: 30, mass: 1 }}
            className={cn(
              "relative bg-[#0f0f0f]/95 backdrop-blur-xl border border-[#E7ECEF]/10 overflow-hidden",
              "shadow-2xl shadow-black/50",
              isExpanded ? "rounded-2xl" : "rounded-xl max-w-2xl",
              "flex flex-col"
            )}
          >
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 56 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-[#E7ECEF]/5 flex justify-between items-center px-6 bg-[#0a0a0a] shrink-0"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0D7C66]" />
                    <span className="text-sm font-light text-[#E7ECEF]">Diagnóstico IDSR</span>
                  </div>
                  <button onClick={handleClose} className="p-2 hover:bg-[#E7ECEF]/5 rounded-full transition-colors">
                    <X className="w-4 h-4 text-[#E7ECEF]/30 hover:text-[#E7ECEF]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {isExpanded && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Consent Banner */}
                {showConsentBanner && !hasConsent && (
                  <ChatConsentBanner
                    onAccept={handleConsentAccept}
                    onDecline={handleConsentDecline}
                  />
                )}

                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}
                    >
                      <div className={cn(
                        "max-w-[80%] p-4 rounded-xl text-sm shadow-lg",
                        msg.role === 'user'
                          ? "bg-[#0D7C66]/25 border border-[#0D7C66]/50 text-[#E7ECEF]"
                          : "bg-[#1a1a1a] border border-[#2a2a2a] text-[#E7ECEF]"
                      )}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 p-4">
                    <span className="w-2 h-2 bg-[#0B3B2E] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#0B3B2E] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#0B3B2E] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}

            <form
              onSubmit={handleInputSubmit}
              className={cn("flex items-center gap-2 px-4 shrink-0", isExpanded ? "h-16 border-t border-[#E7ECEF]/5 bg-[#0a0a0a]" : "h-full")}
            >
              {!isExpanded && <MessageSquare className="w-5 h-5 text-[#E7ECEF]/20" />}
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isExpanded ? "Digite sua mensagem..." : ""}
                  className="w-full bg-transparent border-none outline-none text-[#E7ECEF] text-base font-light placeholder:text-[#E7ECEF]/30"
                />
                {!isExpanded && !inputValue && (
                  <div className="absolute inset-0 flex items-center pointer-events-none">
                    <TypewriterPlaceholder
                      phrases={[
                        "Descreva seu desafio operacional...",
                        "Minha equipe está perdendo leads...",
                        "Preciso automatizar agendamentos...",
                        "Como reduzir no-shows?"
                      ]}
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className={cn(
                  "rounded-lg flex items-center justify-center transition-colors",
                  isExpanded ? "w-10 h-10 bg-[#0B3B2E] hover:bg-[#0B3B2E]/80 shadow-lg shadow-[#0B3B2E]/20" : "w-10 h-10 hover:bg-[#E7ECEF]/5"
                )}
              >
                {isExpanded ? <Send className="w-4 h-4 text-[#E7ECEF]" /> : <ArrowRight className="w-5 h-5 text-[#E7ECEF]/40" />}
              </button>
            </form>
          </motion.div>
        </div>
      </DotContainer>

      {/* Products Section - 2x2 Grid + Custom Card */}
      <section className="relative w-full py-24 bg-[#0c0c0c]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] mb-4 transition-all duration-500 section-title" data-section="produtos">Soluções</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-[#E7ECEF] mb-4">O que resolvemos</h2>
            <p className="text-sm text-[#E7ECEF]/40 max-w-lg mx-auto mb-6">
              Processo padronizado com rastreabilidade. Entrada, execução e métrica definidas.
            </p>
            <a href="/produtos" className="inline-block text-xs text-[#0D7C66] hover:text-[#0F5A47] transition-colors">
              Ver todos os produtos →
            </a>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              {
                title: 'Central',
                slug: 'central',
                icon: Activity,
                subtitle: 'Visão da operação',
                solutions: [
                  'Painel com indicadores essenciais',
                  'Resumo semanal automatizado',
                  'Alertas configuráveis por regra'
                ]
              },
              {
                title: 'Agenda',
                slug: 'agenda',
                icon: Calendar,
                subtitle: 'Agendamento automatizado',
                solutions: [
                  'Confirmação e lembrete automático',
                  'Remarcação sem atrito',
                  'Redução de no-show com régua de contato'
                ]
              },
              {
                title: 'Vendas',
                slug: 'vendas',
                icon: Users2,
                subtitle: 'Captação e qualificação',
                solutions: [
                  'Resposta imediata a novos contatos',
                  'Qualificação automatizada por critério',
                  'Follow-up com régua definida'
                ]
              },
              {
                title: 'Operação',
                slug: 'operacao',
                icon: ClipboardList,
                subtitle: 'Padronização de equipe',
                solutions: [
                  'Checklists com registro de execução',
                  'Status de tarefas em tempo real',
                  'Identificação de gargalos por tempo de ciclo'
                ]
              }
            ].map((item, i) => (
              <a
                key={i}
                href={`/produtos#${item.slug}`}
                className="block"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-2xl hover:border-[#0D7C66]/50 shadow-xl shadow-black/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0B3B2E]/10 flex items-center justify-center border border-[#0B3B2E]/20 group-hover:bg-[#0B3B2E]/20 transition-colors">
                      <item.icon className="w-6 h-6 text-[#0D7C66]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-light text-[#E7ECEF]">{item.title}</h3>
                      <p className="text-xs text-[#E7ECEF]/40">{item.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {item.solutions.map((s, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[#E7ECEF]/60">
                        <CheckCircle className="w-4 h-4 text-[#0D7C66] mt-0.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </a>
            ))}
          </div>

          {/* Custom Card - Full Width */}
          <a href="/produtos#sob-medida" className="block">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-[#111111] border border-[#B8956A]/40 p-8 rounded-2xl shadow-xl shadow-black/40 cursor-pointer group hover:border-[#B8956A]/60 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#0B3B2E]/20 flex items-center justify-center border border-[#0B3B2E]/40">
                    <Target className="w-7 h-7 text-[#B8956A]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-[#E7ECEF]">Sob Medida</h3>
                    <p className="text-sm text-[#E7ECEF]/40">Quando o padrão não atende</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-[#E7ECEF]/50">
                  <span className="bg-[#B8956A]/10 border border-[#B8956A]/30 px-3 py-1.5 rounded-lg">Integrações complexas</span>
                  <span className="bg-[#B8956A]/10 border border-[#B8956A]/30 px-3 py-1.5 rounded-lg">Governança e compliance</span>
                  <span className="bg-[#B8956A]/10 border border-[#B8956A]/30 px-3 py-1.5 rounded-lg">Blueprint dedicado</span>
                  <span className="bg-[#B8956A]/10 border border-[#B8956A]/30 px-3 py-1.5 rounded-lg">Suporte prioritário</span>
                </div>
              </div>
            </motion.div>
          </a>
        </div>
      </section>

      {/* Pain Points Carousel - "WOW" Section */}
      <GlassSection className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] mb-12 transition-all duration-500 section-title" data-section="dores">Entendemos sua dor</p>

          <PainCarousel
            autoPlayInterval={5000}
            items={[
              {
                pain: "Perco leads porque demoro para responder.",
                solution: "Resposta automática em segundos, com qualificação e encaminhamento."
              },
              {
                pain: "Metade dos agendamentos vira no-show.",
                solution: "Régua de confirmação com lembrete e remarcação sem atrito."
              },
              {
                pain: "Não sei o que está funcionando ou não.",
                solution: "Painel com indicadores claros. Semanal no email, diário no painel."
              },
              {
                pain: "Minha equipe faz cada um do seu jeito.",
                solution: "Checklists padronizados com registro de execução."
              },
              {
                pain: "Dependo de planilha e memória para tomar decisão.",
                solution: "Dados estruturados com alertas automáticos por regra."
              },
              {
                pain: "Suporte some depois que contrato.",
                solution: "Portal com histórico, WhatsApp de suporte e SLA definido."
              }
            ]}
          />

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-sm text-[#E7ECEF]/40 mb-4">Sua dor não está aqui?</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-colors shadow-lg shadow-[#0D7C66]/20"
            >
              Conte o que está enfrentando
            </button>
          </div>
        </div>
      </GlassSection>

      {/* Customer Journey Section - Cascade Cards */}
      <section className="relative w-full py-24 bg-[#0c0c0c] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] mb-4 transition-all duration-500 section-title" data-section="jornada">Como funciona</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-[#E7ECEF] mb-4">
              Do primeiro contato à operação rodando
            </h2>
            <p className="text-sm text-[#E7ECEF]/40 max-w-lg mx-auto">
              Cada etapa com prazo e entrega definidos. Sem surpresas.
            </p>
          </div>

          {/* Cascade Cards */}
          <div className="relative flex flex-col items-center">
            {[
              {
                step: '01',
                title: 'Diagnóstico',
                desc: 'Nossa IA entende seu contexto, identifica gargalos e recomenda a solução.',
                time: '3–7 minutos',
                highlight: 'Gratuito e sem compromisso'
              },
              {
                step: '02',
                title: 'Proposta',
                desc: 'Você recebe um plano claro com escopo, prazo e investimento.',
                time: 'Imediato',
                highlight: 'Transparência total'
              },
              {
                step: '03',
                title: 'Início',
                desc: 'Alinhamos métricas de sucesso e criamos o planejamento do projeto.',
                time: '30 minutos',
                highlight: 'Definição de indicadores'
              },
              {
                step: '04',
                title: 'Implantação',
                desc: 'Configuramos, testamos e validamos cada fluxo antes de ativar.',
                time: 'Conforme escopo',
                highlight: 'Testes completos'
              },
              {
                step: '05',
                title: 'Ativação',
                desc: 'Sua operação entra no ar com suporte próximo para ajustes finos.',
                time: '7 dias de estabilização',
                highlight: 'Entrega documentada'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.05,
                  zIndex: 50,
                  boxShadow: '0 25px 50px -12px rgba(184, 149, 106, 0.4)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-2xl bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 md:p-8 cursor-pointer group hover:border-[#B8956A]/60 transition-colors"
                style={{
                  marginTop: i === 0 ? 0 : -24,
                  zIndex: 10 - i
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {/* Step Number */}
                  <div className="w-14 h-14 rounded-xl bg-[#0B3B2E]/20 border border-[#0B3B2E]/40 flex items-center justify-center shrink-0 group-hover:bg-[#B8956A]/30 group-hover:border-[#B8956A]/50 transition-colors">
                    <span className="text-xl font-light text-[#0B3B2E] group-hover:text-[#B8956A] transition-colors">{item.step}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-light text-[#E7ECEF]">{item.title}</h3>
                      <span className="text-[10px] uppercase tracking-wide text-[#0B3B2E] bg-[#0B3B2E]/10 px-2 py-1 rounded group-hover:text-[#B8956A] group-hover:bg-[#B8956A]/10 transition-colors">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm text-[#E7ECEF]/50 mb-2">{item.desc}</p>
                    <p className="text-xs text-[#0B3B2E] opacity-0 group-hover:opacity-100 group-hover:text-[#B8956A] transition-all duration-300">
                      → {item.highlight}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Trust Section */}
      <GlassSection className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* About */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] mb-4">Sobre a IDSR</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-[#E7ECEF] mb-6 leading-relaxed">
                Automação com método, dados com contexto.
              </h2>
              <p className="text-sm text-[#E7ECEF]/50 leading-relaxed mb-4">
                Nascemos para resolver um problema simples: empresas perdem tempo, dinheiro e clientes por falta de processo e visibilidade.
              </p>
              <p className="text-sm text-[#E7ECEF]/50 leading-relaxed mb-6">
                Entregamos automação com rastreabilidade — cada fluxo configurado gera dados, cada dado vira decisão. Sem sistema fechado, sem promessas vazias.
              </p>
              <a href="/sobre" className="inline-block text-xs text-[#0D7C66] hover:text-[#0F5A47] transition-colors">
                Conheça nossa história →
              </a>
            </div>

            {/* Trust - Mini Carousel */}
            <div className="text-center md:text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] mb-6">Quem confia</p>
              <MiniLogoCarousel
                logos={[
                  { src: '/clients/zapao.png', alt: 'Zapão' },
                  { src: '/clients/casa-rael.png', alt: 'Casa Rael' },
                ]}
                autoPlayInterval={4000}
              />
            </div>

          </div>
        </div>
      </GlassSection>

      {/* CTA Section - WITH DOT EFFECT */}
      <DotContainer className="w-full py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg mb-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E]">Próximo passo</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-extralight text-[#E7ECEF] mb-6 leading-tight">
            Sua operação pode funcionar melhor.<br className="hidden md:block" />
            Vamos mostrar como.
          </h2>
          <p className="text-sm text-[#E7ECEF]/40 mb-10 max-w-md mx-auto">
            Diagnóstico gratuito com IA. Você responde algumas perguntas, nós entregamos um plano claro.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-xl shadow-[#0D7C66]/30 flex items-center gap-2 group mx-auto"
          >
            Começar diagnóstico
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </DotContainer>


      <Footer />

    </main>
  );
}
