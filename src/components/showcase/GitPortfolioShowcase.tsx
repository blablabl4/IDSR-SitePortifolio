'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  Terminal,
  Cpu,
  ShieldCheck,
  ExternalLink,
  Layers,
  Sparkles,
  X,
  Play,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Code2,
  FolderGit2,
} from 'lucide-react';
import { GIT_PORTFOLIO_PROJECTS, GitProject } from '@/lib/git-portfolio-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

type FilterCategory = 'all' | 'automation' | 'backend' | 'fullstack';
type ModalTab = 'architecture' | 'terminal' | 'impact' | 'security';

export function GitPortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<GitProject | null>(null);
  const [modalTab, setModalTab] = useState<ModalTab>('terminal');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStepIndex, setSimulationStepIndex] = useState(0);

  const filteredProjects = GIT_PORTFOLIO_PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleOpenProject = (project: GitProject) => {
    setSelectedProject(project);
    setModalTab('terminal');
    triggerSimulation(project);
  };

  const triggerSimulation = (project: GitProject) => {
    setIsSimulating(true);
    setSimulationStepIndex(0);

    project.terminalSimulation.steps.forEach((_, idx) => {
      setTimeout(() => {
        setSimulationStepIndex(idx + 1);
        if (idx === project.terminalSimulation.steps.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <section id="portfolio-git" className="relative w-full py-28 bg-[#0a0a0a] border-t border-[#2a2a2a]/40 overflow-hidden">
      {/* Luzes de ambientação sutis de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#0D7C66]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-[#B8956A]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header da Seção */}
        <AnimatedSection variant="fade-up" className="text-center mb-16">
          <div className="inline-block px-3.5 py-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-full mb-3 shadow-inner">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8956A] font-medium flex items-center gap-1.5 justify-center">
              <FolderGit2 className="w-3 h-3 text-[#B8956A]" />
              Engenharia Real & Repositórios de Produção
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extralight text-[#E7ECEF] mb-4 tracking-tight">
            Portfólio Técnico Interativo
          </h2>
          <p className="text-sm text-[#E7ECEF]/50 max-w-2xl mx-auto leading-relaxed font-light">
            Arquitetura, pipelines de automação, suítes de testes e microsserviços do ecossistema IDSR e projetos de produção. Clique em qualquer projeto para inspecionar a arquitetura e simular a execução ao vivo.
          </p>
        </AnimatedSection>

        {/* Filtros por Categoria com layout animations */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Todos os Projetos' },
            { id: 'automation', label: 'Automação & Processamento' },
            { id: 'backend', label: 'Backend & APIs' },
            { id: 'fullstack', label: 'Full Stack & Web' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as FilterCategory)}
                className={cn(
                  'relative px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer border',
                  isActive
                    ? 'text-white border-[#0D7C66]'
                    : 'text-[#E7ECEF]/50 border-[#2a2a2a] hover:text-[#E7ECEF] bg-[#111111]/60'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-[#0D7C66] rounded-xl -z-10 shadow-lg shadow-[#0D7C66]/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid de Cards com morphing layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                layoutId={`project-card-${project.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                onClick={() => handleOpenProject(project)}
                className="group relative bg-[#111111] border border-[#2a2a2a] hover:border-[#0D7C66]/60 rounded-2xl p-6 cursor-pointer flex flex-col justify-between transition-colors shadow-xl shadow-black/60 overflow-hidden"
              >
                {/* Linha de acento no topo com glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0D7C66]/0 to-transparent group-hover:via-[#0D7C66] transition-all duration-500" />

                <div>
                  {/* Top Bar: Badge & Visibilidade */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[#0f0f0f] border border-[#2a2a2a] text-[#B8956A]">
                      {project.badge}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[#E7ECEF]/40">
                      {project.isPrivateRepo ? (
                        <span className="flex items-center gap-1 text-amber-500/80">
                          <Lock className="w-3 h-3" /> Privado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-400/80">
                          <GitBranch className="w-3 h-3" /> Open Source
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Nome e Tagline */}
                  <h3 className="text-lg font-light text-[#E7ECEF] group-hover:text-white transition-colors mb-1">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#0D7C66] font-medium mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-[#E7ECEF]/60 leading-relaxed line-clamp-3 mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Métricas Compactas */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl mb-4 text-[11px]">
                    <div>
                      <div className="text-[#E7ECEF]/40 text-[9px] uppercase tracking-wider">{project.metrics[0].label}</div>
                      <div className="font-mono text-[#E7ECEF] font-medium">{project.metrics[0].value}</div>
                    </div>
                    <div>
                      <div className="text-[#E7ECEF]/40 text-[9px] uppercase tracking-wider">{project.metrics[1].label}</div>
                      <div className="font-mono text-[#B8956A] font-medium">{project.metrics[1].value}</div>
                    </div>
                  </div>

                  {/* Tags de Linguagens & Ação */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]/60">
                    <div className="flex flex-wrap gap-1.5">
                      {project.languages.slice(0, 2).map((lang, lIdx) => (
                        <span key={lIdx} className="text-[10px] font-mono text-[#E7ECEF]/50 bg-[#161616] px-2 py-0.5 rounded">
                          {lang}
                        </span>
                      ))}
                      {project.languages.length > 2 && (
                        <span className="text-[10px] font-mono text-[#E7ECEF]/30 bg-[#161616] px-1.5 py-0.5 rounded">
                          +{project.languages.length - 2}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#0D7C66] group-hover:text-[#E7ECEF] transition-colors flex items-center gap-1 font-medium">
                      Inspecionar
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* MODAL EXPANDIDO DE ENGENHARIA (Morphing Real) */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-xl"
              />

              {/* Card Expandido */}
              <motion.div
                layoutId={`project-card-${selectedProject.id}`}
                transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-[#111111] border border-[#0D7C66]/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black z-10 flex flex-col overflow-hidden text-[#E7ECEF]"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 border-b border-[#2a2a2a] pb-6 shrink-0">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase bg-[#0B3B2E]/40 border border-[#0B3B2E] text-[#0D7C66] px-2.5 py-0.5 rounded-full font-medium">
                        {selectedProject.badge}
                      </span>
                      <span className="text-xs text-[#E7ECEF]/40 font-mono">
                        {selectedProject.primaryLanguage}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light text-[#E7ECEF] tracking-tight">
                      {selectedProject.name}
                    </h2>
                    <p className="text-xs text-[#B8956A] mt-0.5">
                      {selectedProject.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedProject.repoUrl && (
                      <a
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a] text-[#E7ECEF]/60 hover:text-white hover:border-[#0D7C66]/60 transition-colors cursor-pointer"
                        title="Abrir repositório no GitHub"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2.5 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a] text-[#E7ECEF]/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      title="Fechar visualizador"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Abas de Navegação Interna */}
                <div className="flex items-center gap-2 pt-4 pb-4 border-b border-[#2a2a2a]/60 shrink-0 overflow-x-auto">
                  {[
                    { id: 'terminal', label: 'Terminal / Simulação Ao Vivo', icon: Terminal },
                    { id: 'architecture', label: 'Arquitetura & Pipeline', icon: Layers },
                    { id: 'impact', label: 'Impacto Operacional', icon: TrendingUp },
                    { id: 'security', label: 'Auditoria & Segurança', icon: ShieldCheck },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isTabActive = modalTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setModalTab(tab.id as ModalTab)}
                        className={cn(
                          'px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer',
                          isTabActive
                            ? 'bg-[#0D7C66] text-white shadow-lg shadow-[#0D7C66]/20'
                            : 'text-[#E7ECEF]/50 hover:text-[#E7ECEF] bg-[#0a0a0a] border border-[#2a2a2a]'
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Conteúdo Dinâmico do Modal (com scroll suave) */}
                <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-1">
                  {/* 1. ABA TERMINAL / LIVE SIMULATION */}
                  {modalTab === 'terminal' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-[#E7ECEF]/60">
                          Ambiente de execução emulada com comandos e logs reais do projeto:
                        </div>
                        <button
                          onClick={() => triggerSimulation(selectedProject)}
                          disabled={isSimulating}
                          className="px-3 py-1.5 bg-[#0B3B2E] border border-[#0D7C66] hover:bg-[#0D7C66] disabled:opacity-50 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-[#E7ECEF]"
                        >
                          <Play className="w-3 h-3 text-[#B8956A]" />
                          {isSimulating ? 'Executando...' : 'Re-executar Pipeline'}
                        </button>
                      </div>

                      {/* Mockup do Terminal Linux/Windows com estilo Dark Luxury */}
                      <div className="bg-[#080808] border border-[#2a2a2a] rounded-2xl p-5 font-mono text-xs shadow-2xl overflow-hidden">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#1f1f1f] text-[#E7ECEF]/30 text-[10px] mb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                            <span className="ml-2">idsr@runtime: ~/{selectedProject.slug}</span>
                          </div>
                          <span>zsh / bash</span>
                        </div>

                        {/* Linha de comando */}
                        <div className="flex items-center gap-2 text-emerald-400 mb-3">
                          <span className="text-[#B8956A]">$</span>
                          <span>{selectedProject.terminalSimulation.command}</span>
                        </div>

                        {/* Steps executados */}
                        <div className="space-y-2">
                          {selectedProject.terminalSimulation.steps
                            .slice(0, simulationStepIndex)
                            .map((step, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={cn(
                                  'leading-relaxed',
                                  step.type === 'success' && 'text-emerald-400 font-medium',
                                  step.type === 'cmd' && 'text-[#E7ECEF]/90',
                                  step.type === 'info' && 'text-[#E7ECEF]/50',
                                  step.type === 'metric' && 'text-[#B8956A]'
                                )}
                              >
                                {step.text}
                              </motion.div>
                            ))}
                          {isSimulating && (
                            <div className="flex items-center gap-1.5 text-xs text-[#0D7C66] pt-1">
                              <span className="w-2 h-2 rounded-full bg-[#0D7C66] animate-ping" />
                              Processando step {simulationStepIndex + 1}...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Métricas do Projeto */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        {selectedProject.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="p-4 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl">
                            <div className="text-[10px] uppercase tracking-wider text-[#E7ECEF]/40 mb-1">{m.label}</div>
                            <div className="text-xl font-light text-[#E7ECEF] font-mono">{m.value}</div>
                            <div className="text-[10px] text-[#0D7C66] mt-1 font-medium">{m.trend}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* 2. ABA ARQUITETURA */}
                  {modalTab === 'architecture' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#B8956A] font-medium mb-1">
                          Pipeline de Entrega & Componentes Técnicos
                        </h4>
                        <p className="text-xs text-[#E7ECEF]/60">
                          {selectedProject.architecture.pipelineSummary}
                        </p>
                      </div>

                      {/* Grid de Nós de Arquitetura */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedProject.architecture.nodes.map((node, nIdx) => (
                          <div
                            key={nIdx}
                            className="p-4 bg-[#0a0a0a] border border-[#2a2a2a] hover:border-[#0D7C66]/50 rounded-2xl transition-all"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-light text-[#E7ECEF]">{node.name}</span>
                              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-[#161616] text-[#B8956A]">
                                {node.type}
                              </span>
                            </div>
                            <p className="text-xs text-[#E7ECEF]/50 leading-relaxed">
                              {node.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl">
                        <div className="text-xs text-[#E7ECEF]/40 uppercase tracking-wider mb-2">Tecnologias Utilizadas</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.languages.map((l, lIdx) => (
                            <span key={lIdx} className="text-xs font-mono px-3 py-1 bg-[#161616] border border-[#2a2a2a] rounded-lg text-[#E7ECEF]">
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 3. ABA IMPACTO OPERACIONAL */}
                  {modalTab === 'impact' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 bg-red-950/10 border border-red-900/30 rounded-2xl">
                          <div className="text-xs uppercase tracking-wider text-red-400 font-medium mb-2">
                            Antes da Automação (Gargalo)
                          </div>
                          <p className="text-xs text-[#E7ECEF]/70 leading-relaxed">
                            {selectedProject.businessImpact.before}
                          </p>
                        </div>

                        <div className="p-5 bg-emerald-950/15 border border-emerald-800/40 rounded-2xl">
                          <div className="text-xs uppercase tracking-wider text-emerald-400 font-medium mb-2">
                            Depois da Automação (Solução IDSR)
                          </div>
                          <p className="text-xs text-[#E7ECEF]/80 leading-relaxed">
                            {selectedProject.businessImpact.after}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-[#0a0a0a] border border-[#B8956A]/40 rounded-2xl">
                        <div className="text-xs text-[#B8956A] uppercase tracking-wider font-medium mb-1">
                          Destaque Operacional
                        </div>
                        <p className="text-xs text-[#E7ECEF]/80 leading-relaxed">
                          {selectedProject.businessImpact.highlight}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* 4. ABA AUDITORIA & SEGURANÇA */}
                  {modalTab === 'security' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          Sanitização de Dados Auditada
                        </div>
                        <p className="text-xs text-[#E7ECEF]/60 leading-relaxed">
                          Este repositório foi higienizado. Nenhuma chave de API, credencial de banco de dados, token de webhook ou dado sensível de cliente (PII) é exposto neste portfólio.
                        </p>
                      </div>

                      <div className="p-4 bg-[#161616] border border-[#2a2a2a] rounded-xl text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[#E7ECEF]/40">Status de Higienização:</span>
                          <span className="font-mono text-emerald-400">100% Sanitized</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#E7ECEF]/40">Vazamento de Credenciais:</span>
                          <span className="font-mono text-emerald-400">ZERO Detected</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#E7ECEF]/40">Conformidade:</span>
                          <span className="font-mono text-[#B8956A]">{selectedProject.securityAudit.compliance}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-[#2a2a2a] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                  <div className="text-[11px] text-[#E7ECEF]/40">
                    Quer implantar uma arquitetura semelhante na sua empresa?
                  </div>
                  <Link
                    href="/contato"
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#0D7C66] hover:bg-[#0F5A47] text-white rounded-xl text-xs font-medium transition-all shadow-lg shadow-[#0D7C66]/20 flex items-center justify-center gap-2"
                  >
                    Solicitar Proposta para este Módulo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
