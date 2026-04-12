import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { KPIDashboard } from './KPIDashboard';

describe('KPIDashboard', () => {
  const renderPage = () => {
    return render(
      <MemoryRouter>
        <KPIDashboard />
      </MemoryRouter>,
    );
  };

  it('renders the KPI heading and key metrics', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: 'Performance Dashboard' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Live Metrics')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Total Revenue' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Orders Today' })).toBeInTheDocument();
  });

  it('uses a one-column mobile grid and responsive shared signage sizing', () => {
    renderPage();

    expect(screen.getByTestId('kpi-dashboard')).toHaveClass('p-4', 'sm:p-8');
    expect(
      screen.getByRole('heading', { name: 'Performance Dashboard' }),
    ).toHaveClass('text-5xl', 'sm:text-6xl', 'lg:text-8xl');
    expect(screen.getByTestId('kpi-dashboard-grid')).toHaveClass(
      'grid-cols-1',
      'md:grid-cols-2',
    );
  });
});