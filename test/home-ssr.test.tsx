/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Home from '@/app/page';
import { SCENE_SECTIONS } from '@/lib/scene-sections';

describe('Home page (render server-side)', () => {
  it('renderiza a headline e um link real por seção (no mínimo)', () => {
    render(<Home />);

    // A headline quebra cada palavra num <span> próprio (efeito de glitch), então
    // nenhum elemento isolado contém a frase inteira — compara pelo texto
    // normalizado do documento inteiro, igual a um leitor de tela/crawler faria.
    const flattenedText = document.body.textContent!.replace(/\s+/g, ' ');
    expect(flattenedText).toMatch(/FUGIR\s*DO\s*ÓBVIO\s*EXIGE/i);

    const links = screen.getAllByRole('link');
    // Os links pra páginas internas saíram do HUD (só âncoras agora); o piso é um
    // link real por seção da cena, todos com href.
    expect(links.length).toBeGreaterThanOrEqual(SCENE_SECTIONS.length);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
    });
  });

  it('HTML do servidor tem um id por seção e por passo, na ordem do registro', () => {
    const html = renderToString(<Home />);
    let lastPos = -1;
    for (const section of SCENE_SECTIONS) {
      const pos = html.indexOf(`id="${section.slug}"`);
      expect(pos, `seção ${section.slug}`).toBeGreaterThan(lastPos);
      lastPos = pos;
      for (const stepId of section.stepIds ?? []) {
        expect(html, `passo ${stepId}`).toContain(`id="${stepId}"`);
      }
    }
  });

  it('HUD tem um link de âncora por seção e nenhum link para páginas internas', () => {
    render(<Home />);
    const nav = screen.getByRole('navigation', { name: 'Seções do site' });
    const hrefs = Array.from(nav.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(SCENE_SECTIONS.map((s) => `#${s.slug}`));
    expect(nav.textContent).toContain(`/ ${SCENE_SECTIONS.length}]`);
  });
});
