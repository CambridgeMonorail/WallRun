import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WaitingRoomBoard } from './WaitingRoomBoard';

describe('WaitingRoomBoard', () => {
  it('renders the dominant waiting message with reassurance and updates', () => {
    render(
      <WaitingRoomBoard
        eyebrow="Clinic waiting room"
        title="Please remain seated until your name appears"
        message="Staff will call each patient directly when the next clinician is ready."
        reassurance="If your appointment time has passed, stay seated and staff will update you shortly."
        estimatedWait="12 min"
        waitDetail="Triage is currently running slightly behind schedule."
        updates={[
          { message: 'Forms are available at the reception desk.' },
          {
            message: 'Paediatric appointments are checking in at Window 2.',
            tone: 'brand',
          },
        ]}
      />,
    );

    expect(
      screen.getByRole('heading', {
        name: 'Please remain seated until your name appears',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Clinic waiting room')).toBeInTheDocument();
    expect(
      screen.getByTestId('waiting-room-estimated-wait'),
    ).toBeInTheDocument();
    expect(screen.getByText('12 min')).toBeInTheDocument();
    expect(screen.getByTestId('waiting-room-reassurance')).toBeInTheDocument();
    expect(screen.getByTestId('waiting-room-updates')).toBeInTheDocument();
    expect(
      screen.getByText('Forms are available at the reception desk.'),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('qr-handoff')).not.toBeInTheDocument();
  });

  it('renders an optional QR continuation without requiring updates', () => {
    render(
      <WaitingRoomBoard
        title="Your order is in preparation"
        message="Please remain in the collection area and watch for your order number."
        qrHandoff={{
          title: 'Track progress on your phone',
          description:
            'Scan to see order status, allergens, and collection guidance without leaving your seat.',
          qrValue: 'https://wallrun.dev/order-status',
          qrLabel: 'Order status',
          shortUrl: 'wallrun.dev/order-status',
        }}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Your order is in preparation' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('qr-handoff')).toBeInTheDocument();
    expect(
      screen.getByText('Track progress on your phone'),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('waiting-room-updates'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('waiting-room-estimated-wait'),
    ).not.toBeInTheDocument();
  });
});
