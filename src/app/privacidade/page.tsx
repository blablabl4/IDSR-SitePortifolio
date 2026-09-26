'use client';

import React from 'react';
import Link from 'next/link';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { Shield, Mail, FileText, Lock, Users, ShieldCheck, Cookie, Globe, Database, UserX, RefreshCw } from 'lucide-react';

export default function PrivacidadePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#E7ECEF]">
            <GlassHeader />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg mb-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
                            Legal
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extralight text-[#E7ECEF] mb-6">
                        Política de Privacidade
                    </h1>
                    <p className="text-sm text-[#E7ECEF]/50 max-w-2xl mx-auto">
                        Esta Política explica como coletamos, usamos, compartilhamos e protegemos dados pessoais ao utilizar nosso site e/ou plataforma (&quot;Serviços&quot;), conforme a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
                    </p>
                    <p className="text-xs text-[#E7ECEF]/30 mt-4">
                        Última atualização: Dezembro de 2025
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <GlassSection className="py-16">
                <div className="max-w-4xl mx-auto px-6 space-y-12">

                    {/* Section 1 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                1. Quem somos e canal de privacidade
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>A IDSR disponibiliza um canal de comunicação para dúvidas, solicitações e exercício de direitos relacionados a dados pessoais:</p>
                            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6">
                                <p><strong className="text-[#E7ECEF]">E-mail:</strong> privacidade@idsr.com.br</p>
                            </div>
                            <p className="mt-4">
                                <strong>Encarregado (DPO/LGPD):</strong> por atuarmos como agente de tratamento de pequeno porte (MEI), não somos obrigados a indicar encarregado, nos termos da Resolução CD/ANPD nº 2/2022, mantendo este canal de atendimento ao titular.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                2. Dados que coletamos
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Coletamos dados pessoais de acordo com sua interação com os Serviços:</p>

                            <div className="mt-4">
                                <h3 className="text-base font-light text-[#E7ECEF] mb-2">2.1. Dados fornecidos por você</h3>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Cadastro e contato:</strong> nome, e-mail, telefone, empresa (quando aplicável)</li>
                                    <li><strong>Suporte:</strong> conteúdo das mensagens e informações enviadas em solicitações</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-base font-light text-[#E7ECEF] mb-2">2.2. Dados gerados pelo uso</h3>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Dados de uso e logs:</strong> endereço IP, data/hora de acesso, páginas/funcionalidades utilizadas, eventos de sistema, identificadores técnicos do dispositivo/navegador, registros de autenticação e segurança</li>
                                    <li><strong>Dados operacionais:</strong> configurações e parâmetros necessários para execução de automações, integrações e rotinas (metadados técnicos)</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-base font-light text-[#E7ECEF] mb-2">2.3. Cookies e tecnologias similares</h3>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Cookies essenciais (sessão, segurança e funcionamento)</li>
                                    <li>Cookies de preferências</li>
                                    <li>Cookies/tecnologias de analytics (ex.: Google Analytics) para medir uso e melhorar experiência</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                3. Como usamos os dados (finalidades)
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Usamos dados pessoais para:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Fornecer, operar e melhorar os Serviços</li>
                                <li>Criar e gerenciar sua conta, autenticar acessos e manter a sessão</li>
                                <li>Processar solicitações e prestar suporte</li>
                                <li>Enviar comunicações administrativas e técnicas (ex.: avisos de segurança, mudanças relevantes, manutenção)</li>
                                <li>Analisar uso e tendências para melhorias de performance e usabilidade (incluindo analytics)</li>
                                <li>Cumprir obrigações legais/regulatórias e exercer direitos em processos, quando necessário</li>
                            </ul>
                            <p className="mt-4">
                                <strong>Importante:</strong> a IDSR não vende dados pessoais.
                            </p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                4. Compartilhamento de dados
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Podemos compartilhar dados pessoais somente quando necessário para:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Prestação do serviço por fornecedores e subprocessadores (ex.: hospedagem, monitoramento, analytics, envio de e-mails, infraestrutura)</li>
                                <li>Cumprimento legal (ordem judicial, autoridade competente)</li>
                                <li>Segurança e prevenção a fraudes/abuso, quando aplicável</li>
                            </ul>
                            <p className="mt-4">
                                Quando utilizamos fornecedores, adotamos medidas contratuais e organizacionais para proteção dos dados.
                            </p>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                5. Transferência internacional
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Podemos utilizar provedores que armazenam/processam dados fora do Brasil (por exemplo, serviços de nuvem e analytics). Nesses casos, adotamos medidas para assegurar nível adequado de proteção e segurança, conforme a LGPD.
                            </p>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                6. Segurança da informação
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados, que podem incluir: criptografia em trânsito (TLS), controles de acesso, logs de auditoria, monitoramento e backups.
                            </p>
                            <p>
                                Apesar dos esforços, nenhum sistema é totalmente isento de riscos. Em caso de incidente relevante, adotaremos medidas de resposta e comunicações cabíveis conforme a LGPD e regulamentações aplicáveis.
                            </p>
                        </div>
                    </div>

                    {/* Section 7 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                7. Retenção e descarte
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Armazenamos dados pessoais pelo tempo necessário para cumprir as finalidades desta Política, incluindo: manutenção dos Serviços, cumprimento de obrigações legais, prevenção a fraudes, resolução de disputas e exercício regular de direitos. Após os prazos aplicáveis, os dados poderão ser eliminados ou anonimizados, quando possível.
                            </p>
                        </div>
                    </div>

                    {/* Section 8 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                8. Cookies e como gerenciar
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Usamos cookies para:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Manter o funcionamento e a segurança do site/plataforma</li>
                                <li>Lembrar preferências</li>
                                <li>Medir tráfego e uso (ex.: Google Analytics)</li>
                            </ul>
                            <p className="mt-4">
                                Você pode gerenciar cookies nas configurações do seu navegador. A desativação de cookies essenciais pode afetar o funcionamento dos Serviços.
                            </p>
                        </div>
                    </div>

                    {/* Section 9 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                9. Direitos do titular (LGPD)
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Você pode solicitar, quando aplicável:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Confirmação de tratamento e acesso</li>
                                <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                                <li>Anonimização, bloqueio ou eliminação</li>
                                <li>Portabilidade (quando aplicável)</li>
                                <li>Informações sobre compartilhamentos</li>
                                <li>Revogação de consentimento (quando o tratamento depender de consentimento)</li>
                            </ul>
                            <p className="mt-4">
                                Para exercer seus direitos: <a href="mailto:privacidade@idsr.com.br" className="text-[#0D7C66] hover:text-[#0F5A47] transition-colors">privacidade@idsr.com.br</a>
                            </p>
                            <p className="text-xs">
                                Assunto sugerido: &quot;LGPD – Solicitação do Titular&quot;.
                            </p>
                        </div>
                    </div>

                    {/* Section 10 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <UserX className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                10. Crianças e adolescentes
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Os Serviços não são direcionados a menores de idade. Caso identifiquemos tratamento inadequado, adotaremos medidas para correção e/ou exclusão conforme aplicável.
                            </p>
                        </div>
                    </div>

                    {/* Section 10.5 - AI Chat */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                10.5. Chat com Inteligência Artificial
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Nosso chat utiliza IA (Google Gemini) para atendimento personalizado. Coletamos mensagens, informações da empresa e metadados para fornecer respostas, recomendar soluções e melhorar o serviço. Dados são criptografados, retidos por até 24 meses e podem ser anonimizados para treinamento de IA.</p>
                            <div className="bg-[#0B3B2E]/20 border border-[#0D7C66]/30 rounded-xl p-4">
                                <p className="text-[#E7ECEF]">
                                    <strong>Consentimento:</strong> Ao usar o chat, você consente com esta coleta. Pode solicitar acesso/exclusão via{' '}
                                    <a href="mailto:privacidade@idsr.com.br" className="text-[#0D7C66] hover:text-[#0F5A47] transition-colors">privacidade@idsr.com.br</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 11 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <RefreshCw className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                11. Alterações desta Política
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Podemos atualizar esta Política periodicamente. Quando houver mudanças relevantes, comunicaremos por meios razoáveis (por exemplo, aviso no site e/ou e-mail, quando aplicável). A versão vigente estará sempre nesta página.
                            </p>
                        </div>
                    </div>

                    {/* Section 12 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                12. Contato
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Para dúvidas e solicitações relacionadas a dados pessoais:</p>
                            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 mt-4 space-y-2">
                                <p><strong className="text-[#E7ECEF]">Controladora:</strong> 63.686.939 ISAQUE DA SILVA ROCHA (IDSR)</p>
                                <p><strong className="text-[#E7ECEF]">CNPJ:</strong> 63.686.939/0001-71</p>
                                <p><strong className="text-[#E7ECEF]">Endereço:</strong> Rua Padre Luiz da Grã, 64 – Saúde – São Paulo/SP – CEP 04294-050</p>
                                <p><strong className="text-[#E7ECEF]">Canal de privacidade:</strong> privacidade@idsr.com.br</p>
                                <p className="mt-4 pt-4 border-t border-[#2a2a2a]"><strong className="text-[#E7ECEF]">Encarregado (LGPD):</strong> não designado (agente de tratamento de pequeno porte – MEI), mantendo canal de atendimento</p>
                            </div>
                        </div>
                    </div>
                </div>
            </GlassSection>

            {/* CTA Section */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Alguma dúvida?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8">
                        Estamos à disposição para esclarecer qualquer questão sobre privacidade.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-lg shadow-[#0D7C66]/20"
                    >
                        Voltar para home
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
