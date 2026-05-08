import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Smartphone } from 'lucide-react';
import { ActionStrip } from './ActionStrip';

describe('ActionStrip', () => {
  it('renders the CTA message', () => {
    render(
      <ActionStrip message="Continue on your phone for full event details" />,
    );

    expect(
      screen.getByText('Continue on your phone for full event details'),
    ).toBeInTheDocument();
  });

  it('renders a leading visual and action when provided', () => {
    render(
      <ActionStrip
        message="Scan for tickets"
        leadingVisual={<Smartphone aria-hidden="true" />}
        action={<a href="https://wallrun.dev/tickets">Open tickets</a>}
      />,
    );

    expect(
      screen.getByTestId('action-strip-leading-visual'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open tickets' })).toHaveAttribute(
      'href',
      'https://wallrun.dev/tickets',
    );
  });

  it('exposes stable data attributes for tone and position', () => {
    render(
      <ActionStrip
        message="Queue is moving to the overflow entrance"
        position="right"
        tone="urgent"
      />,
    );

    expect(screen.getByTestId('action-strip')).toHaveAttribute(
      'data-position',
      'right',
    );
    expect(screen.getByTestId('action-strip')).toHaveAttribute(
      'data-tone',
      'urgent',
    );
    expect(
      screen.getByText('Queue is moving to the overflow entrance'),
    ).toHaveClass('text-right');
  });
});
