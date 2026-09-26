import { describe, it, expect } from 'vitest';
import { pickActiveSection } from '@/context/activeSection';

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
