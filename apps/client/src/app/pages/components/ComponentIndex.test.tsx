import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { ComponentIndexPage } from './ComponentIndex';

describe('ComponentIndexPage', () => {
  const renderWithRouter = (initialEntries = ['/components']) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <ComponentIndexPage />
      </MemoryRouter>,
    );
  };

  it('lists the new issue 98 docs entries in the browsable catalog', () => {
    renderWithRouter();

    expect(
      screen.getByRole('link', { name: /OneMessageFrame/i }),
    ).toHaveAttribute('href', '/components/blocks/one-message-frame');
    expect(
      screen.getByRole('link', { name: /NoContentFallback/i }),
    ).toHaveAttribute('href', '/components/behaviour/no-content-fallback');
    expect(
      screen.getByRole('link', { name: /ContentExpiredWarning/i }),
    ).toHaveAttribute('href', '/components/behaviour/content-expired-warning');
    expect(
      screen.getByRole('link', { name: /LastUpdatedStamp/i }),
    ).toHaveAttribute('href', '/components/behaviour/last-updated-stamp');
    expect(
      screen.getByRole('link', { name: /ReconnectingState/i }),
    ).toHaveAttribute('href', '/components/behaviour/reconnecting-state');
  });

  it('renders search and browse-by-use-case controls', () => {
    renderWithRouter();

    expect(
      screen.getByRole('searchbox', { name: /search components/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /browse by use case/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('use-case-card-menu-boards'),
    ).toBeInTheDocument();
  });

  it('filters the catalog from the useCase query param', () => {
    renderWithRouter(['/components?useCase=Alerts']);

    expect(
      screen.getByText(/showing 13 matching components\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /OfflineFallback/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /MenuItem/i }),
    ).not.toBeInTheDocument();
  });

  it('filters the catalog from the text query param', () => {
    renderWithRouter(['/components?q=offline']);

    expect(
      screen.getByRole('link', { name: /OfflineFallback/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /Clock/i }),
    ).not.toBeInTheDocument();
  });
});