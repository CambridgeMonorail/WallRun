import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { BuildSignagePage } from './BuildSignage';

describe('BuildSignagePage', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <BuildSignagePage />
      </BrowserRouter>,
    );
  };

  it('renders the page title', () => {
    renderWithRouter();
    expect(screen.getByText('Build a Signage Screen')).toBeInTheDocument();
  });

  it('renders page description', () => {
    renderWithRouter();
    expect(
      screen.getByText(
        /use the signage-architect agent to implement premium digital signage/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders "What the Agent Does" section', () => {
    renderWithRouter();
    expect(screen.getByText('What the Agent Does')).toBeInTheDocument();
  });

  it('renders step-by-step guide section', () => {
    renderWithRouter();
    expect(screen.getByText('Step-by-Step Guide')).toBeInTheDocument();
  });

  it('renders all 6 steps', () => {
    renderWithRouter();
    expect(
      screen.getByText('1. Start From a Design Brief'),
    ).toBeInTheDocument();
    expect(screen.getByText('2. Invoke the Agent')).toBeInTheDocument();
    expect(
      screen.getByText('3. Review Implementation Options'),
    ).toBeInTheDocument();
    expect(screen.getByText('4. Agent Builds the Screen')).toBeInTheDocument();
    expect(screen.getByText('5. Verify Locally')).toBeInTheDocument();
    expect(screen.getByText('6. Next Steps: Deployment')).toBeInTheDocument();
  });

  it('renders agent invocation example', () => {
    renderWithRouter();
    expect(screen.getByText(/@signage-architect/)).toBeInTheDocument();
  });

  it('renders agent capabilities', () => {
    renderWithRouter();
    expect(
      screen.getByText(/full-screen layouts optimized for distance viewing/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/brightsign-compatible react apps/i),
    ).toBeInTheDocument();
  });

  it('renders customization section', () => {
    renderWithRouter();
    expect(
      screen.getByText('Customization After Implementation'),
    ).toBeInTheDocument();
  });

  it('renders link to design brief guide', () => {
    renderWithRouter();
    const link = screen.getByRole('link', {
      name: /create a design brief/i,
    });
    expect(link).toBeInTheDocument();
  });

  it('renders link to deploy guide', () => {
    renderWithRouter();
    const link = screen.getByRole('link', { name: /deploy to brightsign/i });
    expect(link).toBeInTheDocument();
  });

  it('renders note about signage content vs website chrome', () => {
    renderWithRouter();
    expect(
      screen.getByText(
        /this agent produces signage content, not website chrome/i,
      ),
    ).toBeInTheDocument();
  });
});
