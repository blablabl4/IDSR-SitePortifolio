/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '@/app/page';

describe('Home page (render server-side)', () => {
  it('renderiza a headline e pelo menos 8 links reais', () => {
    render(<Home />);

    // A headline quebra cada palavra num <span> próprio (efeito de glitch), então
    // nenhum elemento isolado contém a frase inteira — compara pelo texto
    // normalizado do documento inteiro, igual a um leitor de tela/crawler faria.
    const flattenedText = document.body.textContent!.replace(/\s+/g, ' ');
    expect(flattenedText).toMatch(/FUGIR\s*DO\s*ÓBVIO\s*EXIGE/i);

    // TODO(fase 2, item 10): incluir asserção do preço Starter (offer.ts) quando
    // ServicosGlitchSequence passar a exibi-lo — hoje o preço não aparece na home.
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(8);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
    });
  });
});
