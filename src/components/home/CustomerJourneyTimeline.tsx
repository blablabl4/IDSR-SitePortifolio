'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

interface JourneyStep {
  step: string;
  title: string;
  desc: string;
  time: string;
  highlight: string;
}

const STEPS: JourneyStep[] = [
  {
    step: '01',
    title: 'Diagnóstico Operacional',
    desc: 'Nossa IA e time entendem o cenário, mapeiam gargalos e apontam vazamentos de clientes ou tempo.',
    time: '3–7 minutos',
    highlight: 'Gratuito e sem compromisso',
  },
  {
    step: '02',
    title: 'Proposta & Blueprint',
    desc: 'Você recebe um plano claro com escopo exato, cronograma de implantação e valor em faixa justa.',
    time: 'Até 24h',
    highlight: 'Transparência total',
  },
  {
    step: '03',
    title: 'Alinhamento & Métricas',
    desc: 'Definimos os indicadores de sucesso (ex: redução de no-show, tempo de resposta e follow-up).',
    time: 'Reunião de 30 min',
    highlight: 'Critérios de sucesso',
  },
  {
    step: '04',
    title: 'Implantação & Testes',
    desc: 'Configuramos integrações, fluxos e testamos cada caminho crítico antes de ligar a operação.',
    time: 'Conforme complexidade',
    highlight: 'Homologação assistida',
  },
  {
    step: '05',
    title: 'Ativação & Estabilização',
    desc: 'Sua operação entra em produção com acompanhamento próximo do time técnico para calibração fina.',
    time: '7 dias de garantia ativa',
    highlight: 'Entrega documentada',
  },
];

export function CustomerJourneyTimeline() {
  return (
    <section id="jornada" className="relative w-full py-24 bg-[#0c0c0c] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection variant="fade-up" className="text-center mb-16">
          <div className="inline-block px-3.5 py-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-full mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#0D7C66] font-medium">
              Metodologia de Entrega
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extralight text-[#E7ECEF] mb-4">
            Do primeiro contato à operação rodando
          </h2>
          <p className="text-sm text-[#E7ECEF]/50 max-w-lg mx-auto leading-relaxed">
            Cada etapa possui prazo e entregável definidos. Sem surpresas ou sistemas abandonados.
          </p>
        </AnimatedSection>

        {/* Cascade Cards com stagger */}
        <StaggerContainer className="relative flex flex-col items-center" staggerDelay={0.1}>
          {STEPS.map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{
                  scale: 1.03,
                  zIndex: 50,
                  boxShadow: '0 25px 50px -12px rgba(184, 149, 106, 0.3)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative w-full max-w-2xl bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 md:p-8 cursor-pointer group hover:border-[#B8956A]/60 transition-colors"
                style={{
                  marginTop: i === 0 ? 0 : -20,
                  zIndex: 10 - i,
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {/* Step Number */}
                  <div className="w-14 h-14 rounded-xl bg-[#0B3B2E]/20 border border-[#0B3B2E]/40 flex items-center justify-center shrink-0 group-hover:bg-[#B8956A]/30 group-hover:border-[#B8956A]/50 transition-colors">
                    <span className="text-xl font-light text-[#0B3B2E] group-hover:text-[#B8956A] transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-light text-[#E7ECEF]">{item.title}</h3>
                      <span className="text-[10px] uppercase tracking-wide text-[#0B3B2E] bg-[#0B3B2E]/10 px-2.5 py-0.5 rounded group-hover:text-[#B8956A] group-hover:bg-[#B8956A]/10 transition-colors">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm text-[#E7ECEF]/50 mb-2 leading-relaxed">{item.desc}</p>
                    <p className="text-xs text-[#0B3B2E] opacity-0 group-hover:opacity-100 group-hover:text-[#B8956A] transition-all duration-300">
                      → {item.highlight}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
