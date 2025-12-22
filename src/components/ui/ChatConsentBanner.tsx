'use client';

import React, { useState } from 'react';
import { Shield, X } from 'lucide-react';
import Link from 'next/link';

interface ChatConsentBannerProps {
    onAccept: () => void;
    onDecline: () => void;
}

export function ChatConsentBanner({ onAccept, onDecline }: ChatConsentBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    const handleAccept = () => {
        setIsVisible(false);
        onAccept();
    };

    const handleDecline = () => {
        setIsVisible(false);
        onDecline();
    };

    if (!isVisible) return null;

    return (
        <div className="bg-gradient-to-b from-[#0B3B2E]/30 to-[#0D7C66]/10 border border-[#0D7C66]/30 rounded-xl p-6 mb-4 relative">
            <button
                onClick={handleDecline}
                className="absolute top-3 right-3 text-[#E7ECEF]/40 hover:text-[#E7ECEF] transition-colors"
                aria-label="Fechar"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3 mb-4">
                <Shield className="w-5 h-5 text-[#0D7C66] flex-shrink-0 mt-1" />
                <div>
                    <h3 className="text-sm font-medium text-[#E7ECEF] mb-2">
                        Consentimento para Uso de IA
                    </h3>
                    <p className="text-xs text-[#E7ECEF]/60 leading-relaxed mb-3">
                        Ao usar este chat, você concorda com:
                    </p>
                    <ul className="text-xs text-[#E7ECEF]/60 space-y-1.5 mb-4 ml-4 list-disc">
                        <li>Coleta de mensagens para fornecer atendimento personalizado</li>
                        <li>Processamento por Google AI (Gemini) para gerar respostas</li>
                        <li>Armazenamento seguro e criptografado por até 24 meses</li>
                        <li>Possível uso anonimizado para melhorar nosso serviço</li>
                    </ul>
                    <p className="text-xs text-[#E7ECEF]/50">
                        Seus dados estão protegidos conforme a LGPD.{' '}
                        <Link href="/privacidade" className="text-[#0D7C66] hover:text-[#0F5A47] underline transition-colors">
                            Ver Política de Privacidade
                        </Link>
                    </p>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleAccept}
                    className="flex-1 px-4 py-2 bg-[#0D7C66] text-[#E7ECEF] rounded-lg text-xs font-medium hover:bg-[#0F5A47] transition-all"
                >
                    Aceitar e Continuar
                </button>
                <button
                    onClick={handleDecline}
                    className="px-4 py-2 bg-transparent border border-[#E7ECEF]/20 text-[#E7ECEF]/60 rounded-lg text-xs font-medium hover:border-[#E7ECEF]/40 hover:text-[#E7ECEF] transition-all"
                >
                    Recusar
                </button>
            </div>
        </div>
    );
}
