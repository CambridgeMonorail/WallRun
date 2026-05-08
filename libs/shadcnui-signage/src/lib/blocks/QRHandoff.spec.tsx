import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QRHandoff } from './QRHandoff';

describe('QRHandoff', () => {
  it('renders the title, description, and QR destination details', () => {
    render(
      <QRHandoff
        title="Take the schedule with you"
        description="Scan to continue on your phone with personal reminders and room changes."
        qrValue="https://wallrun.dev/app"
        qrLabel="Conference app"
        shortUrl="wallrun.dev/app"
      />,
    );

    expect(screen.getByText('Take the schedule with you')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Scan to continue on your phone with personal reminders and room changes.',
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Conference app')).toHaveLength(2);
  });
});
