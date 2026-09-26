import type { Metadata } from 'next';
import { TransitionProvider } from '@/context/TransitionContext';
import { SitePrincipalStage } from '@/components/central/SitePrincipalStage';
import { OFFER_MODULES } from '@/lib/offer';

const headline = 'Fugir do óbvio exige mais do que uma ideia ou uma ferramenta, é o caminho que conecta as duas.';
const description = `${OFFER_MODULES[0].painPoint} Automações comerciais, agentes de IA, dados e sistemas sob medida para sua empresa parar de perder vendas por demora.`;

export const metadata: Metadata = {
  title: 'IDSR - Automação Comercial, Agentes de IA e Sistemas Sob Medida',
  description,
  openGraph: {
    title: headline,
    description,
    url: 'https://idsr.com.br',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: headline,
    description,
  },
};

export default function Home() {
  return (
    <TransitionProvider>
      <SitePrincipalStage />
    </TransitionProvider>
  );
}
