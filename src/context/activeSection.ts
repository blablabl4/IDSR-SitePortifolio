/**
 * Lógica pura de "qual seção está ativa" a partir de razões de interseção reportadas
 * por um IntersectionObserver. Extraída da criação do observer para ser testável sem
 * mockar a API do DOM: o observer real só precisa mapear suas entries pra este formato
 * e chamar pickActiveSection.
 */
export interface SectionVisibility {
  index: number;
  ratio: number;
}

/**
 * Escolhe a seção mais visível entre as que cruzam o threshold. Quando nenhuma
 * cruza o threshold (ex.: durante a rolagem, entre duas seções), retorna null —
 * o chamador deve manter a última seção ativa conhecida nesse caso.
 */
export function pickActiveSection(entries: SectionVisibility[], threshold = 0.6): number | null {
  const visible = entries.filter((e) => e.ratio >= threshold);
  if (visible.length === 0) return null;
  return visible.reduce((best, e) => (e.ratio > best.ratio ? e : best)).index;
}
