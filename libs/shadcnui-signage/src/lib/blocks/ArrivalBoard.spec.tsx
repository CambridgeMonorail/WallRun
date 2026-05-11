import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArrivalBoard } from './ArrivalBoard';

describe('ArrivalBoard', () => {
  it('renders a dominant arrival message with one next step', () => {
    render(
      <ArrivalBoard
        eyebrow="Visitor reception"
        title="Check in at Desk 3 before entering the atrium"
        message="Staff will issue your badge and direct you to the correct floor."
        nextStep="Follow the illuminated floor markers"
        serviceNote="Speak to the concierge if you need step-free access."
      />,
    );

    expect(
      screen.getByRole('heading', {
        name: 'Check in at Desk 3 before entering the atrium',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Visitor reception')).toBeInTheDocument();
    expect(
      screen.getByText('Follow the illuminated floor markers'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Speak to the concierge if you need step-free access.'),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('qr-handoff')).not.toBeInTheDocument();
  });

  it('renders an optional QR continuation without displacing the main message', () => {
    render(
      <ArrivalBoard
        title="Welcome to WallRun Summit 2026"
        nextStep="Registration opens at 08:30"
        qrHandoff={{
          title: 'Finish arrival on your phone',
          description:
            'Scan for your personal agenda, live room changes, and venue navigation.',
          qrValue: 'https://wallrun.dev/summit',
          qrLabel: 'Summit companion app',
          shortUrl: 'wallrun.dev/summit',
        }}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Welcome to WallRun Summit 2026' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('qr-handoff')).toBeInTheDocument();
    expect(
      screen.getByText('Finish arrival on your phone'),
    ).toBeInTheDocument();
    expect(screen.getByText('wallrun.dev/summit')).toBeInTheDocument();
  });
});
