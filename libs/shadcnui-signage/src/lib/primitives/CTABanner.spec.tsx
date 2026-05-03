import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Smartphone } from 'lucide-react';
import { CTABanner } from './CTABanner';

describe('CTABanner', () => {
  it('renders the message text', () => {
    render(<CTABanner message="Download the mobile app" />);

    expect(screen.getByText('Download the mobile app')).toBeInTheDocument();
  });

  it('renders an icon when provided', () => {
    const { container } = render(
      <CTABanner message="Get event updates" icon={Smartphone} />,
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the action link when provided', () => {
    render(
      <CTABanner
        message="Open the support site"
        action={{ label: 'Support', href: 'https://wallrun.dev/support' }}
      />,
    );

    expect(screen.getByRole('link', { name: 'Support' })).toHaveAttribute(
      'href',
      'https://wallrun.dev/support',
    );
  });

  it('applies the requested variant through a stable data attribute', () => {
    render(<CTABanner message="Priority updates" variant="gradient" />);

    expect(screen.getByTestId('cta-banner')).toHaveAttribute(
      'data-variant',
      'gradient',
    );
  });

  it('keeps distance-readable text sizing classes on the message', () => {
    render(<CTABanner message="Reception assistance available" />);

    expect(screen.getByText('Reception assistance available')).toHaveClass(
      'text-base',
      'sm:text-lg',
      'lg:text-2xl',
    );
  });
});