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

/** Visibilidade de um marcador observado: a seção de topo a que pertence e, em seções
 * com passos (sticky + um marcador de 100svh por passo), qual passo ele representa. */
export interface StepVisibility {
  section: number;
  step: number;
  ratio: number;
}

/**
 * Seção ativa + passo dentro dela. Agrega por seção pelo marcador mais visível (uma
 * seção com passos tem N marcadores mapeados pro mesmo índice) e devolve o passo desse
 * marcador — assim entrar numa seção com passos rolando de baixo pra cima cai no
 * último passo, não no passo que estava ativo da última vez.
 */
export function pickActiveSectionStep(
  entries: StepVisibility[],
  threshold = 0.6
): { section: number; step: number } | null {
  const best = new Map<number, StepVisibility>();
  for (const e of entries) {
    const current = best.get(e.section);
    if (!current || e.ratio > current.ratio) best.set(e.section, e);
  }
  const section = pickActiveSection(
    Array.from(best.values(), (e) => ({ index: e.section, ratio: e.ratio })),
    threshold
  );
  if (section === null) return null;
  return { section, step: best.get(section)!.step };
}
