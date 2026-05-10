import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoopProgress } from './LoopProgress';

describe('LoopProgress', () => {
  it('renders dwell progress and remaining time', () => {
    render(<LoopProgress elapsedMs={180_000} durationMs={300_000} />);

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '60',
    );
    expect(screen.getByText('Elapsed 3m')).toBeInTheDocument();
    expect(screen.getByText('Remaining 2m')).toBeInTheDocument();
  });

  it('clamps overrun progress to the full duration', () => {
    render(<LoopProgress elapsedMs={999_000} durationMs={120_000} />);

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
    expect(screen.getByText('Remaining 0s')).toBeInTheDocument();
  });
});