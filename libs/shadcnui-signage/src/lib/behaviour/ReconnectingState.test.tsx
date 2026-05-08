import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ReconnectingState } from './ReconnectingState';

describe('ReconnectingState', () => {
  it('renders nothing when inactive', () => {
    const { container } = render(<ReconnectingState active={false} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders a panel when active', () => {
    render(<ReconnectingState active={true} />);

    expect(screen.getByTestId('reconnecting-state')).toHaveAttribute(
      'data-variant',
      'panel',
    );
  });

  it('supports the inline variant with last live metadata', () => {
    render(
      <ReconnectingState
        active={true}
        variant="inline"
        lastConnectedAt="2026-05-07T09:55:00.000Z"
        now={() => new Date('2026-05-07T10:00:00.000Z').getTime()}
      />,
    );

    expect(screen.getByTestId('reconnecting-state')).toHaveAttribute(
      'data-variant',
      'inline',
    );
    expect(screen.getByTestId('reconnecting-state')).toHaveTextContent(
      'Last live 5m ago',
    );
  });

  it('omits last live metadata when lastConnectedAt cannot be parsed', () => {
    render(
      <ReconnectingState
        active={true}
        variant="inline"
        lastConnectedAt="not-a-date"
      />,
    );

    expect(screen.getByTestId('reconnecting-state')).not.toHaveTextContent(
      'Last live',
    );
    expect(screen.getByTestId('reconnecting-state')).not.toHaveTextContent(
      'NaN',
    );
  });
});