import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Github,
  Twitter,
  Rocket,
  Palette,
  Paintbrush,
  BarChart,
  ChartLine,
  Video,
} from 'lucide-react';

import logoSrc from '../../../assets/images/new-logo.svg';

import {
  AboutSection,
  CTASection,
  FeaturesSection,
  Footer,
  StepsSection,
  HeroSection,
} from '@wallrun/landing';
import { Logo, Tagline } from '@wallrun/shadcnui-blocks';

export const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative isolate flex min-h-screen w-full flex-col items-center overflow-hidden bg-transparent text-foreground"
      data-testid="landing-page"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_20%_18%,hsl(var(--glow-violet)/0.16),transparent_34%),radial-gradient(circle_at_78%_12%,hsl(var(--glow-cyan)/0.14),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 demo-grid opacity-60" />
      <div className="w-full" data-testid="hero-section-container">
        <HeroSection
          title="Digital Signage as Software"
          subtitle="An open source, developer-first workspace for building deterministic signage systems with modern web technologies."
          description="Treat signage players as programmable systems. Clone the repo, inspect the code, adapt the components, and deploy real fixed-aspect layouts to BrightSign devices and beyond."
          highlights={[
            'Deterministic screen composition',
            'Nx-native player app scaffolding',
            'Registry-native component installs',
            'BrightSign-ready delivery workflows',
          ]}
          image={logoSrc}
          imageAlt="WallRun logo"
          ctaPrimary={{
            text: 'Get Started',
            onClick: () => navigate('/getting-started'),
          }}
          ctaSecondary={{
            text: 'View Examples',
            onClick: () => navigate('/gallery'),
          }}
          layout="left"
          data-testid="hero-section"
          variant="dark"
        />
      </div>
      <AboutSection
        title="Why WallRun?"
        description="WallRun is an open source working notebook for building signage software, not a CMS or a product funnel. It's a component library, tooling reference, and living documentation for developers treating digital signage as programmable systems."
        logos={[
          <Logo
            name="nx"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="nx"
            title="Nx"
            ariaLabel="Nx"
          />,
          <Logo
            name="tailwind"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="tailwind"
            title="Tailwind CSS"
            ariaLabel="Tailwind CSS"
          />,
          <Logo
            name="shadcn"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="shadcn"
            title="Shadcn"
            ariaLabel="Shadcn"
          />,
          <Logo
            name="pnpm"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="pnpm"
            title="Pnpm"
            ariaLabel="Pnpm"
          />,
          <Logo
            name="react"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="react"
            title="React"
            ariaLabel="React"
          />,
          <Logo
            name="vite"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="vite"
            title="Vite"
            ariaLabel="Vite"
          />,
        ]}
        header="Modern Frontend Tools"
        subheader="Applied to always-on displays"
        data-testid="about-section"
      />
      <FeaturesSection
        title="Signage-Specific Features"
        features={[
          {
            title: 'Fixed-Aspect Layouts',
            description:
              'Deterministic rendering for known resolutions. No responsive breakpoints—just predictable, fixed layouts designed for specific screen sizes.',
            icon: <BarChart className="text-[hsl(var(--glow-cyan))]" />,
            className: 'hover:border-[hsl(var(--glow-cyan)/0.28)]',
          },
          {
            title: 'Distance-Readable Typography',
            description:
              'Typography optimized for viewing from across the room. Large text, high contrast, clear hierarchy for quick scanning.',
            icon: <Paintbrush className="text-[hsl(var(--glow-amber))]" />,
            className: 'hover:border-[hsl(var(--glow-amber)/0.28)]',
          },
          {
            title: 'Signage Components',
            description:
              'Purpose-built React components: ScreenFrame, SplitScreen, FullscreenHero, InfoCardGrid—primitives, layouts, and blocks for signage screens.',
            icon: <Palette className="text-[hsl(var(--glow-violet))]" />,
            className: 'hover:border-[hsl(var(--glow-violet)/0.28)]',
          },
          {
            title: 'BrightSign-Focused',
            description:
              'Designed with BrightSign devices in mind. Real-world constraints, hardware quirks, and platform-specific considerations baked in.',
            icon: <Video className="text-[hsl(var(--glow-amber))]" />,
            className: 'hover:border-[hsl(var(--glow-amber)/0.28)]',
          },
          {
            title: 'Offline-First',
            description:
              'Built for always-on, unattended operation. Signage screens run 24/7 without supervision, often offline or with limited connectivity.',
            icon: <Rocket className="text-[hsl(var(--glow-violet))]" />,
            className: 'hover:border-[hsl(var(--glow-violet)/0.28)]',
          },
          {
            title: 'Developer Experience',
            description:
              'React 19, Vite, TypeScript, Tailwind CSS v4, portable skills, and Nx-native generators applied to signage constraints with strict typing and fast iteration.',
            icon: <ChartLine className="text-[hsl(var(--glow-cyan))]" />,
            className: 'hover:border-[hsl(var(--glow-cyan)/0.28)]',
          },
        ]}
        data-testid="features-section"
      />
      <CTASection
        variant="light"
        title="From Demo To Device"
        description="Explore full-screen examples, then move into the tooling surface for player app scaffolding, discovery, and BrightSign deployment workflows."
        buttonText="Open Tooling"
        buttonAction={() => navigate('/tooling')}
        data-testid="demo-section"
      />
      <CTASection
        variant="dark"
        title="Built In Public On GitHub"
        description="WallRun is built by developers for developers. Read the code, open issues, send patches, and shape the project in the open."
        buttonText="View The Open Source Repo"
        buttonHref="https://github.com/CambridgeMonorail/WallRun"
        data-testid="community-section"
      />
      <StepsSection
        title="Explore WallRun"
        steps={[
          {
            title: 'Get Started',
            description:
              'Start with the install guide, then scaffold a player app when you are ready to move beyond component sampling.',
          },
          {
            title: 'Explore Tooling',
            description:
              'Review player generation, deployment, discovery, and portable skills so the repo reads like an engineering workflow instead of a static demo.',
          },
          {
            title: 'Build Your Own',
            description:
              'Use the components, generators, and deployment flow as source material for your own signage system, not as a locked platform.',
          },
        ]}
        buttonText="Getting Started Guide"
        buttonAction={() => navigate('/getting-started')}
        data-testid="steps-section"
      />
      <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
        <div className="demo-panel-soft mx-auto max-w-6xl px-6 py-5 text-center">
          <Tagline
            text="Signage is software. It deserves to be treated as such."
            className="display-type bg-transparent py-4 text-lg text-foreground sm:text-xl"
            dataTestId="tagline"
          />
        </div>
      </div>
      <Footer
        className="w-full px-4 sm:px-6 lg:px-8"
        navigationLinks={[
          { text: 'Getting Started', url: '/getting-started' },
          { text: 'Component Library', url: '/library' },
          { text: 'Gallery', url: '/gallery' },
          {
            text: 'Storybook',
            url: 'https://cambridgemonorail.github.io/WallRun/storybook/',
          },
          {
            text: 'GitHub',
            url: 'https://github.com/CambridgeMonorail/WallRun',
          },
        ]}
        socialMediaIcons={[
          {
            icon: (props) => <Github {...props} />,
            url: 'https://github.com/CambridgeMonorail/WallRun',
          },
          {
            icon: (props) => <Twitter {...props} />,
            url: 'https://x.com/TimDMorris',
          },
        ]}
        copyrightText={`© ${new Date().getFullYear()} WallRun · Built in the open by CambridgeMonorail`}
        data-testid="footer"
      />
    </div>
  );
};
