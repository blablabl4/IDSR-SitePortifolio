import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IDSR - Infraestrutura de Dados, Sistemas e Rastreabilidade",
  description: "Automação de atendimento, agendamento e gestão para varejo, restaurantes e serviços. Operação que funciona enquanto você dorme.",
  keywords: ["automação", "atendimento", "gestão", "varejo", "restaurantes", "IDSR"],
  authors: [{ name: "IDSR" }],
  openGraph: {
    title: "IDSR",
    description: "Automação + Dados para seu negócio",
    url: "https://idsr.com.br",
    siteName: "IDSR",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
