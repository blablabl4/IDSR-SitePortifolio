/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { InteractivePortfolio } from '@/components/showcase/InteractivePortfolio';

describe('InteractivePortfolio Component (TDD)', () => {
  it('should render the default Pulse tab and title', () => {
    render(<InteractivePortfolio />);
    expect(screen.getByText(/Experimente os módulos em funcionamento/i)).toBeInTheDocument();
    expect(screen.getByText(/Central Pulse — Simulador de Triagem/i)).toBeInTheDocument();
  });

  it('should switch tabs when clicked', async () => {
    render(<InteractivePortfolio />);

    // Clica na aba LeadFlow
    const leadflowTab = screen.getByRole('button', { name: /LeadFlow \(Vendas\)/i });
    fireEvent.click(leadflowTab);
    expect(await screen.findByText(/LeadFlow — Pipeline Visual/i)).toBeInTheDocument();

    // Clica na aba ScheduleFlow
    const scheduleTab = screen.getByRole('button', { name: /ScheduleFlow \(Agenda\)/i });
    fireEvent.click(scheduleTab);
    expect(await screen.findByText(/ScheduleFlow — Régua Ativa/i)).toBeInTheDocument();

    // Clica na aba Cases Reais
    const casesTab = screen.getByRole('button', { name: /Cases Reais/i });
    fireEvent.click(casesTab);
    expect(await screen.findByText(/Zapão Delivery & Operação/i)).toBeInTheDocument();
    expect(await screen.findByText(/Casa Rael Eventos & Gastronomia/i)).toBeInTheDocument();
  });
});
