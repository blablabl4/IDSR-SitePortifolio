'use client';

import React from 'react';
import { GlassSection } from '@/components/ui/GlassSection';
import { PainCarousel } from '@/components/ui/PainCarousel';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const PAIN_POINTS = [
  {
    pain: 'Perco clientes porque demoro para responder no WhatsApp.',
    solution: 'Central Pulse com resposta automática imediata, qualificação de interesse e roteamento para o vendedor certo.',
  },
  {
    pain: 'Metade dos meus agendamentos falta sem avisar (no-show).',
    solution: 'ScheduleFlow com régua de confirmação multicanal, lembretes automáticos e remarcação simplificada com 1 clique.',
  },
  {
    pain: 'Não sei quantos leads entraram nem onde estão travados.',
    solution: 'LeadFlow com funil visual em tempo real e relatórios automáticos de conversão por etapa.',
  },
  {
    pain: 'Minha equipe faz tarefas cada um do seu jeito e com retrabalho.',
    solution: 'OpsFlow com checklists operacionais padronizados e registro de quem fez e em qual horário.',
  },
  {
    pain: 'Dependo de planilhas confusas e memória para tomar decisões de negócio.',
    solution: 'Dados estruturados com painel diário de indicadores e resumos executivos enviados semanalmente.',
  },
  {
    pain: 'O suporte de tecnologia some logo após fechar o contrato.',
    solution: 'Acompanhamento contínuo da IDSR com SLA garantido, WhatsApp exclusivo e auditoria de estabilidade.',
  },
];

export function PainPointsSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <GlassSection className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection variant="fade-up" className="text-center mb-10">
          <div className="inline-block px-3.5 py-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-full mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#0D7C66] font-medium">
              Diagnóstico de Gargalos
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extralight text-[#E7ECEF]">
            Entendemos onde a operação costuma sangrar
          </h2>
        </AnimatedSection>

        <AnimatedSection variant="scale" delay={200}>
          <PainCarousel autoPlayInterval={5000} items={PAIN_POINTS} />
        </AnimatedSection>

        {/* CTA Interativo */}
        <AnimatedSection variant="fade-up" delay={400} className="text-center mt-12">
          <p className="text-sm text-[#E7ECEF]/40 mb-4">Sua dor específica não está na lista?</p>
          <button
            onClick={scrollToTop}
            className="px-6 py-3 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20 cursor-pointer hover:shadow-xl hover:shadow-[#0D7C66]/30 hover:-translate-y-0.5"
          >
            Conte seu cenário no chat de diagnóstico
          </button>
        </AnimatedSection>
      </div>
    </GlassSection>
  );
}
