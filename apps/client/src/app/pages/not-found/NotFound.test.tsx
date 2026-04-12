import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  const renderWithRoute = (route: string) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <NotFound />
      </MemoryRouter>,
    );
  };

  it('renders the missing page heading and recovery actions', () => {
    renderWithRoute('/does-not-exist');

    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to home/i })).toBeVisible();
    expect(
      screen.getByRole('link', { name: /open getting started/i }),
    ).toBeVisible();
  });

  it('shows the attempted route and preserves long paths without truncating the text node', () => {
    const route =
      '/this/is/a/very/long/path/segment/that/should/remain-readable/on/mobile/not-found';

    renderWithRoute(route);

    expect(screen.getByText('Attempted path')).toBeInTheDocument();
    expect(screen.getByText(route)).toBeInTheDocument();
  });
});