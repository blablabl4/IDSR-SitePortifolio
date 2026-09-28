/**
 * Registro único das seções de topo da cena (SitePrincipalStage). A ordem aqui é a
 * ordem de scroll; o índice no array é o `currentSection` do TransitionContext. O
 * slug é o id do <section> e a âncora pública (/#slug) — redirects e HUD apontam
 * pra ele, nunca pro índice. Cores de cena (theme) e de HUD (accent) moram aqui pra
 * que adicionar uma seção seja uma entrada nova, não uma caça a `sec === 4` espalhados.
 */

import { OFFER_MODULES } from './offer';

export interface SceneTheme {
  /** Cor do núcleo dos blocos 3D. */
  core: string;
  /** Cor da borda/refração dos blocos 3D. */
  edge: string;
}

export interface SceneSection {
  slug: string;
  /** Rótulo em caixa alta no HUD. */
  label: string;
  /** Cor do marcador/contador no HUD. */
  accent: string;
  /**
   * Tema dos blocos 3D. Ausente na seção de serviços, que tem um tema por serviço
   * (THEMES_SERVICES em ParticleSceneCanvas).
   */
  theme?: SceneTheme;
  /**
   * Seção com passos: o visual fica sticky numa tela e cada passo é um marcador de
   * 100svh com esse id (âncora /#id). Troca de passo = glitch, sem explosão; nenhuma
   * seção fica mais alta que a viewport do ponto de vista do snap.
   */
  stepIds?: string[];
}

export const SCENE_SECTIONS: SceneSection[] = [
  { slug: 'hero', label: 'HERO', accent: '#38e0e0', theme: { core: '#f59e0b', edge: '#38e0e0' } },
  {
    slug: 'servicos',
    label: 'SERVIÇOS',
    accent: '#06b6d4',
    stepIds: OFFER_MODULES.map((m) => `servico-${m.slug}`),
  },
  { slug: 'quem-pode-usar', label: 'QUEM PODE USAR', accent: '#8b5cf6', theme: { core: '#8b5cf6', edge: '#38e0e0' } },
  { slug: 'metodo', label: 'MÉTODO', accent: '#10b981', theme: { core: '#10b981', edge: '#06b6d4' } },
  { slug: 'contato', label: 'CONTATO', accent: '#38bdf8', theme: { core: '#2563eb', edge: '#38bdf8' } },
];

export const SECTION_SLUGS = SCENE_SECTIONS.map((s) => s.slug);
export const TOTAL_SECTIONS = SCENE_SECTIONS.length;
export const SERVICES_SECTION_INDEX = SECTION_SLUGS.indexOf('servicos');

export function sectionIndexOf(slug: string): number {
  return SECTION_SLUGS.indexOf(slug);
}

/** Id do elemento pra onde rolar ao navegar pra (seção, passo). */
export function anchorIdFor(section: number, step = 0): string | undefined {
  const s = SCENE_SECTIONS[section];
  if (!s) return undefined;
  return s.stepIds?.[step] ?? s.slug;
}

/** Quantidade de passos da seção (1 pra seções de uma tela só). */
export function stepCountOf(section: number): number {
  return SCENE_SECTIONS[section]?.stepIds?.length ?? 1;
}
