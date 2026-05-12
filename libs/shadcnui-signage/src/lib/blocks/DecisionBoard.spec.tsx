import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DecisionBoard } from './DecisionBoard';

describe('DecisionBoard', () => {
  it('renders a dominant prompt with a bounded choice set', () => {
    render(
      <DecisionBoard
        eyebrow="Lobby routing"
        title="Choose the service you need"
        message="Follow the option that matches your appointment, enquiry, or document request."
        serviceNote="If you already have a ticket number, keep it visible and proceed only when called."
        options={[
          {
            eyebrow: 'Appointments',
            title: 'Check in at Desk A',
            description:
              'For booked visits, pre-arranged collections, and clinician referrals.',
            cue: 'Blue counter',
            tone: 'brand',
          },
          {
            eyebrow: 'General enquiries',
            title: 'Speak to Reception',
            description:
              'For walk-in questions, visitor badges, and documentation support.',
            cue: 'Main foyer',
          },
        ]}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Choose the service you need' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Lobby routing')).toBeInTheDocument();
    expect(
      screen.getByTestId('decision-board-service-note'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('decision-board-options')).toBeInTheDocument();
    expect(screen.getByText('Check in at Desk A')).toBeInTheDocument();
    expect(screen.getByText('Speak to Reception')).toBeInTheDocument();
    expect(screen.getByText('Blue counter')).toBeInTheDocument();
    expect(screen.queryByTestId('qr-handoff')).not.toBeInTheDocument();
  });

  it('renders an optional QR continuation alongside the visible choices', () => {
    render(
      <DecisionBoard
        title="Choose how to continue"
        options={[
          {
            title: 'Join the staffed queue',
            description: 'Speak to the front-desk team for in-person support.',
          },
          {
            title: 'Continue on your phone',
            description: 'Scan below for private forms and live wayfinding.',
            cue: 'Fastest route',
            tone: 'brand',
          },
        ]}
        qrHandoff={{
          title: 'Open the self-service flow',
          description:
            'Scan to complete forms, receive queue updates, and carry the next steps with you.',
          qrValue: 'https://wallrun.dev/self-service',
          qrLabel: 'Self-service flow',
          shortUrl: 'wallrun.dev/self-service',
        }}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Choose how to continue' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('qr-handoff')).toBeInTheDocument();
    expect(screen.getByText('Open the self-service flow')).toBeInTheDocument();

    expect(
      within(screen.getByTestId('decision-board-option-1')).getByText(
        'Continue on your phone',
      ),
    ).toBeInTheDocument();
  });
});
