import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PlaylistTimeline } from './PlaylistTimeline';

describe('PlaylistTimeline', () => {
  it('annotates active, next, future, and expired items from timing metadata', () => {
    render(
      <PlaylistTimeline
        now={() => new Date('2026-05-10T10:03:00.000Z').getTime()}
        locale="en-GB"
        timeZone="UTC"
        items={[
          {
            id: 'expired',
            label: 'Breakfast loop',
            startsAt: '2026-05-10T09:00:00.000Z',
            durationMs: 30 * 60_000,
          },
          {
            id: 'active',
            label: 'Lunch promo',
            startsAt: '2026-05-10T10:00:00.000Z',
            durationMs: 10 * 60_000,
          },
          {
            id: 'next',
            label: 'Service alert',
            startsAt: '2026-05-10T10:10:00.000Z',
            durationMs: 5 * 60_000,
            priority: 'priority',
          },
          {
            id: 'future',
            label: 'Evening playlist',
            startsAt: '2026-05-10T10:20:00.000Z',
            durationMs: 15 * 60_000,
          },
        ]}
      />,
    );

    expect(screen.getByTestId('playlist-item-expired')).toHaveAttribute(
      'data-state',
      'expired',
    );
    expect(screen.getByTestId('playlist-item-active')).toHaveAttribute(
      'data-state',
      'active',
    );
    expect(screen.getByTestId('playlist-item-next')).toHaveAttribute(
      'data-state',
      'next',
    );
    expect(screen.getByTestId('playlist-item-next')).toHaveAttribute(
      'data-priority',
      'priority',
    );
    expect(screen.getByTestId('playlist-item-future')).toHaveAttribute(
      'data-state',
      'future',
    );
  });
});