import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { HowToPage } from './HowTo';

describe('HowToPage', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <HowToPage />
      </BrowserRouter>,
    );
  };

  it('renders the page title', () => {
    renderWithRouter();
    expect(screen.getByText('How To Guides')).toBeInTheDocument();
  });

  it('renders page description', () => {
    renderWithRouter();
    expect(
      screen.getByText(/practical step-by-step guides/i),
    ).toBeInTheDocument();
  });

  it('renders workflow section heading', () => {
    renderWithRouter();
    expect(screen.getByText('Complete Workflow')).toBeInTheDocument();
  });

  it('renders tools section heading', () => {
    renderWithRouter();
    expect(screen.getByText('Tools & Concepts')).toBeInTheDocument();
  });

  it('renders workflow guides', () => {
    renderWithRouter();
    expect(screen.getByText('Create a Design Brief')).toBeInTheDocument();
    expect(screen.getByText('Build a Signage Screen')).toBeInTheDocument();
    expect(
      screen.getByText('Deploy to BrightSign Players'),
    ).toBeInTheDocument();
  });

  it('renders tools guides', () => {
    renderWithRouter();
    expect(screen.getByText('Using Custom Agents')).toBeInTheDocument();
  });

  it('renders guide descriptions', () => {
    renderWithRouter();
    expect(
      screen.getByText(/create comprehensive markdown design briefs/i),
    ).toBeInTheDocument();
  });

  it('renders links to sub-guides', () => {
    renderWithRouter();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders more resources section', () => {
    renderWithRouter();
    expect(screen.getByText('More Resources')).toBeInTheDocument();
  });
});
