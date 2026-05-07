import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContentExpiredWarning } from './ContentExpiredWarning';

describe('ContentExpiredWarning', () => {
  it('renders nothing when the content has not yet expired', () => {
    const { container } = render(
      <ContentExpiredWarning
        expiredAt="2026-05-07T11:00:00.000Z"
        now={() => new Date('2026-05-07T10:00:00.000Z').getTime()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders a badge when content is expired', () => {
    render(
      <ContentExpiredWarning
        expiredAt="2026-05-07T09:45:00.000Z"
        now={() => new Date('2026-05-07T10:00:00.000Z').getTime()}
      />,
    );

    expect(screen.getByTestId('content-expired-warning')).toHaveAttribute(
      'data-variant',
      'badge',
    );
    expect(screen.getByTestId('content-expired-warning')).toHaveTextContent(
      'expired 15m ago',
    );
  });

  it('supports panel and overlay variants', () => {
    const { rerender } = render(
      <ContentExpiredWarning
        expiredAt="2026-05-07T09:00:00.000Z"
        variant="panel"
        now={() => new Date('2026-05-07T10:00:00.000Z').getTime()}
      />,
    );

    expect(screen.getByTestId('content-expired-warning')).toHaveAttribute(
      'data-variant',
      'panel',
    );

    rerender(
      <ContentExpiredWarning
        expiredAt="2026-05-07T09:00:00.000Z"
        variant="overlay"
        now={() => new Date('2026-05-07T10:00:00.000Z').getTime()}
      />,
    );

    expect(screen.getByTestId('content-expired-warning')).toHaveAttribute(
      'data-variant',
      'overlay',
    );
  });
});