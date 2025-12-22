'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-[#0c0c0c] border-t border-[#1a1a1a]">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-light text-[#E7ECEF] mb-4">IDSR</h3>
                        <p className="text-sm text-[#E7ECEF]/50 leading-relaxed">
                            Automação com método, dados com contexto.
                        </p>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-sm font-medium text-[#E7ECEF] mb-4 uppercase tracking-wide">
                            Soluções
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/produtos" className="text-sm text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Produtos
                                </Link>
                            </li>
                            <li>
                                <Link href="/precos" className="text-sm text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Preços
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-medium text-[#E7ECEF] mb-4 uppercase tracking-wide">
                            Empresa
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/sobre" className="text-sm text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Sobre
                                </Link>
                            </li>
                            <li>
                                <Link href="/contato" className="text-sm text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-medium text-[#E7ECEF] mb-4 uppercase tracking-wide">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacidade" className="text-sm text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Privacidade
                                </Link>
                            </li>
                            <li>
                                <Link href="/termos" className="text-sm text-[#E7ECEF]/60 hover:text-[#0D7C66] transition-colors">
                                    Termos de Uso
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#E7ECEF]/30">
                        © {currentYear} IDSR. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Links - Add when available */}
                        <a
                            href="mailto:contato@idsr.com.br"
                            className="text-xs text-[#E7ECEF]/30 hover:text-[#0D7C66] transition-colors"
                        >
                            Email
                        </a>
                        <a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#E7ECEF]/30 hover:text-[#0D7C66] transition-colors"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
