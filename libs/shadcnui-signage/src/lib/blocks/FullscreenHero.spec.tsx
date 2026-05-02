import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FullscreenHero } from './FullscreenHero';

describe('FullscreenHero', () => {
  it('should render title', () => {
    render(<FullscreenHero title="Welcome" />);

    expect(screen.getByTestId('hero-title')).toHaveTextContent('Welcome');
  });

  it('should render subtitle when provided', () => {
    render(<FullscreenHero title="Welcome" subtitle="Join us today" />);

    expect(screen.getByTestId('hero-subtitle')).toHaveTextContent(
      'Join us today',
    );
  });

  it('should not render subtitle when not provided', () => {
    render(<FullscreenHero title="Welcome" />);

    expect(screen.queryByTestId('hero-subtitle')).not.toBeInTheDocument();
  });

  it('should render body when provided', () => {
    render(<FullscreenHero title="Welcome" body="This is the body text" />);

    expect(screen.getByTestId('hero-body')).toHaveTextContent(
      'This is the body text',
    );
  });

  it('should not render body when not provided', () => {
    render(<FullscreenHero title="Welcome" />);

    expect(screen.queryByTestId('hero-body')).not.toBeInTheDocument();
  });

  it('should render CTA when provided', () => {
    render(
      <FullscreenHero
        title="Welcome"
        cta={{ label: 'Get Started', hint: 'Click to begin' }}
      />,
    );

    const cta = screen.getByTestId('hero-cta');
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveTextContent('Get Started');
    expect(cta).toHaveTextContent('Click to begin');
  });

  it('should render CTA without hint', () => {
    render(<FullscreenHero title="Welcome" cta={{ label: 'Get Started' }} />);

    const cta = screen.getByTestId('hero-cta');
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveTextContent('Get Started');
  });

  it('should not render CTA when not provided', () => {
    render(<FullscreenHero title="Welcome" />);

    expect(screen.queryByTestId('hero-cta')).not.toBeInTheDocument();
  });

  it('should apply light variant by default', () => {
    render(<FullscreenHero title="Welcome" />);

    const hero = screen.getByTestId('fullscreen-hero');
    expect(hero).toHaveAttribute('data-variant', 'light');
    expect(hero).toHaveClass('bg-white', 'text-slate-900');
  });

  it('should apply dark variant when specified', () => {
    render(<FullscreenHero title="Welcome" variant="dark" />);

    const hero = screen.getByTestId('fullscreen-hero');
    expect(hero).toHaveAttribute('data-variant', 'dark');
    expect(hero).toHaveClass('bg-slate-900', 'text-white');
  });

  it('should apply text clamping classes', () => {
    render(
      <FullscreenHero title="Title" subtitle="Subtitle" body="Body text" />,
    );

    expect(screen.getByTestId('hero-title')).toHaveClass('line-clamp-2');
    expect(screen.getByTestId('hero-subtitle')).toHaveClass('line-clamp-2');
    expect(screen.getByTestId('hero-body')).toHaveClass('line-clamp-4');
  });

  it('should render logo when provided', () => {
    render(
      <FullscreenHero
        title="Welcome"
        logo={<img src="/logo.png" alt="Logo" data-testid="hero-logo" />}
      />,
    );

    expect(screen.getByTestId('hero-logo')).toBeInTheDocument();
  });

  it('should not render logo when not provided', () => {
    render(<FullscreenHero title="Welcome" />);

    expect(screen.queryByTestId('hero-logo')).not.toBeInTheDocument();
  });

  it('should render decoration when provided', () => {
    render(
      <FullscreenHero
        title="Welcome"
        decoration={<div data-testid="custom-decoration">Divider</div>}
      />,
    );

    expect(screen.getByTestId('hero-decoration')).toBeInTheDocument();
    expect(screen.getByTestId('custom-decoration')).toHaveTextContent(
      'Divider',
    );
  });

  it('should apply background image when provided', () => {
    render(<FullscreenHero title="Welcome" backgroundImageUrl="/hero.jpg" />);

    const hero = screen.getByTestId('fullscreen-hero');
    expect(hero).toHaveStyle({ backgroundImage: 'url(/hero.jpg)' });
  });

  it('should render overlay when background image is present', () => {
    const { container } = render(
      <FullscreenHero title="Welcome" backgroundImageUrl="/hero.jpg" />,
    );

    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
  });

  it('should not render overlay when no background image', () => {
    const { container } = render(<FullscreenHero title="Welcome" />);

    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<FullscreenHero title="Welcome" className="custom-hero" />);

    const hero = screen.getByTestId('fullscreen-hero');
    expect(hero).toHaveClass('custom-hero');
  });

  it('should apply content and text className overrides', () => {
    render(
      <FullscreenHero
        title="Welcome"
        subtitle="Hello"
        body="Body"
        contentClassName="custom-content"
        titleClassName="custom-title"
        subtitleClassName="custom-subtitle"
        bodyClassName="custom-body"
      />,
    );

    expect(screen.getByText('Welcome').parentElement).toHaveClass(
      'custom-content',
    );
    expect(screen.getByTestId('hero-title')).toHaveClass('custom-title');
    expect(screen.getByTestId('hero-subtitle')).toHaveClass('custom-subtitle');
    expect(screen.getByTestId('hero-body')).toHaveClass('custom-body');
  });

  it('should have proper heading hierarchy', () => {
    render(<FullscreenHero title="Main Title" subtitle="Subtitle Text" />);

    const title = screen.getByTestId('hero-title');
    const subtitle = screen.getByTestId('hero-subtitle');

    expect(title.tagName).toBe('H1');
    expect(subtitle.tagName).toBe('H2');
  });
});
