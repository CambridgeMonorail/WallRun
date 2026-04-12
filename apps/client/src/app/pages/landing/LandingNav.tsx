import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';
import { Button } from '@wallrun/shadcnui';

type NavLink = {
  label: string;
  to: string;
  external?: boolean;
};

const navLinks: NavLink[] = [
  { label: 'Get Started', to: '/getting-started' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Tooling', to: '/tooling' },
  { label: 'Library', to: '/library' },
];

/**
 * Minimal sticky navigation header for the landing page.
 * Shows inline links on desktop and a hamburger menu on mobile.
 */
export const LandingNav: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/60 backdrop-blur-lg"
      data-testid="landing-nav"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / home link */}
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium tracking-wide text-foreground"
          aria-label="WallRun home"
        >
          WallRun
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/CambridgeMonorail/WallRun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub repository"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="landing-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-testid="landing-nav-toggle"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          id="landing-mobile-menu"
          className="border-t border-border/60 bg-background/95 backdrop-blur-lg md:hidden"
          data-testid="landing-mobile-menu"
        >
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/CambridgeMonorail/WallRun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
