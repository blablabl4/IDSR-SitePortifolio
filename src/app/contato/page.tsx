'use client';

import React, { useState } from 'react';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContatoPage() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        mensagem: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        console.log('Form submitted:', formData);
        alert('Mensagem enviada! Entraremos em contato em breve.');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#E7ECEF]">
            <GlassHeader />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg mb-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
                            Contato
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extralight text-[#E7ECEF] mb-6">
                        Vamos conversar
                    </h1>
                    <p className="text-sm text-[#E7ECEF]/50 max-w-2xl mx-auto">
                        Envie sua mensagem ou entre em contato diretamente pelos nossos canais.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <GlassSection className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-extralight text-[#E7ECEF] mb-6">
                                Envie uma mensagem
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="nome" className="block text-sm text-[#E7ECEF]/60 mb-2">
                                        Nome *
                                    </label>
                                    <input
                                        type="text"
                                        id="nome"
                                        required
                                        value={formData.nome}
                                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] focus:border-[#0D7C66] focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm text-[#E7ECEF]/60 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] focus:border-[#0D7C66] focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="telefone" className="block text-sm text-[#E7ECEF]/60 mb-2">
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefone"
                                        value={formData.telefone}
                                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] focus:border-[#0D7C66] focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="empresa" className="block text-sm text-[#E7ECEF]/60 mb-2">
                                        Empresa
                                    </label>
                                    <input
                                        type="text"
                                        id="empresa"
                                        value={formData.empresa}
                                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] focus:border-[#0D7C66] focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="mensagem" className="block text-sm text-[#E7ECEF]/60 mb-2">
                                        Mensagem *
                                    </label>
                                    <textarea
                                        id="mensagem"
                                        required
                                        rows={5}
                                        value={formData.mensagem}
                                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] rounded-xl text-[#E7ECEF] focus:border-[#0D7C66] focus:outline-none transition-colors resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-6 py-4 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-xl shadow-[#0D7C66]/30 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Enviar mensagem
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-extralight text-[#E7ECEF] mb-6">
                                    Outros canais
                                </h2>
                                <p className="text-sm text-[#E7ECEF]/60 mb-8">
                                    Prefere falar diretamente? Escolha o canal mais conveniente.
                                </p>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-[#0D7C66]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-light text-[#E7ECEF] mb-1">Email</h3>
                                    <a
                                        href="mailto:contato@idsr.com.br"
                                        className="text-sm text-[#0D7C66] hover:text-[#0F5A47] transition-colors"
                                    >
                                        contato@idsr.com.br
                                    </a>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-[#0D7C66]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-light text-[#E7ECEF] mb-1">WhatsApp</h3>
                                    <a
                                        href="https://wa.me/5511999999999"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#0D7C66] hover:text-[#0F5A47] transition-colors"
                                    >
                                        +55 (11) 99999-9999
                                    </a>
                                </div>
                            </div>

                            {/* Address (Optional) */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#0D7C66]/10 border border-[#0D7C66]/20 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-[#0D7C66]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-light text-[#E7ECEF] mb-1">Endereço</h3>
                                    <p className="text-sm text-[#E7ECEF]/60">
                                        São Paulo, SP<br />
                                        Brasil
                                    </p>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 mt-8">
                                <h3 className="text-lg font-light text-[#E7ECEF] mb-3">
                                    Horário de Atendimento
                                </h3>
                                <p className="text-sm text-[#E7ECEF]/60">
                                    Segunda a Sexta: 9h - 18h<br />
                                    Sábado e Domingo: Fechado
                                </p>
                                <p className="text-xs text-[#E7ECEF]/40 mt-4">
                                    Respondemos todas as mensagens em até 24 horas úteis.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </GlassSection>

            {/* CTA Section */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Prefere uma demonstração?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8">
                        Agende uma conversa com nosso time para conhecer as soluções.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20"
                    >
                        Começar diagnóstico
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
