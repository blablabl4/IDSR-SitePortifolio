import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { generalSans, cabinetGrotesk, jetbrainsMono } from "@/fonts";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://idsr.com.br"),
  title: "IDSR - Infraestrutura de Dados, Sistemas e Rastreabilidade",
  description: "Automação de atendimento, vendas, agendamentos e rotinas operacionais para varejo, restaurantes e serviços. Operação com dados reais e rastreabilidade 24/7.",
  keywords: [
    "automação de atendimento",
    "rastreabilidade operacional",
    "gestão de processos",
    "redução de no-show",
    "atendimento WhatsApp 24/7",
    "CRM de vendas",
    "IDSR",
    "infraestrutura de dados"
  ],
  authors: [{ name: "IDSR", url: "https://idsr.com.br" }],
  creator: "IDSR",
  openGraph: {
    title: "IDSR - Infraestrutura de Dados, Sistemas e Rastreabilidade",
    description: "Automação inteligente e dados estruturados para sua empresa funcionar com precisão 24/7.",
    url: "https://idsr.com.br",
    siteName: "IDSR",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IDSR - Automação Operacional com Rastreabilidade",
    description: "Atendimento 24/7, gestão de agendamentos e automação de vendas para empresas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "IDSR",
  "alternateName": "Infraestrutura de Dados, Sistemas e Rastreabilidade",
  "url": "https://idsr.com.br",
  "logo": "https://idsr.com.br/favicon.ico",
  "description": "Automação de atendimento, agendamento e gestão para varejo, restaurantes e serviços.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-99999-9999",
    "contactType": "sales",
    "areaServed": "BR",
    "availableLanguage": "Portuguese"
  },
  "offers": [
    { "@type": "Offer", "name": "Central Pulse", "description": "Atendimento inteligente e triagem 24/7" },
    { "@type": "Offer", "name": "LeadFlow", "description": "Funil de vendas visual e follow-up automático" },
    { "@type": "Offer", "name": "ScheduleFlow", "description": "Agendamentos inteligentes e redução de no-shows" },
    { "@type": "Offer", "name": "OpsFlow", "description": "Checklists operacionais com auditoria de execução" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${generalSans.variable} ${cabinetGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="antialiased bg-[#0a0a0b] text-white selection:bg-[#7c6cf6]/30 selection:text-white font-sans"
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
