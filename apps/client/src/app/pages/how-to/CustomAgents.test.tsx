import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { CustomAgentsPage } from './CustomAgents';

describe('CustomAgentsPage', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <CustomAgentsPage />
      </BrowserRouter>,
    );
  };

  it('renders the page title', () => {
    renderWithRouter();
    expect(screen.getByText('Using Custom Agents')).toBeInTheDocument();
  });

  it('renders page description', () => {
    renderWithRouter();
    expect(
      screen.getByText(/learn how to use custom github copilot agents/i),
    ).toBeInTheDocument();
  });

  it('renders "What Are Custom Agents?" section', () => {
    renderWithRouter();
    expect(screen.getByText('What Are Custom Agents?')).toBeInTheDocument();
  });

  it('renders invocation instructions section', () => {
    renderWithRouter();
    expect(screen.getByText('How to Invoke an Agent')).toBeInTheDocument();
  });

  it('renders available agents section', () => {
    renderWithRouter();
    expect(screen.getByText('Available Agents')).toBeInTheDocument();
  });

  it('renders agent categories', () => {
    renderWithRouter();
    expect(
      screen.getByText('Signage Design & Implementation'),
    ).toBeInTheDocument();
    expect(screen.getByText('Deployment & Hardware')).toBeInTheDocument();
    expect(screen.getByText('Developer Tools')).toBeInTheDocument();
  });

  it('renders specific agent names', () => {
    renderWithRouter();
    expect(screen.getByText('BrightSign Deploy')).toBeInTheDocument();
    expect(screen.getByText('UI Design Reviewer')).toBeInTheDocument();
  });

  it('renders best practices section', () => {
    renderWithRouter();
    expect(screen.getByText('Best Practices')).toBeInTheDocument();
  });

  it('renders example invocation code', () => {
    renderWithRouter();
    expect(
      screen.getByText(/@Agent Name \[your request here\]/),
    ).toBeInTheDocument();
  });

  it('renders links to related guides', () => {
    renderWithRouter();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
