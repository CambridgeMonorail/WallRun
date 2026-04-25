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

import logoSrc from '../../../assets/images/wallrun-mark.svg';

import {
  AboutSection,
  CTASection,
  FeaturesSection,
  Footer,
  StepsSection,
  HeroSection,
} from '@wallrun/landing';
import { Logo, Tagline } from '@wallrun/shadcnui-blocks';
import { LandingNav } from './LandingNav';

export const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative isolate flex min-h-screen w-full flex-col items-center overflow-hidden bg-transparent text-foreground"
      data-testid="landing-page"
    >
      <LandingNav />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_20%_18%,hsl(var(--glow-violet)/0.16),transparent_34%),radial-gradient(circle_at_78%_12%,hsl(var(--glow-cyan)/0.14),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 demo-grid opacity-60" />
      <div className="w-full" data-testid="hero-section-container">
        <HeroSection
          title="Digital Signage as Software."
          subtitle="WallRun.dev"
          description="Signage is software, and it deserves to be treated that way. Build bespoke, generative experiences for BrightSign players with code, data, and deterministic screen systems."
          highlights={[
            'Developer-first workflows',
            'Generative screen systems',
            'Live data surfaces',
            'BrightSign-ready deploys',
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
        title="Not Slides. Software."
        description="WallRun is an open source workspace for developers building custom digital experiences that live on walls. It brings React, fixed-aspect layouts, registry components, and deployment tooling into one deliberate signage workflow."
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
        title="Made For Screens"
        features={[
          {
            title: 'Developer First',
            description:
              'Build signage like software: inspectable code, predictable project structure, typed components, and scripts you can change.',
            icon: <Rocket className="text-[hsl(var(--glow-violet))]" />,
            className: 'hover:border-[hsl(var(--glow-violet)/0.38)]',
          },
          {
            title: 'Generative',
            description:
              'Use motion, procedural visuals, and composable React blocks to make displays feel alive without becoming noisy.',
            icon: <Palette className="text-[hsl(var(--glow-cyan))]" />,
            className: 'hover:border-[hsl(var(--glow-cyan)/0.34)]',
          },
          {
            title: 'Data Driven',
            description:
              'Render KPIs, schedules, menus, availability, alerts, and local business signals as real-time display systems.',
            icon: <ChartLine className="text-[hsl(var(--glow-green))]" />,
            className: 'hover:border-[hsl(var(--glow-green)/0.34)]',
          },
          {
            title: 'BrightSign Ready',
            description:
              'Package and deploy player apps with BrightSign OS constraints, hardware quirks, and unattended runtime needs in mind.',
            icon: <Video className="text-[hsl(var(--glow-amber))]" />,
            className: 'hover:border-[hsl(var(--glow-amber)/0.34)]',
          },
          {
            title: 'Fixed Canvas',
            description:
              'Design for known screen sizes and viewing distance first, with deterministic composition over webpage-style flow.',
            icon: <BarChart className="text-[hsl(var(--glow-pink))]" />,
            className: 'hover:border-[hsl(var(--glow-pink)/0.34)]',
          },
          {
            title: 'Distance Readable',
            description:
              'High contrast, strong hierarchy, and large typography keep information legible from across the room.',
            icon: <Paintbrush className="text-[hsl(var(--glow-violet))]" />,
            className: 'hover:border-[hsl(var(--glow-violet)/0.38)]',
          },
        ]}
        data-testid="features-section"
      />
      <CTASection
        variant="light"
        title="Explore The Work"
        description="Browse real full-screen examples, then open the tooling surface when you are ready to scaffold, package, and deploy a player app."
        buttonText="Explore Projects"
        buttonAction={() => navigate('/gallery')}
        data-testid="demo-section"
      />
      <CTASection
        variant="dark"
        title="Built In Public"
        description="Read the source, inspect the deployment scripts, open issues, send patches, and shape the signage workflow in the open."
        buttonText="Read The Code"
        buttonHref="https://github.com/CambridgeMonorail/WallRun"
        data-testid="community-section"
      />
      <StepsSection
        title="Build A Screen"
        steps={[
          {
            title: 'Choose A Canvas',
            description:
              'Start from a fixed-aspect layout and design for a real display, viewing distance, and ambient conditions.',
          },
          {
            title: 'Compose The Signal',
            description:
              'Combine signage components, data feeds, typography, and calm motion into a deterministic screen.',
          },
          {
            title: 'Ship To Players',
            description:
              'Package the app, discover BrightSign devices, and deploy the experience as software you control.',
          },
        ]}
        buttonText="Getting Started Guide"
        buttonAction={() => navigate('/getting-started')}
        data-testid="steps-section"
      />
      <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
        <div className="demo-panel-soft mx-auto max-w-6xl px-6 py-5 text-center">
          <Tagline
            text="Not slides. Software for screens that live in the real world."
            className="bg-transparent py-4 font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground sm:text-base"
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
