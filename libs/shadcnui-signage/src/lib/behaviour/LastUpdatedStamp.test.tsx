import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LastUpdatedStamp } from './LastUpdatedStamp';

describe('LastUpdatedStamp', () => {
  it('renders a relative freshness label', () => {
    render(
      <LastUpdatedStamp
        updatedAt="2026-05-07T09:55:00.000Z"
        now={() => new Date('2026-05-07T10:00:00.000Z').getTime()}
      />,
    );

    expect(screen.getByTestId('last-updated-stamp')).toHaveTextContent(
      'Last updated 5m ago',
    );
  });

  it('marks stale data explicitly in text and attributes', () => {
    render(
      <LastUpdatedStamp
        updatedAt="2026-05-07T08:00:00.000Z"
        staleAfterMs={15 * 60_000}
        now={() => new Date('2026-05-07T10:00:00.000Z').getTime()}
      />,
    );

    expect(screen.getByTestId('last-updated-stamp')).toHaveAttribute(
      'data-stale',
      'true',
    );
    expect(screen.getByTestId('last-updated-stamp')).toHaveTextContent('stale');
  });

  it('supports deterministic absolute formatting', () => {
    render(
      <LastUpdatedStamp
        updatedAt="2026-05-07T10:00:00.000Z"
        format="absolute"
        locale="en-US"
        timeZone="UTC"
      />,
    );

    expect(screen.getByTestId('last-updated-stamp')).toHaveTextContent(
      'Last updated May 7, 10:00 AM',
    );
  });
});