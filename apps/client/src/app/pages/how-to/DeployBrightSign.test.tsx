import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { DeployBrightSignPage } from './DeployBrightSign';

describe('DeployBrightSignPage', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <DeployBrightSignPage />
      </BrowserRouter>,
    );
  };

  it('renders the page title', () => {
    renderWithRouter();
    expect(
      screen.getByText('Deploy to BrightSign Players'),
    ).toBeInTheDocument();
  });

  it('renders page description', () => {
    renderWithRouter();
    expect(
      screen.getByText(
        /use the brightsign deploy agent to package and deploy react apps/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders "What the Agent Does" section', () => {
    renderWithRouter();
    expect(screen.getByText('What the Agent Does')).toBeInTheDocument();
  });

  it('renders agent capabilities', () => {
    renderWithRouter();
    expect(screen.getByText('Capabilities')).toBeInTheDocument();
    expect(
      screen.getByText(/build optimized iife bundles/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/push builds to players/i)).toBeInTheDocument();
  });

  it('renders prerequisites section', () => {
    renderWithRouter();
    expect(screen.getByText('Prerequisites')).toBeInTheDocument();
  });

  it('renders quick deploy workflow section', () => {
    renderWithRouter();
    expect(screen.getByText('Quick Deploy Workflow')).toBeInTheDocument();
  });

  it('renders all 5 workflow steps', () => {
    renderWithRouter();
    expect(screen.getByText('1. Find Your Player')).toBeInTheDocument();
    expect(screen.getByText('2. Use the Agent to Deploy')).toBeInTheDocument();
    expect(screen.getByText('3. Agent Handles Packaging')).toBeInTheDocument();
    expect(screen.getByText('4. Upload to Player')).toBeInTheDocument();
    expect(screen.getByText('5. Verify on Player')).toBeInTheDocument();
  });

  it('renders debugging section', () => {
    renderWithRouter();
    expect(screen.getByText('Debugging Player Issues')).toBeInTheDocument();
  });

  it('renders common issues section', () => {
    renderWithRouter();
    expect(screen.getByText('Common Issues')).toBeInTheDocument();
  });

  it('renders common issue examples', () => {
    renderWithRouter();
    expect(screen.getByText('Blank Screen After Deploy')).toBeInTheDocument();
    expect(screen.getByText('Player Not Found')).toBeInTheDocument();
    expect(screen.getByText('Upload Fails')).toBeInTheDocument();
    expect(screen.getByText("Media Won't Autoplay")).toBeInTheDocument();
  });

  it('renders manual deployment section', () => {
    renderWithRouter();
    expect(screen.getByText('Advanced: Manual Deployment')).toBeInTheDocument();
  });

  it('renders pnpm commands', () => {
    renderWithRouter();
    const commands = screen.getAllByText('pnpm discover');
    expect(commands.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/pnpm package:player player-minimal/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/pnpm deploy:local player-minimal/),
    ).toBeInTheDocument();
  });

  it('renders agent invocation example', () => {
    renderWithRouter();
    const examples = screen.getAllByText(/@BrightSign Deploy/);
    expect(examples.length).toBeGreaterThan(0);
  });
});
