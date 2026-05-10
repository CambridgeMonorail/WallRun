import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PriorityTakeover } from './PriorityTakeover';

describe('PriorityTakeover', () => {
  it('renders fallback content when inactive', () => {
    render(
      <PriorityTakeover
        active={false}
        title="Storm warning"
        message="Please move indoors."
        fallback={<div>Normal playlist</div>}
      />,
    );

    expect(screen.getByText('Normal playlist')).toBeInTheDocument();
    expect(screen.queryByTestId('priority-takeover')).not.toBeInTheDocument();
  });

  it('renders takeover content when active', () => {
    render(
      <PriorityTakeover
        active={true}
        title="Emergency closure"
        message="South entrance is closed. Use the north doors."
        activeUntil="2026-05-10T10:15:00.000Z"
        locale="en-GB"
        timeZone="UTC"
      />,
    );

    expect(screen.getByRole('alert')).toHaveAttribute(
      'aria-atomic',
      'true',
    );
    expect(screen.getByTestId('priority-takeover')).toHaveAttribute(
      'data-priority',
      'takeover',
    );
    expect(screen.getByText(/Active until 10:15/i)).toBeInTheDocument();
  });
});