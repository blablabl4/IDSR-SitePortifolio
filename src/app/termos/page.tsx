'use client';

import React from 'react';
import Link from 'next/link';
import { GlassHeader } from '@/components/ui/GlassHeader';
import { GlassSection } from '@/components/ui/GlassSection';
import { Footer } from '@/components/ui/Footer';
import { FileText, AlertCircle, Scale, Copyright, Settings, DollarSign, RefreshCw, Gavel, Mail, UserCheck, ShieldAlert, Database, XCircle } from 'lucide-react';

export default function TermosPage() {
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
                        Termos de Uso
                    </h1>
                    <p className="text-sm text-[#E7ECEF]/50 max-w-2xl mx-auto">
                        Condições gerais para acesso e uso do site e/ou plataforma IDSR (&quot;Serviços&quot;). Leia atentamente antes de utilizar.
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
                            <FileText className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                1. Aceitação destes Termos
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Ao acessar, cadastrar-se ou utilizar os Serviços da IDSR, você declara que leu, entendeu e concorda com estes Termos. Se você não concordar, não utilize os Serviços.
                            </p>
                            <p>
                                Estes Termos se aplicam a todos os usuários, incluindo visitantes, clientes e parceiros, conforme aplicável.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                2. Identificação e Definições
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Para fins destes Termos:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>IDSR / Prestadora:</strong> 63.686.939 ISAQUE DA SILVA ROCHA, inscrito no CNPJ nº 63.686.939/0001-71, com endereço em Rua Padre Luiz da Grã, 64 – Saúde – São Paulo/SP – CEP 04294-050.</li>
                                <li><strong>Usuário:</strong> pessoa física ou jurídica que acessa ou utiliza os Serviços.</li>
                                <li><strong>Plataforma:</strong> sistemas, aplicações, sites, painéis e recursos disponibilizados pela IDSR.</li>
                                <li><strong>Conteúdo do Usuário:</strong> dados, mensagens, arquivos, configurações, listas e quaisquer informações inseridas/geradas pelo Usuário na Plataforma.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                3. Descrição dos Serviços
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>A IDSR oferece, entre outros:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Automação de processos comerciais e operacionais</li>
                                <li>Chatbots e sistemas de atendimento automatizado</li>
                                <li>Agendamento e gestão de agenda</li>
                                <li>Ferramentas de análise de dados operacionais</li>
                                <li>Integrações e soluções personalizadas sob demanda</li>
                            </ul>
                            <p className="mt-4">
                                A IDSR pode, a seu critério, modificar, suspender ou descontinuar funcionalidades por razões técnicas, de segurança, legais ou estratégicas, buscando comunicar mudanças relevantes por meios razoáveis.
                            </p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <UserCheck className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                4. Elegibilidade e Cadastro
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Ao utilizar os Serviços, você declara ter capacidade legal para aceitar estes Termos. Caso utilize os Serviços em nome de uma empresa, você declara ter poderes para representá-la e vinculá-la a estes Termos.
                            </p>
                            <p>Você é responsável por:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Fornecer informações corretas e atualizadas</li>
                                <li>Manter a confidencialidade de suas credenciais</li>
                                <li>Restringir o acesso à sua conta</li>
                                <li>Notificar imediatamente qualquer uso não autorizado</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                5. Uso Aceitável e Responsabilidades do Usuário
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Você concorda em utilizar os Serviços:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Apenas para finalidades lícitas e autorizadas</li>
                                <li>Em conformidade com a legislação aplicável e com estes Termos</li>
                                <li>Respeitando direitos de terceiros (incluindo privacidade e propriedade intelectual)</li>
                            </ul>
                            <p className="mt-4"><strong>É proibido:</strong></p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Tentar burlar medidas de segurança, explorar vulnerabilidades ou realizar testes de intrusão sem autorização</li>
                                <li>Praticar engenharia reversa, copiar, reproduzir, vender, alugar, sublicenciar ou explorar comercialmente a Plataforma, salvo permissão expressa</li>
                                <li>Inserir, transmitir ou automatizar comunicações ilícitas, abusivas, fraudulentas ou que violem políticas de terceiros</li>
                            </ul>
                            <p className="mt-4">
                                <strong>Integrações e terceiros</strong> (ex.: WhatsApp/Meta, provedores de e-mail, APIs): você é responsável por cumprir os termos e políticas desses terceiros. A IDSR não controla serviços de terceiros e não garante sua disponibilidade contínua, mudanças de API, limites, bloqueios ou políticas.
                            </p>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                6. Conteúdo do Usuário e Dados
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                O Usuário mantém a titularidade e responsabilidade sobre o Conteúdo do Usuário. Para operar os Serviços, você concede à IDSR uma licença limitada, não exclusiva e pelo prazo de uso, para hospedar, processar, transmitir e exibir o Conteúdo do Usuário na medida necessária à prestação do serviço.
                            </p>
                            <p>
                                O tratamento de dados pessoais é regido também pela Política de Privacidade da IDSR.
                            </p>
                        </div>
                    </div>

                    {/* Section 7 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Copyright className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                7. Propriedade Intelectual
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Todo o conteúdo, código, design, marcas, logotipos, interfaces, documentação e materiais da IDSR são de propriedade exclusiva da IDSR ou de seus licenciadores.
                            </p>
                            <p>Você não pode:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Reproduzir, distribuir, modificar ou criar obras derivadas de qualquer parte dos Serviços sem autorização</li>
                                <li>Usar marcas, nomes, identidade visual ou logotipos da IDSR sem permissão</li>
                                <li>Remover avisos de direitos autorais, marca ou propriedade</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 8 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldAlert className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                8. Disponibilidade, Manutenção e Suporte
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                A IDSR busca manter os Serviços disponíveis e seguros, mas pode ocorrer indisponibilidade por manutenção, atualização, limitações técnicas, falhas de terceiros ou eventos fora do controle razoável.
                            </p>
                            <p>
                                Salvo previsão específica do plano/contrato, não há SLA de disponibilidade. O suporte e os canais atendidos seguem regras e horários informados pela IDSR.
                            </p>
                        </div>
                    </div>

                    {/* Section 9 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                9. Limitação de Responsabilidade
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Os Serviços são fornecidos &quot;no estado em que se encontram&quot; e &quot;conforme disponibilidade&quot;.
                            </p>
                            <p>Na máxima extensão permitida por lei, a IDSR não será responsável por:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Danos indiretos, incidentais, punitivos ou consequenciais</li>
                                <li>Perda de lucros, receita, reputação, oportunidade ou dados (quando decorrentes de fatores alheios ao controle razoável)</li>
                                <li>Indisponibilidades, falhas, bloqueios, restrições ou mudanças causadas por serviços de terceiros e integrações</li>
                                <li>Uso indevido da conta por falha do Usuário em manter credenciais seguras</li>
                            </ul>
                            <p className="mt-4">
                                Nada nestes Termos limita direitos inderrogáveis previstos em lei, quando aplicável.
                            </p>
                        </div>
                    </div>

                    {/* Section 10 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <DollarSign className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                10. Planos, Pagamentos e Cobrança
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Quando houver contratação de planos:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Preços, limites, funcionalidades e condições serão apresentados no momento da contratação</li>
                                <li>A cobrança seguirá a periodicidade do plano (mensal/anual etc.)</li>
                                <li>A IDSR pode atualizar preços e condições, comunicando previamente quando aplicável</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 11 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                11. Cancelamento, Encerramento e Reembolsos
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                <strong>Cancelamento pelo Usuário:</strong> você pode cancelar a assinatura a qualquer momento. Salvo disposição específica do plano/contrato, o acesso permanece ativo até o final do período já pago.
                            </p>
                            <p>
                                <strong>Cancelamento/Rejeição pela IDSR:</strong> a IDSR pode suspender ou encerrar o acesso se houver violação destes Termos, risco de segurança, exigência legal, abuso ou uso ilícito.
                            </p>
                            <p>
                                <strong>Reembolsos:</strong> como regra, não oferecemos reembolsos após o início do ciclo contratado, exceto quando exigido por lei. Se aplicável, poderão existir direitos do consumidor (ex.: arrependimento em contratações online dentro do prazo legal).
                            </p>
                        </div>
                    </div>

                    {/* Section 12 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <RefreshCw className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                12. Alterações destes Termos
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Podemos atualizar estes Termos periodicamente. Quando houver mudanças relevantes, comunicaremos por meios razoáveis (ex.: aviso no site ou e-mail, quando aplicável). O uso continuado após a vigência da nova versão indica aceitação.
                            </p>
                        </div>
                    </div>

                    {/* Section 13 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Gavel className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                13. Lei aplicável e Foro
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>
                                Estes Termos são regidos pelas leis da República Federativa do Brasil.
                            </p>
                            <p>
                                Fica eleito o foro da comarca de São Paulo/SP, salvo disposição legal em contrário, inclusive normas de proteção ao consumidor quando aplicáveis.
                            </p>
                        </div>
                    </div>

                    {/* Section 14 */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-5 h-5 text-[#0D7C66]" />
                            <h2 className="text-2xl font-extralight text-[#E7ECEF]">
                                14. Contato
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-[#E7ECEF]/60 leading-relaxed">
                            <p>Para dúvidas sobre estes Termos:</p>
                            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 mt-4">
                                <p><strong className="text-[#E7ECEF]">E-mail:</strong> Privacidade@idsr.com.br</p>
                                <p className="mt-2"><strong className="text-[#E7ECEF]">CNPJ:</strong> 63.686.939/0001-71</p>
                                <p className="mt-2"><strong className="text-[#E7ECEF]">Endereço:</strong> Rua Padre Luiz da Grã, 64 – Saúde – São Paulo/SP – CEP 04294-050</p>
                            </div>
                        </div>
                    </div>

                </div>
            </GlassSection>

            {/* CTA Section */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-extralight text-[#E7ECEF] mb-4">
                        Pronto para começar?
                    </h3>
                    <p className="text-sm text-[#E7ECEF]/50 mb-8">
                        Ao usar nossos serviços, você concorda com estes termos.
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
