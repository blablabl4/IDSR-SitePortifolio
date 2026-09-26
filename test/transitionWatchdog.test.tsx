/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import {
  TransitionProvider,
  useTransition,
  SECTION_SLUGS,
} from '@/context/TransitionContext';

// Tween "travado" de propósito: nunca chama onUpdate/onComplete, simulando o rAF
// do gsap pausado em segundo plano (aba trocada/minimizada) — exatamente o cenário
// que o watchdog precisa detectar e destravar.
vi.mock('gsap', () => ({
  default: { to: vi.fn(() => ({ kill: vi.fn() })) },
}));

function TestHarness() {
  const { status, currentSection, targetSection, navigateTo, registerSection } = useTransition();
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="current-section">{currentSection}</span>
      <span data-testid="target-section">{targetSection}</span>
      {SECTION_SLUGS.map((slug, i) => (
        <div key={slug} id={`secao-${slug}`} ref={registerSection(i)} />
      ))}
      <button onClick={() => navigateTo(2)}>go-to-quem-pode-usar</button>
    </div>
  );
}

describe('TransitionContext watchdog', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // jsdom não implementa scrollIntoView; navigateTo() chama isso ao navegar.
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('força IDLE_NA_SECAO se o status ficar travado por mais de 3000ms', () => {
    render(
      <TransitionProvider>
        <TestHarness />
      </TransitionProvider>
    );

    act(() => {
      screen.getByText('go-to-quem-pode-usar').click();
    });

    // O tween mockado nunca completa: status fica preso em TRANSICIONANDO.
    expect(screen.getByTestId('status').textContent).toBe('TRANSICIONANDO');

    // Pouco antes do timeout: ainda travado.
    act(() => {
      vi.advanceTimersByTime(2900);
    });
    expect(screen.getByTestId('status').textContent).toBe('TRANSICIONANDO');

    // Passa dos 3000ms: o watchdog deve destravar.
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(screen.getByTestId('status').textContent).toBe('IDLE_NA_SECAO');
  });

  it('ressincroniza a seção ativa com a posição real de scroll, não com o alvo antigo', () => {
    render(
      <TransitionProvider>
        <TestHarness />
      </TransitionProvider>
    );

    act(() => {
      screen.getByText('go-to-quem-pode-usar').click();
    });
    expect(screen.getByTestId('target-section').textContent).toBe('2');

    // Enquanto travado, o usuário rolou manualmente até "metodologia" (índice 3) —
    // simula isso fazendo esse elemento parecer 100% visível na viewport.
    const metodologiaEl = document.getElementById('secao-metodologia')!;
    vi.spyOn(metodologiaEl, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: window.innerHeight,
      height: window.innerHeight,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    act(() => {
      vi.advanceTimersByTime(3600);
    });

    expect(screen.getByTestId('status').textContent).toBe('IDLE_NA_SECAO');
    expect(screen.getByTestId('current-section').textContent).toBe('3');
  });
});
