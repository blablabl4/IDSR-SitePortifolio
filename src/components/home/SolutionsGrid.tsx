'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Calendar, Users2, ClipboardList, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

interface SolutionItem {
  title: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  subtitle: string;
  tagline: string;
  solutions: string[];
}

const SOLUTIONS: SolutionItem[] = [
  {
    title: 'Central',
    slug: 'central',
    tagline: 'Pulse',
    icon: Activity,
    subtitle: 'Atendimento & Triagem 24/7',
    solutions: [
      'Resposta imediata em canais múltiplos (WhatsApp, Web)',
      'Qualificação de leads antes de transferir à equipe',
      'Painel de indicadores essenciais e histórico unificado',
    ],
  },
  {
    title: 'Agenda',
    slug: 'agenda',
    tagline: 'ScheduleFlow',
    icon: Calendar,
    subtitle: 'Agendamento Sem Conflito',
    solutions: [
      'Confirmação e lembretes automáticos via WhatsApp',
      'Remarcação sem atrito com links inteligentes',
      'Redução drástica de no-show com réguas programadas',
    ],
  },
  {
    title: 'Vendas',
    slug: 'vendas',
    tagline: 'LeadFlow',
    icon: Users2,
    subtitle: 'Funil Sem Gargalo',
    solutions: [
      'Pipeline visual com status atualizado em tempo real',
      'Follow-up automático para oportunidades que esfriam',
      'Alertas de clientes parados para o time comercial',
    ],
  },
  {
    title: 'Operação',
    slug: 'operacao',
    tagline: 'OpsFlow',
    icon: ClipboardList,
    subtitle: 'Rotinas & Checklists Rastreáveis',
    solutions: [
      'Checklists operacionais com registro de quem fez e quando',
      'Visão de tarefas e gargalos por tempo de execução',
      'Notificações e alertas preventivos de tarefas em atraso',
    ],
  },
];

export function SolutionsGrid() {
  return (
    <section id="solucoes" className="relative w-full py-24 bg-[#0c0c0c]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection variant="fade-up" className="text-center mb-16">
          <div className="inline-block px-3.5 py-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-full mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#0D7C66] font-medium">
              Módulos Estruturados
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extralight text-[#E7ECEF] mb-4">
            O que resolvemos com método
          </h2>
          <p className="text-sm text-[#E7ECEF]/50 max-w-lg mx-auto mb-6 leading-relaxed">
            Processo padronizado com rastreabilidade: entrada clara, execução documentada e métricas em tempo real.
          </p>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-1.5 text-xs text-[#0D7C66] hover:text-[#0F5A47] transition-colors"
          >
            Ver todos os detalhes dos produtos
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </AnimatedSection>

        {/* 2x2 Grid com stagger */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" staggerDelay={0.12}>
          {SOLUTIONS.map((item, i) => (
            <StaggerItem key={i}>
              <Link href={`/produtos#${item.slug}`} className="block h-full">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-2xl hover:border-[#0D7C66]/50 shadow-xl shadow-black/40 transition-all cursor-pointer group h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#0B3B2E]/20 flex items-center justify-center border border-[#0B3B2E]/40 group-hover:bg-[#0D7C66]/20 group-hover:shadow-lg group-hover:shadow-[#0D7C66]/10 transition-all duration-300">
                        <item.icon className="w-6 h-6 text-[#0D7C66]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-light text-[#E7ECEF]">{item.title}</h3>
                          <span className="text-[10px] font-mono uppercase bg-[#0f0f0f] border border-[#2a2a2a] px-2 py-0.5 rounded text-[#B8956A]">
                            {item.tagline}
                          </span>
                        </div>
                        <p className="text-xs text-[#E7ECEF]/40 mt-0.5">{item.subtitle}</p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {item.solutions.map((s, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-[#E7ECEF]/60 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-[#0D7C66] mt-0.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-[#2a2a2a]/40 mt-6 flex items-center justify-between text-xs text-[#0D7C66] group-hover:text-[#E7ECEF] transition-colors">
                    <span>Conhecer arquitetura do módulo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Custom Card - Full Width */}
        <AnimatedSection variant="fade-up" delay={400}>
          <Link href="/produtos#sob-medida" className="block">
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="bg-[#111111] border border-[#B8956A]/40 p-8 rounded-2xl shadow-xl shadow-black/40 cursor-pointer group hover:border-[#B8956A]/70 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#0B3B2E]/20 flex items-center justify-center border border-[#0B3B2E]/40">
                    <Target className="w-7 h-7 text-[#B8956A]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-light text-[#E7ECEF]">Sob Medida</h3>
                      <span className="text-[10px] uppercase tracking-wider text-[#B8956A] bg-[#B8956A]/10 border border-[#B8956A]/30 px-2 py-0.5 rounded">
                        Enterprise & Custom
                      </span>
                    </div>
                    <p className="text-sm text-[#E7ECEF]/40 mt-1">
                      Quando o padrão de prateleira não atende a sua complexidade operacional
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-[#E7ECEF]/60">
                  <span className="bg-[#B8956A]/10 border border-[#B8956A]/30 px-3 py-1.5 rounded-lg">
                    Integrações com ERP / PDV
                  </span>
                  <span className="bg-[#B8956A]/10 border border-[#B8956A]/30 px-3 py-1.5 rounded-lg">
                    Governança & Rastreabilidade
                  </span>
                  <span className="bg-[#B8956A]/10 border border-[#B8956A]/30 px-3 py-1.5 rounded-lg">
                    Blueprint Exclusivo
                  </span>
                  <span className="bg-[#B8956A]/10 border border-[#B8956A]/30 px-3 py-1.5 rounded-lg">
                    SLA Dedicado
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
