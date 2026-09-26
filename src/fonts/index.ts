import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';

/**
 * Substitui os dois @import url(...) que existiam em globals.css (Fontshare +
 * Google Fonts) por next/font: sem waterfall de rede bloqueante, self-hosted,
 * sem CLS por fallback (ver LICENSE.txt pro texto da ITF Free Font License).
 * Pesos mantidos idênticos aos que já estavam nos @import — nenhum peso novo.
 */

// Corpo de texto (--font-sans). Não aparece na dobra do hero (que só usa
// --font-display e --font-mono), então não precisa de preload.
export const generalSans = localFont({
  src: [
    { path: './general-sans/GeneralSans-Extralight.woff2', weight: '200', style: 'normal' },
    { path: './general-sans/GeneralSans-Light.woff2', weight: '300', style: 'normal' },
    { path: './general-sans/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './general-sans/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './general-sans/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './general-sans/GeneralSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
});

// Títulos (--font-display). A headline do hero (acima da dobra) usa peso 900.
export const cabinetGrotesk = localFont({
  src: [
    { path: './cabinet-grotesk/CabinetGrotesk-Bold.woff2', weight: '700', style: 'normal' },
    { path: './cabinet-grotesk/CabinetGrotesk-Extrabold.woff2', weight: '800', style: 'normal' },
    { path: './cabinet-grotesk/CabinetGrotesk-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

// Técnico/mono (--font-mono). O badge "IDSR" e a assinatura do hero usam essa
// família acima da dobra.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});
