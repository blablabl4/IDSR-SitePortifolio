import { describe, it, expect } from 'vitest';
import { pickActiveSection, pickActiveSectionStep } from '@/context/activeSection';

describe('pickActiveSection', () => {
    it('escolhe a única seção que cruza o threshold', () => {
        const result = pickActiveSection(
            [
                { index: 0, ratio: 0.1 },
                { index: 1, ratio: 0.75 },
                { index: 2, ratio: 0 },
            ],
            0.6
        );
        expect(result).toBe(1);
    });

    it('escolhe a seção com maior razão quando mais de uma cruza o threshold', () => {
        const result = pickActiveSection(
            [
                { index: 2, ratio: 0.65 },
                { index: 3, ratio: 0.9 },
            ],
            0.6
        );
        expect(result).toBe(3);
    });

    it('retorna null quando nenhuma seção cruza o threshold (transição em andamento)', () => {
        const result = pickActiveSection(
            [
                { index: 0, ratio: 0.3 },
                { index: 1, ratio: 0.4 },
            ],
            0.6
        );
        expect(result).toBeNull();
    });

    it('retorna null para lista vazia de entries', () => {
        expect(pickActiveSection([], 0.6)).toBeNull();
    });

    it('usa 0.6 como threshold padrão quando não informado', () => {
        expect(pickActiveSection([{ index: 0, ratio: 0.61 }])).toBe(0);
        expect(pickActiveSection([{ index: 0, ratio: 0.59 }])).toBeNull();
    });
});

describe('pickActiveSectionStep (8 seções, serviços e preços com passos)', () => {
    it('seção sem passos devolve step 0', () => {
        expect(
            pickActiveSectionStep(
                [
                    { section: 3, step: 0, ratio: 0.3 },
                    { section: 7, step: 0, ratio: 0.9 },
                ],
                0.5
            )
        ).toEqual({ section: 7, step: 0 });
    });

    it('agrega os marcadores da mesma seção e devolve o passo mais visível', () => {
        // Rolando de contato (7) pra cima até a última FAQ de preços (seção 4, passo 6).
        expect(
            pickActiveSectionStep(
                [
                    { section: 4, step: 5, ratio: 0.1 },
                    { section: 4, step: 6, ratio: 0.85 },
                    { section: 7, step: 0, ratio: 0.15 },
                ],
                0.5
            )
        ).toEqual({ section: 4, step: 6 });
    });

    it('retorna null no meio da rolagem entre duas telas', () => {
        expect(
            pickActiveSectionStep(
                [
                    { section: 1, step: 4, ratio: 0.45 },
                    { section: 2, step: 0, ratio: 0.45 },
                ],
                0.5
            )
        ).toBeNull();
    });
});
