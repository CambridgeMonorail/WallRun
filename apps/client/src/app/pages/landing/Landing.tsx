import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Github,
  Twitter,
  Rocket,
  Palette,
  BarChart,
  ChartLine,
  Video,
  Bot,
  BookOpen,
  Boxes,
  Network,
  PackageCheck,
  Wrench,
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
          description="WallRun is an AI-accelerated open source React workspace for building real signage: distance-readable components, fixed-aspect layouts, BrightSign packaging, player discovery, and deploy scripts you can inspect and change."
          highlights={[
            'Signage React components',
            'Copilot agents + portable skills',
            'BrightSign packaging + deploy',
            'Player discovery + git-safe config',
          ]}
          image={logoSrc}
          imageAlt="WallRun logo"
          ctaPrimary={{
            text: 'Start Building',
            onClick: () => navigate('/getting-started'),
          }}
          ctaSecondary={{
            text: 'See Screen Examples',
            onClick: () => navigate('/gallery'),
          }}
          layout="left"
          data-testid="hero-section"
          variant="dark"
        />
      </div>
      <AboutSection
        title="Not Slides. Software."
        description="WallRun is not a CMS or slide deck builder. It is a working notebook for developers who want complete control over screens that live in physical space, from React components to BrightSign player workflows."
        logos={[
          <Logo
            name="nx"
            className="h-9 w-9 sm:h-10 sm:w-10"
            key="nx"
            title="Nx"
            ariaLabel="Nx"
          />,
          <Logo
            name="tailwind"
            className="h-9 w-9 sm:h-10 sm:w-10"
            key="tailwind"
            title="Tailwind CSS"
            ariaLabel="Tailwind CSS"
          />,
          <Logo
            name="shadcn"
            className="h-9 w-9 sm:h-10 sm:w-10"
            key="shadcn"
            title="Shadcn"
            ariaLabel="Shadcn"
          />,
          <Logo
            name="pnpm"
            className="h-9 w-9 sm:h-10 sm:w-10"
            key="pnpm"
            title="Pnpm"
            ariaLabel="Pnpm"
          />,
          <Logo
            name="react"
            className="h-9 w-9 sm:h-10 sm:w-10"
            key="react"
            title="React"
            ariaLabel="React"
          />,
          <Logo
            name="vite"
            className="h-9 w-9 sm:h-10 sm:w-10"
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
        title="AI-Accelerated Signage Workspace"
        features={[
          {
            title: 'Copilot Agents',
            description:
              'Use signage-aware GitHub Copilot agents for layout, runtime, and BrightSign guidance instead of generic web-page suggestions.',
            icon: <Bot className="text-[hsl(var(--glow-violet))]" />,
            className: 'hover:border-[hsl(var(--glow-violet)/0.38)]',
          },
          {
            title: 'Portable Skills',
            description:
              'Install reusable SKILL.md workflows for signage layout, animation, distance legibility, BrightSign packaging, and player discovery.',
            icon: <BookOpen className="text-[hsl(var(--glow-cyan))]" />,
            className: 'hover:border-[hsl(var(--glow-cyan)/0.34)]',
          },
          {
            title: 'Component Registry',
            description:
              'Pull signage components from a shadcn-compatible registry so other React projects can adopt WallRun blocks without copying the repo.',
            icon: <Boxes className="text-[hsl(var(--glow-green))]" />,
            className: 'hover:border-[hsl(var(--glow-green)/0.34)]',
          },
          {
            title: 'BrightSign Deploy Tools',
            description:
              'Package React player apps with an autorun bootstrap and deploy to BrightSign OS players through repeatable scripts.',
            icon: <PackageCheck className="text-[hsl(var(--glow-amber))]" />,
            className: 'hover:border-[hsl(var(--glow-amber)/0.34)]',
          },
          {
            title: 'Player Discovery',
            description:
              'Find BrightSign devices on the local network, inspect player details, and keep operational configuration outside version control.',
            icon: <Network className="text-[hsl(var(--glow-pink))]" />,
            className: 'hover:border-[hsl(var(--glow-pink)/0.34)]',
          },
          {
            title: 'Tooling Documentation',
            description:
              'Explore guides, Storybook, examples, and deployment docs that make the workspace understandable to developers and searchable by topic.',
            icon: <Wrench className="text-[hsl(var(--glow-violet))]" />,
            className: 'hover:border-[hsl(var(--glow-violet)/0.38)]',
          },
        ]}
        data-testid="workspace-section"
      />
      <FeaturesSection
        title="What WallRun Gives You"
        features={[
          {
            title: 'Developer First',
            description:
              'Build signage like software: inspectable code, predictable project structure, typed components, and scripts you can change.',
            icon: <Rocket className="text-[hsl(var(--glow-violet))]" />,
            className: 'hover:border-[hsl(var(--glow-violet)/0.38)]',
          },
          {
            title: 'Component Library',
            description:
              'Use signage-specific React primitives, layouts, and blocks designed for distance readability and fixed-format screens.',
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
            title: 'Player Operations',
            description:
              'Discover BrightSign devices on the local network and keep player configuration out of Git while still making deploys repeatable.',
            icon: <Rocket className="text-[hsl(var(--glow-violet))]" />,
            className: 'hover:border-[hsl(var(--glow-violet)/0.38)]',
          },
          {
            title: 'Fixed Canvas',
            description:
              'Design for known screen sizes and viewing distance first, with deterministic composition over webpage-style flow.',
            icon: <BarChart className="text-[hsl(var(--glow-pink))]" />,
            className: 'hover:border-[hsl(var(--glow-pink)/0.34)]',
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
            label: 'GitHub',
            url: 'https://github.com/CambridgeMonorail/WallRun',
          },
          {
            icon: (props) => <Twitter {...props} />,
            label: 'X',
            url: 'https://x.com/TimDMorris',
          },
        ]}
        copyrightText={`© ${new Date().getFullYear()} WallRun · Built in the open by CambridgeMonorail`}
        data-testid="footer"
      />
    </div>
  );
};
