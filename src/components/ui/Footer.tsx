'use client';

import React from 'react';
import Link from 'next/link';
import { CONTACT_CONFIG, getWhatsAppUrl } from '@/lib/contact-config';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-[#0c0c0c] border-t border-[#1a1a1a]">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">

                    {/* Company Info */}
                    <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#0D7C66] shadow-[0_0_8px_#0D7C66]" />
                            <h3 className="text-base font-medium text-[#E7ECEF] uppercase tracking-wider">IDSR</h3>
                        </div>
                        <p className="text-xs text-[#E7ECEF]/60 leading-relaxed font-light max-w-sm">
                            Infraestrutura de Dados, Sistemas e Rastreabilidade. Automação inteligente 24/7 com método
                            de engenharia para empresas que não podem perder vendas.
                        </p>
                        <p className="text-[11px] text-[#E7ECEF]/40 font-mono pt-1">
                            {CONTACT_CONFIG.razaoSocial} · CNPJ {CONTACT_CONFIG.cnpj}
                        </p>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-xs font-semibold text-[#E7ECEF] mb-4 uppercase tracking-[0.2em]">
                            Soluções
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/produtos" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Todos os Produtos
                                </Link>
                            </li>
                            <li>
                                <Link href="/precos" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Tabela de Preços
                                </Link>
                            </li>
                            <li>
                                <Link href="/produtos#automacoes" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Automações 24/7
                                </Link>
                            </li>
                            <li>
                                <Link href="/produtos#sites-dashboards" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Sites & Dashboards
                                </Link>
                            </li>
                            <li>
                                <Link href="/produtos#quem-pode-usar" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Quem Pode Usar (Nichos)
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-xs font-semibold text-[#E7ECEF] mb-4 uppercase tracking-[0.2em]">
                            Empresa
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/sobre" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Quem Somos
                                </Link>
                            </li>
                            <li>
                                <Link href="/manifesto" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Manifesto
                                </Link>
                            </li>
                            <li>
                                <Link href="/suporte" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Suporte & SLA
                                </Link>
                            </li>
                            <li>
                                <Link href="/contato" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Fale Conosco
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-xs font-semibold text-[#E7ECEF] mb-4 uppercase tracking-[0.2em]">
                            Transparência
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacidade" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Privacidade & LGPD
                                </Link>
                            </li>
                            <li>
                                <Link href="/termos" className="text-xs text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Termos de Uso
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#E7ECEF]/40 font-light">
                        © {currentYear} IDSR. Todos os direitos reservados. {CONTACT_CONFIG.cidadeEstado}.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href={getWhatsAppUrl({ origem: 'footer' as any })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#0D7C66] hover:text-[#0F5A47] transition-colors font-mono font-medium flex items-center gap-1"
                        >
                            WhatsApp Direto: {CONTACT_CONFIG.whatsappDisplay}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
