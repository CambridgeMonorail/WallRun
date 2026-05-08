import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QRCodeCallout } from './QRCodeCallout';

describe('QRCodeCallout', () => {
  it('renders a QR SVG with visible destination context', () => {
    const { container } = render(
      <QRCodeCallout value="https://wallrun.dev/app" label="Conference app" />,
    );

    expect(screen.getByText('Conference app')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the short URL fallback when provided', () => {
    render(
      <QRCodeCallout
        value="https://wallrun.dev/check-in"
        label="Check-in"
        shortUrl="wallrun.dev/check-in"
      />,
    );

    expect(screen.getByText('wallrun.dev/check-in')).toBeInTheDocument();
  });
});
