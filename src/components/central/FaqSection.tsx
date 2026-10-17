'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { DustText } from '@/components/ui/DustText';
import { getWhatsAppUrl } from '@/lib/contact-config';
import { OFFER_FAQ_INTRO, OFFER_PRICING_FAQ, OFFER_GUARANTEES } from '@/lib/offer';
import { SCENE_SECTIONS, sectionIndexOf } from '@/lib/scene-sections';
import { SceneSection } from './SceneSection';
import { MessageSquare, X, ChevronLeft, ChevronRight } from 'lucide-react';

const SECTION_INDEX = sectionIndexOf('faq');
const ACCENT = SCENE_SECTIONS[SECTION_INDEX].accent;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * FAQ: uma tela. Título fixo no topo; à esquerda o índice (lista de perguntas +
 * garantias); clicar numa pergunta abre à direita o modal com a resposta (no
 * celular, o modal sobe por cima do índice). Todas as respostas saem no HTML do
 * servidor (as fechadas com `hidden`); a aberta roda como um comando de terminal
 * (TerminalAnswer) e digita a resposta letra por letra.
 */
export function FaqSection() {
  const { currentSection, status } = useTransition();
  const revealed = currentSection === SECTION_INDEX && status === 'IDLE_NA_SECAO';
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Conta aberturas: cada abertura (mesmo da mesma pergunta) roda o "comando" de novo.
  const [openSeq, setOpenSeq] = useState(0);
  const openQuestion = (i: number) => {
    setOpenIndex(i);
    setOpenSeq((n) => n + 1);
  };

  // Esc fecha o modal de resposta.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex]);

  const total = OFFER_PRICING_FAQ.length;

  return (
    <SceneSection>
      {/* Topo fixo: badge + título + chamada */}
      <div className="max-w-4xl lg:max-w-5xl">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase w-fit backdrop-blur-md mb-2"
          style={{ borderColor: `${ACCENT}59`, backgroundColor: `${ACCENT}1a`, color: ACCENT }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
          <span>PERGUNTAS FREQUENTES</span>
        </div>

        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-white tracking-[-0.03em] leading-[1.12] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <DustText text={OFFER_FAQ_INTRO.title} accentColor={ACCENT} glowColor={ACCENT} delay={80} stagger={12} active={revealed} />
        </h2>

        <p className="mt-1.5 text-[11px] leading-snug sm:text-sm sm:leading-relaxed text-zinc-300 font-sans max-w-3xl">
          <DustText
            text={OFFER_FAQ_INTRO.description}
            mode="words"
            accentColor={ACCENT}
            delay={260}
            stagger={14}
            active={revealed}
          />
        </p>
      </div>

      <div className="relative mt-3 sm:mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
        {/* Esquerda: índice (modal fixo) */}
        <div className="lg:col-span-5">
          <div className="relative h-full rounded-2xl border border-white/[0.12] bg-[#08090e]/95 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_24px_64px_rgba(0,0,0,0.9)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent flex flex-col">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 sm:pb-3 mb-2 sm:mb-3">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                ÍNDICE // DÚVIDAS FREQUENTES
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-semibold tabular-nums" style={{ color: ACCENT }}>
                {openIndex === null ? `—/${total}` : `${openIndex + 1}/${total}`}
              </span>
            </div>

            <ul className="flex flex-col gap-0.5">
              {OFFER_PRICING_FAQ.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <li key={item.question}>
                    <button
                      type="button"
                      onClick={() => (isOpen ? setOpenIndex(null) : openQuestion(i))}
                      aria-expanded={isOpen}
                      aria-controls={`faq-resposta-${i + 1}`}
                      className="group relative w-full flex items-start gap-2.5 pl-3 pr-2.5 py-1.5 sm:py-2 rounded-lg font-mono text-[11px] sm:text-xs leading-snug text-left cursor-pointer transition-all duration-200 hover:bg-white/[0.05] hover:translate-x-0.5 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      style={{
                        color: isOpen ? '#fff' : 'rgb(161 161 170)',
                        backgroundColor: isOpen ? `${ACCENT}14` : undefined,
                      }}
                    >
                      {/* Friso de seleção: cresce do centro quando a pergunta abre */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full transition-transform duration-300 origin-center"
                        style={{ backgroundColor: ACCENT, transform: isOpen ? 'scaleY(1)' : 'scaleY(0)' }}
                      />
                      <span className="shrink-0 tabular-nums transition-colors duration-200" style={{ color: isOpen ? ACCENT : undefined }}>
                        <span
                          aria-hidden="true"
                          className={`inline-block transition-all duration-200 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'}`}
                        >
                          {'>'}
                        </span>{' '}
                        {pad(i + 1)}
                      </span>
                      <span className="transition-colors duration-200 group-hover:text-white">{item.question}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto pt-3 border-t border-white/[0.08] mt-3">
              <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2">GARANTIDO EM TODOS OS PLANOS</div>
              <div className="grid grid-cols-3 gap-2">
                {OFFER_GUARANTEES.map((g) => (
                  <div
                    key={g.title}
                    className="p-2 sm:p-2.5 rounded-xl border border-white/[0.08] bg-black/50 text-center flex flex-col justify-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--faq-accent)]"
                    style={{ '--faq-accent': `${ACCENT}73` } as React.CSSProperties}
                  >
                    <span className="text-[10px] sm:text-xs font-mono font-black tracking-tight uppercase" style={{ color: ACCENT }}>
                      {g.title}
                    </span>
                    <span className="hidden sm:block text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                      {g.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Direita: modal da resposta. No celular cobre o índice enquanto aberto. */}
        <div
          className={`lg:col-span-7 ${
            openIndex === null ? 'hidden lg:block' : 'absolute inset-0 z-20 lg:static lg:z-auto'
          }`}
        >
          {/* Estado vazio: prompt de terminal esperando uma escolha */}
          <div
            hidden={openIndex !== null}
            className="h-full min-h-[18rem] rounded-2xl border border-dashed border-white/[0.14] bg-[#08090e]/70 backdrop-blur-xl p-6 flex-col items-start justify-center font-mono lg:flex"
          >
            <span className="text-[10px] tracking-widest uppercase text-zinc-500 mb-2">RESPOSTA // AGUARDANDO</span>
            <span className="text-sm text-zinc-300">
              <span style={{ color: ACCENT }}>&gt;</span> selecione uma pergunta no índice
              <span className="terminal-cursor ml-0.5" style={{ color: ACCENT }}>
                _
              </span>
            </span>
          </div>

          {OFFER_PRICING_FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                id={`faq-resposta-${i + 1}`}
                role="region"
                aria-labelledby={`faq-pergunta-${i + 1}`}
                hidden={!isOpen}
                className="scene-panel-in relative h-full overflow-y-auto [scrollbar-width:none] rounded-2xl border bg-[#08090e]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
                style={{ borderColor: `${ACCENT}59`, boxShadow: `0 24px 64px rgba(0,0,0,0.9), 0 0 40px -18px ${ACCENT}` }}
              >
                <div className="flex h-full flex-col">
                  {/* Cabeçalho: posição + navegação + fechar (fora do alcance do HUD, que fica no canto inferior) */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-3 mb-3.5">
                    <span className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase tabular-nums" style={{ color: ACCENT }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
                      RESPOSTA // {pad(i + 1)}
                      <span className="text-zinc-500 font-semibold">DE {pad(total)}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <IconButton label="Pergunta anterior" onClick={() => openQuestion((i - 1 + total) % total)} hover="hover:-translate-x-0.5">
                        <ChevronLeft className="w-4 h-4" />
                      </IconButton>
                      <IconButton label="Próxima pergunta" onClick={() => openQuestion((i + 1) % total)} hover="hover:translate-x-0.5">
                        <ChevronRight className="w-4 h-4" />
                      </IconButton>
                      <IconButton label="Fechar resposta" onClick={() => setOpenIndex(null)} hover="hover:rotate-90">
                        <X className="w-4 h-4" />
                      </IconButton>
                    </div>
                  </div>

                  {isOpen ? (
                    // Remonta a cada abertura (openSeq): o "comando" roda de novo do zero.
                    <TerminalAnswer key={`${i}-${openSeq}`} index={i} question={item.question} answer={item.answer} />
                  ) : (
                    // Fechada: texto puro, pra sair inteiro no HTML do servidor.
                    <>
                      <h3 id={`faq-pergunta-${i + 1}`}>{item.question}</h3>
                      <p>{item.answer}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneSection>
  );
}

function IconButton({
  label,
  onClick,
  hover,
  children,
}: {
  label: string;
  onClick: () => void;
  /** Micro-movimento no hover (ex.: seta desliza, X gira). */
  hover: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 active:scale-90 cursor-pointer ${hover}`}
    >
      {children}
    </button>
  );
}

// Ritmo do "comando" (ms). Resposta de ~250 caracteres termina em ~3s.
const CMD_MS_PER_CHAR = 26;
const AFTER_CMD_MS = 200;
const AFTER_OK_MS = 240;
const AFTER_QUESTION_MS = 260;
const ANSWER_MS_PER_CHAR = 12;

/**
 * Resposta aberta como se fosse a saída de um comando: digita o comando, imprime
 * o [ok], mostra a pergunta e digita a resposta letra por letra com cursor de bloco.
 * A parte ainda não digitada fica no DOM transparente — o painel não muda de altura
 * e leitor de tela/crawler leem o texto inteiro. Clique pula direto pro fim;
 * prefers-reduced-motion já nasce completo.
 */
function TerminalAnswer({ index, question, answer }: { index: number; question: string; answer: string }) {
  const command = `faq --abrir ${pad(index + 1)}`;
  const tCmdEnd = command.length * CMD_MS_PER_CHAR;
  const tOk = tCmdEnd + AFTER_CMD_MS;
  const tQuestion = tOk + AFTER_OK_MS;
  const tAnswer = tQuestion + AFTER_QUESTION_MS;
  const tEnd = tAnswer + answer.length * ANSWER_MS_PER_CHAR;

  const [elapsed, setElapsed] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? Infinity : 0
  );
  const done = elapsed >= tEnd;

  const startRef = useRef<number | null>(null);
  useEffect(() => {
    if (done) return;
    let raf = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const t = now - startRef.current;
      setElapsed(t);
      if (t < tEnd) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done, tEnd]);

  const cmdChars = Math.min(command.length, Math.floor(elapsed / CMD_MS_PER_CHAR));
  const answerChars = Math.max(0, Math.min(answer.length, Math.floor((elapsed - tAnswer) / ANSWER_MS_PER_CHAR)));
  const typingCommand = elapsed < tCmdEnd;
  const typingAnswer = elapsed >= tAnswer && !done;

  const cursor = (
    <span aria-hidden="true" className="terminal-cursor inline-block w-[0.55em] h-[1.05em] -mb-[0.15em] ml-px" style={{ backgroundColor: ACCENT }} />
  );

  return (
    <div
      className="flex flex-1 flex-col cursor-default"
      onClick={() => {
        if (!done) setElapsed(Infinity);
      }}
    >
      {/* Linha de comando + saída */}
      <div className="font-mono text-[11px] sm:text-xs leading-relaxed" aria-hidden="true">
        <div className="text-zinc-300">
          <span style={{ color: ACCENT }}>rocha@idsr</span>
          <span className="text-zinc-500">:~$ </span>
          {command.slice(0, cmdChars)}
          {typingCommand && cursor}
        </div>
        <div className="text-zinc-500 transition-opacity duration-150" style={{ opacity: elapsed >= tOk ? 1 : 0 }}>
          <span className="text-emerald-400">[ok]</span> base de conhecimento consultada · resposta {pad(index + 1)}
        </div>
      </div>

      <h3
        id={`faq-pergunta-${index + 1}`}
        className="mt-3 text-base sm:text-xl lg:text-2xl font-black text-white tracking-[-0.02em] leading-[1.15] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
        style={{
          fontFamily: 'var(--font-display)',
          opacity: elapsed >= tQuestion ? 1 : 0,
          transform: elapsed >= tQuestion ? 'translateY(0)' : 'translateY(8px)',
          filter: elapsed >= tQuestion ? 'blur(0)' : 'blur(4px)',
          transition: 'opacity 380ms cubic-bezier(0.16, 1, 0.3, 1), transform 380ms cubic-bezier(0.16, 1, 0.3, 1), filter 380ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {question}
      </h3>

      <p
        className="mt-3 font-mono text-[12px] sm:text-[13px] text-zinc-200 leading-relaxed pl-3.5 border-l-2"
        style={{
          borderColor: `${ACCENT}70`,
          // O bloco (friso + prompt) só aparece quando a resposta começa a ser digitada;
          // o texto continua no DOM desde o início (altura estável, leitura completa).
          opacity: elapsed >= tAnswer - 120 ? 1 : 0,
          transition: 'opacity 200ms ease-out',
        }}
      >
        <span style={{ color: ACCENT }} aria-hidden="true">&gt; </span>
        {answer.slice(0, answerChars)}
        {(typingAnswer || done) && cursor}
        <span className="text-transparent">{answer.slice(answerChars)}</span>
      </p>

      <div
        className="mt-5"
        style={{
          opacity: done ? 1 : 0,
          transform: done ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: done ? 'auto' : 'none',
        }}
      >
        <a
          href={getWhatsAppUrl({
            origem: 'precos',
            customMessage: `Olá Rocha! Vi no FAQ da IDSR a pergunta "${question}" e quero entender como fica no meu caso.`,
          })}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="whatsapp"
          tabIndex={done ? 0 : -1}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-black font-extrabold text-[11px] sm:text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer hover:brightness-110 hover:gap-2.5 active:scale-95"
          style={{ backgroundColor: ACCENT, boxShadow: `0 0 20px ${ACCENT}4d` }}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Tirar essa dúvida no WhatsApp</span>
        </a>
      </div>

      {!done && (
        <span className="mt-auto pt-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest" aria-hidden="true">
          clique para pular
        </span>
      )}
    </div>
  );
}
