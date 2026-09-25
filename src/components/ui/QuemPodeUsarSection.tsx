'use client';

import React, { useState } from 'react';
import {
  NICHOS_DATA,
  NichoItem
} from '@/components/central/QuemPodeUsarModal';
import {
  Layers,
  ArrowRight,
  MessageSquare,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/contact-config';

export function QuemPodeUsarSection() {
  const [activeNichoId, setActiveNichoId] = useState<string>('saude');
  const activeNicho = NICHOS_DATA.find((n) => n.id === activeNichoId) || NICHOS_DATA[0];

  const handleWhatsAppContact = (nicho: NichoItem) => {
    const solucoesStr = nicho.solucoesCombinadas.map((s) => s.name).join(', ');
    const msg = `Olá Rocha! Vi no site da IDSR o modelo para ${nicho.name} e quero entender como combinar (${solucoesStr}) na minha empresa.`;
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  return (
    <section id="quem-pode-usar" className="relative py-20 px-6 md:px-10 border-t border-white/10 bg-black/40">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38e0e0]/30 bg-[#38e0e0]/10 text-[#38e0e0] font-mono text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>QUEM PODE USAR · CASOS REAIS</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Como Mesclar Soluções IDSR para o Seu Nicho
          </h2>

          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
            Nenhuma operação de sucesso sobrevive com ferramentas isoladas. Conectamos atendimento 24/7, agentes de IA, robôs de dados e dashboards para criar uma máquina de escala personalizada para o seu setor.
          </p>
        </div>

        {/* Barra de Seleção de Nichos (Tabs Horizontais Responsivas) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {NICHOS_DATA.map((nicho) => {
            const Icon = nicho.icon;
            const isSelected = nicho.id === activeNichoId;
            return (
              <button
                key={nicho.id}
                type="button"
                onClick={() => setActiveNichoId(nicho.id)}
                className={`p-3 sm:p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-white/30 bg-white/10 shadow-[0_4px_24px_rgba(56,224,224,0.15)] scale-[1.02]'
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 opacity-75 hover:opacity-100'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors"
                  style={{
                    backgroundColor: isSelected ? `${nicho.accentColor}25` : 'rgba(255,255,255,0.05)',
                    borderColor: isSelected ? nicho.accentColor : 'rgba(255,255,255,0.1)',
                    color: isSelected ? nicho.accentColor : 'rgba(255,255,255,0.7)',
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white leading-tight">
                    {nicho.name.split('&')[0].trim()}
                  </span>
                  <span className="block text-[9px] font-mono text-white/40 uppercase tracking-wider mt-0.5">
                    {nicho.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Card Principal do Nicho Ativo */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#13141a] to-[#0a0a0c] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Coluna Esquerda: Informações Estratégicas & Dor */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full font-mono text-xs font-bold tracking-wider uppercase mb-2"
                  style={{
                    backgroundColor: `${activeNicho.accentColor}15`,
                    color: activeNicho.accentColor,
                    border: `1px solid ${activeNicho.accentColor}40`,
                  }}
                >
                  {activeNicho.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {activeNicho.name}
                </h3>
              </div>

              {/* O Problema Crônico */}
              <div className="p-4 rounded-2xl border border-red-500/25 bg-red-950/20 space-y-1.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-400 block">
                  [ ! ] ONDE SUA OPERAÇÃO ESTÁ SANGRANDO RECEITA
                </span>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {activeNicho.dorCronica}
                </p>
              </div>

              {/* Gatilho Comercial */}
              <div
                className="p-4 rounded-2xl border flex items-center gap-3.5"
                style={{
                  backgroundColor: `${activeNicho.accentColor}08`,
                  borderColor: `${activeNicho.accentColor}30`,
                }}
              >
                <Zap className="w-6 h-6 shrink-0" style={{ color: activeNicho.accentColor }} />
                <p className="text-xs sm:text-sm font-semibold text-white/95 italic leading-snug">
                  &ldquo;{activeNicho.gatilhoComercial}&rdquo;
                </p>
              </div>

              {/* Métricas de Impacto */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activeNicho.impactoEsperado.map((imp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-white/10 bg-black/40 text-center"
                  >
                    <span
                      className="font-mono text-xs sm:text-sm font-black block tracking-tight"
                      style={{ color: activeNicho.accentColor }}
                    >
                      {imp.metrica}
                    </span>
                    <span className="text-[10px] text-white/60 font-mono leading-tight block mt-1">
                      {imp.descricao}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna Direita: Soluções Combinadas & Passo a Passo */}
            <div className="lg:col-span-6 space-y-6">
              {/* Stack Combinado */}
              <div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/50 block mb-3">
                  {'// STACK DE SOLUÇÕES RECOMENDADO'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeNicho.solucoesCombinadas.map((sol, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md"
                    >
                      <span
                        className="font-mono text-[9px] font-bold uppercase tracking-wider block mb-1"
                        style={{ color: sol.color }}
                      >
                        SOLUÇÃO 0{idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-white">{sol.name}</h4>
                      <p className="text-[10px] text-white/60 font-mono mt-1">{sol.tag}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fluxo na Prática */}
              <div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/50 block mb-3">
                  {'// COMO AS SOLUÇÕES TRABALHAM JUNTAS'}
                </span>
                <div className="space-y-2.5">
                  {activeNicho.comoFunciona.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02]"
                    >
                      <span
                        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5"
                        style={{
                          backgroundColor: `${activeNicho.accentColor}20`,
                          color: activeNicho.accentColor,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão de Ação WhatsApp */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleWhatsAppContact(activeNicho)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#10b981] to-[#38e0e0] text-black font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Quero Essa Combinação para Minha Empresa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] font-mono text-white/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Sem intermediários · Diagnóstico técnico com engenheiro sênior</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
