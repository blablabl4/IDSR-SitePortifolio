'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { GlassSection } from '@/components/ui/GlassSection';
import { MiniLogoCarousel } from '@/components/ui/MiniLogoCarousel';
import { ShieldCheck, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

function AnimatedMetric({
  end,
  prefix,
  suffix,
  label,
  description,
  icon: Icon,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const counter = useCountUp({ end, prefix, suffix, duration: 2200 });

  useEffect(() => {
    if (isInView) counter.start();
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref} className="p-6 bg-[#0f0f0f]/60 border border-[#2a2a2a] rounded-xl flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-[#0B3B2E]/20 border border-[#0B3B2E]/30 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#0D7C66]" />
      </div>
      <div>
        <div className="text-2xl font-light text-[#E7ECEF] mb-1 font-mono tabular-nums">
          {counter.hasStarted ? counter.formattedValue : `${prefix ?? ''}0${suffix ?? ''}`}
        </div>
        <div className="text-xs font-medium text-[#B8956A] uppercase tracking-wider mb-1">{label}</div>
        <p className="text-xs text-[#E7ECEF]/40 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ClientsTrustSection() {
  return (
    <GlassSection className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* About IDSR */}
          <AnimatedSection variant="fade-left">
            <div className="inline-block px-3.5 py-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-full mb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#0D7C66] font-medium">
                Infraestrutura & Método
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extralight text-[#E7ECEF] mb-6 leading-tight">
              Automação com método, dados com contexto.
            </h2>
            <p className="text-sm text-[#E7ECEF]/50 leading-relaxed mb-4">
              Nascemos para resolver o problema crônico que afeta pequenas e médias empresas brasileiras: negócios perdendo tempo, dinheiro e clientes por falta de rastreabilidade e processos estruturados.
            </p>
            <p className="text-sm text-[#E7ECEF]/50 leading-relaxed mb-6">
              Entregamos arquitetura que roda sem atrito — cada fluxo configurado produz dados, cada dado vira inteligência de decisão. Sem travas de fornecedor, sem promessas irrealistas.
            </p>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-1.5 text-xs text-[#0D7C66] hover:text-[#0F5A47] transition-colors"
            >
              Conheça nossa história e manifesto
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </AnimatedSection>

          {/* Trust Carousel & Social Proof */}
          <AnimatedSection variant="fade-right" delay={200}>
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 text-center md:text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] mb-6 font-medium">
                Empresas que confiam na IDSR
              </p>
              <MiniLogoCarousel
                logos={[
                  { src: '/clients/zapao.png', alt: 'Zapão' },
                  { src: '/clients/casa-rael.png', alt: 'Casa Rael' },
                ]}
                autoPlayInterval={4000}
              />
              <p className="text-xs text-[#E7ECEF]/40 mt-6 text-center">
                Operações ativas em produção com automação de atendimento, rotinas e rastreabilidade diária.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Métricas Animadas */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#2a2a2a]/50" staggerDelay={0.15}>
          <StaggerItem>
            <AnimatedMetric
              end={15}
              prefix="< "
              suffix=" seg"
              label="Tempo de Resposta"
              sublabel="Atendimento instantâneo"
              description="Leads atendidos e triados instantaneamente 24 horas por dia."
              icon={Zap}
            />
          </StaggerItem>
          <StaggerItem>
            <AnimatedMetric
              end={65}
              prefix="-"
              suffix="%"
              label="No-Shows em Agendas"
              sublabel="Redução comprovada"
              description="Redução comprovada de faltas através de réguas ativas multicanal."
              icon={TrendingUp}
            />
          </StaggerItem>
          <StaggerItem>
            <AnimatedMetric
              end={100}
              suffix="%"
              label="Rastreabilidade"
              sublabel="Total"
              description="Histórico de quem fez, quando e qual foi o resultado de cada etapa."
              icon={ShieldCheck}
            />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </GlassSection>
  );
}
