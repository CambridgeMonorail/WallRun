import { FC } from 'react';
import { LucideProps } from 'lucide-react';

/**
 * Props for the Footer component.
 */
interface FooterProps {
  /**
   * Array of navigation links to be displayed in the footer.
   * Each link should have a text and a URL.
   */
  navigationLinks: { text: string; url: string }[];

  /**
   * Array of social media icons to be displayed in the footer.
   * Each icon should be a React component and a URL.
   */
  socialMediaIcons: { icon: FC<LucideProps>; url: string; target?: string; rel?: string }[];

  /**
   * Text to be displayed as the copyright information.
   */
  copyrightText: string;

  /**
   * Additional class names to apply to the footer element.
   */
  className?: string;

  /**
   * Background color for the footer.
   */
  backgroundColor?: string;

  /**
   * Text color for the footer.
   */
  textColor?: string;
}

/**
 * Footer component for displaying navigation links, social media icons, and copyright information.
 */
export const Footer: FC<FooterProps> = ({
  navigationLinks,
  socialMediaIcons,
  copyrightText,
  className,
  backgroundColor = 'bg-primary',
  textColor = 'text-primary-foreground'
}) => {
  const isExternalUrl = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  return (
    <footer className={`w-full px-4 pb-10 sm:px-6 lg:px-8 ${className}`}>
      <div className={`demo-panel mx-auto max-w-6xl px-6 py-8 text-center ${backgroundColor} ${textColor}`}>
        <nav className="mb-6 flex flex-wrap justify-center gap-3" aria-label="Footer navigation">
        {navigationLinks.map((link, index) => {
          const isExternal = isExternalUrl(link.url);
          return (
            <a
              key={index}
              href={link.url}
              className="rounded-md border border-white/10 bg-background/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground transition duration-300 hover:border-[hsl(var(--glow-cyan)/0.32)] hover:text-foreground"
              {...(isExternal && {
                target: '_blank',
                rel: 'noopener noreferrer'
              })}
            >
              {link.text}
            </a>
          );
        })}
        </nav>
        <div className="mb-4 flex flex-wrap justify-center gap-4">
        {socialMediaIcons.map((iconData, index) => (
          <a
            key={index}
            href={iconData.url}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-background/20 text-muted-foreground transition duration-300 hover:border-[hsl(var(--glow-violet)/0.32)] hover:text-foreground"
            aria-label={`Link to ${iconData.url}`}
            target={iconData.target}
            rel={iconData.rel}
          >
            <iconData.icon className="w-8 h-8" />
          </a>
        ))}
        </div>
        <p className="text-sm text-muted-foreground sm:text-base">{copyrightText}</p>
      </div>
    </footer>
  );
};
