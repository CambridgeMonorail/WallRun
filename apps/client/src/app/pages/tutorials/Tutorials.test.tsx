import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { TutorialsPage } from './Tutorials';

describe('TutorialsPage', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <TutorialsPage />
      </BrowserRouter>,
    );
  };

  it('renders the tutorials page title', () => {
    renderWithRouter();
    expect(
      screen.getByText('Build Signage Like a Project'),
    ).toBeInTheDocument();
  });

  it('links to the restaurant signage tutorial', () => {
    renderWithRouter();
    const link = screen.getByRole('link', {
      name: /restaurant digital signage from scratch/i,
    });

    expect(link).toHaveAttribute(
      'href',
      '/tutorials/restaurant-digital-signage',
    );
  });

  it('explains the tutorial format', () => {
    renderWithRouter();
    expect(screen.getByText('Tutorial Format')).toBeInTheDocument();
    expect(screen.getByText('Start with context')).toBeInTheDocument();
    expect(screen.getByText('Model the content')).toBeInTheDocument();
    expect(screen.getByText('Finish with checks')).toBeInTheDocument();
  });
});
