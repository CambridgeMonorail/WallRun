import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { DesignBriefPage } from './DesignBrief';

describe('DesignBriefPage', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <DesignBriefPage />
      </BrowserRouter>,
    );
  };

  it('renders the page title', () => {
    renderWithRouter();
    expect(screen.getByText('Create a Design Brief')).toBeInTheDocument();
  });

  it('renders page description', () => {
    renderWithRouter();
    expect(
      screen.getByText(
        /use the signage design brief writer agent to create comprehensive/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders "What the Agent Creates" section', () => {
    renderWithRouter();
    expect(screen.getByText('What the Agent Creates')).toBeInTheDocument();
  });

  it('renders step-by-step guide section', () => {
    renderWithRouter();
    expect(screen.getByText('Step-by-Step Guide')).toBeInTheDocument();
  });

  it('renders all 5 steps', () => {
    renderWithRouter();
    expect(screen.getByText('1. Invoke the Agent')).toBeInTheDocument();
    expect(screen.getByText('2. Provide Your Concept')).toBeInTheDocument();
    expect(screen.getByText('3. Example Prompt')).toBeInTheDocument();
    expect(screen.getByText('4. Review the Output')).toBeInTheDocument();
    expect(
      screen.getByText('5. Next Steps: Implementation'),
    ).toBeInTheDocument();
  });

  it('renders agent invocation example', () => {
    renderWithRouter();
    expect(
      screen.getByText('@Signage Design Brief Writer'),
    ).toBeInTheDocument();
  });

  it('renders example venue name', () => {
    renderWithRouter();
    expect(screen.getByText(/The Green Fork/i)).toBeInTheDocument();
  });

  it('renders tips section', () => {
    renderWithRouter();
    expect(screen.getByText('Tips for Better Briefs')).toBeInTheDocument();
  });

  it('renders brief components description', () => {
    renderWithRouter();
    expect(screen.getByText('Each Brief Includes')).toBeInTheDocument();
    expect(screen.getByText(/aesthetic, tone, mood/i)).toBeInTheDocument();
    expect(screen.getByText(/screen specs, zones/i)).toBeInTheDocument();
  });

  it('renders link to build signage guide', () => {
    renderWithRouter();
    const link = screen.getByRole('link', {
      name: /build a signage screen/i,
    });
    expect(link).toBeInTheDocument();
  });
});
