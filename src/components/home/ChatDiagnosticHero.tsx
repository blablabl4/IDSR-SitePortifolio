'use client';

import React from 'react';
import { DotContainer } from '@/components/ui/DotContainer';
import { TypewriterPlaceholder } from '@/components/ui/TypewriterPlaceholder';
import { ChatConsentBanner } from '@/components/ui/ChatConsentBanner';
import { ArrowRight, Sparkles, MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useChatDiagnostic } from '@/hooks/useChatDiagnostic';

export function ChatDiagnosticHero() {
  const {
    isExpanded,
    inputValue,
    setInputValue,
    messages,
    isTyping,
    hasConsent,
    showConsentBanner,
    chatEndRef,
    chatContainerRef,
    modalRef,
    handleConsentAccept,
    handleConsentDecline,
    handleClose,
    handleInputSubmit,
  } = useChatDiagnostic();

  return (
    <DotContainer className="w-full pt-32 pb-20 relative overflow-hidden">
      {/* Ambient aura glow - pulsação premium */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0D7C66]/8 blur-[140px] rounded-full aura-glow pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[200px] bg-[#B8956A]/5 blur-[120px] rounded-full aura-glow pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center px-6 relative z-10">
        <motion.div
          animate={{
            opacity: isExpanded ? 0 : 1,
            y: isExpanded ? -30 : 0,
            scale: isExpanded ? 0.95 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={cn('w-full text-center mb-8', isExpanded && 'pointer-events-none')}
        >
          {/* Tagline */}
          <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
              Automação + Dados com Rastreabilidade
            </p>
          </div>
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-extralight tracking-tight text-[#E7ECEF] leading-tight mt-4 mb-6">
            Operação que funciona enquanto você dorme.
          </h1>
          {/* Subtitle */}
          <p className="text-base text-[#E7ECEF]/50 max-w-2xl mx-auto font-light leading-relaxed">
            Automação de atendimento, vendas, agendamento e rotina operacional para varejo, restaurantes e serviços.
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          ref={modalRef}
          layout
          animate={{
            height: isExpanded ? '60vh' : 56,
            width: isExpanded ? '100%' : '100%',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 1 }}
          className={cn(
            'relative bg-[#0f0f0f]/95 backdrop-blur-xl border border-[#E7ECEF]/10 overflow-hidden',
            'shadow-2xl shadow-black/50',
            isExpanded ? 'rounded-2xl' : 'rounded-xl max-w-2xl',
            'flex flex-col'
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
                  <span className="text-sm font-light text-[#E7ECEF]">Diagnóstico Operacional IDSR</span>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Fechar diagnóstico"
                  className="p-2 hover:bg-[#E7ECEF]/5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-[#E7ECEF]/30 hover:text-[#E7ECEF]" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {isExpanded && (
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
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
                    className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] p-4 rounded-xl text-sm shadow-lg leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-[#0D7C66]/25 border border-[#0D7C66]/50 text-[#E7ECEF]'
                          : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#E7ECEF]'
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5 p-4 items-center">
                  <span className="w-2 h-2 bg-[#0D7C66] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#0D7C66] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#0D7C66] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          <form
            onSubmit={handleInputSubmit}
            className={cn(
              'flex gap-2 px-4 shrink-0',
              isExpanded
                ? 'items-end min-h-16 py-3 border-t border-[#E7ECEF]/5 bg-[#0a0a0a]'
                : 'items-center h-full'
            )}
          >
            {!isExpanded && <MessageSquare className="w-5 h-5 text-[#E7ECEF]/20" />}
            <div className="flex-1 relative flex items-center">
              <textarea
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleInputSubmit();
                  }
                }}
                placeholder={isExpanded ? 'Digite sua resposta... (Shift+Enter para quebrar linha)' : ''}
                rows={1}
                className="w-full bg-transparent border-none outline-none text-[#E7ECEF] text-base font-light placeholder:text-[#E7ECEF]/30 resize-none overflow-hidden"
                style={{ maxHeight: '120px' }}
              />
              {!isExpanded && !inputValue && (
                <div className="absolute inset-0 flex items-center justify-start pl-0 pointer-events-none">
                  <TypewriterPlaceholder
                    phrases={[
                      'Descreva seu desafio operacional...',
                      'Minha equipe está perdendo leads...',
                      'Preciso automatizar agendamentos...',
                      'Como reduzir no-shows de clientes?',
                      'Quero rastreabilidade nas tarefas...',
                    ]}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              aria-label={isExpanded ? 'Enviar mensagem' : 'Iniciar conversa'}
              className={cn(
                'rounded-lg flex items-center justify-center transition-colors shrink-0 mb-0.5 cursor-pointer',
                isExpanded
                  ? 'w-10 h-10 bg-[#0B3B2E] hover:bg-[#0B3B2E]/80 shadow-lg shadow-[#0B3B2E]/20 text-[#E7ECEF]'
                  : 'w-10 h-10 hover:bg-[#E7ECEF]/5 text-[#E7ECEF]/40 hover:text-[#E7ECEF]'
              )}
            >
              {isExpanded ? <Send className="w-4 h-4" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </motion.div>
      </div>
    </DotContainer>
  );
}
