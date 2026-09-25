'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

export function useChatDiagnostic() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Inicializa consentimento salvo no localStorage
  useEffect(() => {
    try {
      const consent = localStorage.getItem('idsr_chat_consent');
      if (consent === 'true') {
        setHasConsent(true);
        setShowConsentBanner(false);
      }
    } catch {
      // Ignora erro se localStorage não estiver disponível
    }
  }, []);

  // Centraliza o modal quando expandido
  useEffect(() => {
    if (isExpanded && modalRef.current && typeof window !== 'undefined') {
      const modalRect = modalRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const modalCenter = modalRect.top + modalRect.height / 2;
      const scrollOffset = modalCenter - viewportCenter;

      window.scrollBy({
        top: scrollOffset,
        behavior: 'smooth',
      });
    }
  }, [isExpanded]);

  // Auto-scroll do chat ao receber mensagens
  useEffect(() => {
    if (chatContainerRef.current && isExpanded) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isExpanded]);

  const handleConsentAccept = useCallback(() => {
    setHasConsent(true);
    setShowConsentBanner(false);
    try {
      localStorage.setItem('idsr_chat_consent', 'true');
    } catch {
      // no-op
    }
  }, []);

  const handleConsentDecline = useCallback(() => {
    setHasConsent(false);
    setShowConsentBanner(false);
    setIsExpanded(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
    setMessages([]);
    setInputValue('');
  }, []);

  const handleInputSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    // Se o usuário ainda não deu consentimento, expande para exibir o banner
    if (!hasConsent) {
      if (!isExpanded) {
        setIsExpanded(true);
        setShowConsentBanner(true);
      }
      return;
    }

    const currentInput = inputValue;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: currentInput };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    if (!isExpanded) {
      setIsExpanded(true);
    }

    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages.map((m) => ({
            role: m.role === 'user' ? 'user' : 'bot',
            content: m.text,
          })),
          userConsent: hasConsent,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do assistente');
      }

      const data = await response.json();
      setIsTyping(false);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: data.response || 'Entendido. Como podemos avançar com sua operação?',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Desculpe, tive uma instabilidade temporária. Por favor, tente novamente ou fale conosco diretamente pelo WhatsApp.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return {
    isExpanded,
    setIsExpanded,
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
  };
}
