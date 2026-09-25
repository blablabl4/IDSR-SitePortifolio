/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { GitPortfolioShowcase } from '@/components/showcase/GitPortfolioShowcase';

describe('GitPortfolioShowcase Component (TDD)', () => {
  it('should render the title and initial git projects', () => {
    render(<GitPortfolioShowcase />);
    expect(screen.getByText(/Portfólio Técnico Interativo/i)).toBeInTheDocument();
    expect(screen.getByText(/IDSR Web Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/NFParser Fiscal Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/StreamAssist Bot/i)).toBeInTheDocument();
  });

  it('should filter projects when category button is clicked', async () => {
    render(<GitPortfolioShowcase />);

    const automationBtn = screen.getByRole('button', { name: /Automação & Processamento/i });
    fireEvent.click(automationBtn);

    // NFParser deve estar visível
    expect(await screen.findByText(/NFParser Fiscal Engine/i)).toBeInTheDocument();
    expect(await screen.findByText(/StreamAssist Bot/i)).toBeInTheDocument();
  });

  it('should open modal on project click and display terminal simulation', async () => {
    render(<GitPortfolioShowcase />);

    // Clica no card do NFParser
    const nfCard = screen.getByText(/NFParser Fiscal Engine/i);
    fireEvent.click(nfCard);

    // O modal deve abrir exibindo o comando de simulação
    expect(await screen.findByText(/python -m nfparser.cli/i)).toBeInTheDocument();

    // Testa alternância para aba de segurança
    const securityTab = screen.getByRole('button', { name: /Auditoria & Segurança/i });
    fireEvent.click(securityTab);

    expect(await screen.findByText(/Sanitização de Dados Auditada/i)).toBeInTheDocument();
    expect(await screen.findByText(/ZERO Detected/i)).toBeInTheDocument();
  });
});
