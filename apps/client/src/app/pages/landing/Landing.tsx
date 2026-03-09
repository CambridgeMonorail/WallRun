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

import logoSrc from '../../../assets/images/app-logo.webp';

import {
  AboutSection,
  CTASection,
  FeaturesSection,
  Footer,
  StepsSection,
  HeroSection,
} from '@tsa/landing';
import { Logo, Tagline } from '@tsa/shadcnui-blocks';

export const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-primary text-foreground"
      data-testid="landing-page"
    >
      <div className="bg-primary" data-testid="hero-section-container">
        <HeroSection
          title="Digital Signage as Software"
          subtitle="Build deterministic, data-driven content for always-on displays using modern web technologies."
          description="Treat signage players as programmable systems. Create fixed-aspect layouts, distance-readable typography, and predictable rendering for BrightSign devices and beyond."
          image={logoSrc}
          imageAlt="The Sign Age logo"
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
        title="Why The Sign Age?"
        description="The Sign Age is a working notebook for building signage software, not a CMS or marketing tool. It's a component library, tooling reference, and living documentation for treating digital signage as programmable systems."
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
            icon: <BarChart className="text-blue-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Distance-Readable Typography',
            description:
              'Typography optimized for viewing from across the room. Large text, high contrast, clear hierarchy for quick scanning.',
            icon: <Paintbrush className="text-green-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Signage Components',
            description:
              'Purpose-built React components: ScreenFrame, SplitScreen, FullscreenHero, InfoCardGrid—primitives, layouts, and blocks for signage screens.',
            icon: <Palette className="text-purple-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'BrightSign-Focused',
            description:
              'Designed with BrightSign devices in mind. Real-world constraints, hardware quirks, and platform-specific considerations baked in.',
            icon: <Video className="text-orange-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Offline-First',
            description:
              'Built for always-on, unattended operation. Signage screens run 24/7 without supervision, often offline or with limited connectivity.',
            icon: <Rocket className="text-red-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Developer Experience',
            description:
              'React 19, Vite, TypeScript, Tailwind CSS v4. Modern frontend tooling applied to signage constraints with strict typing and fast iteration.',
            icon: <ChartLine className="text-yellow-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
        ]}
        data-testid="features-section"
      />
      <CTASection
        variant="light"
        title="See Signage in Action"
        description="Explore full-screen signage examples demonstrating distance-readable layouts, fixed-aspect designs, and deterministic rendering."
        buttonText="View Gallery"
        buttonAction={() => navigate('/gallery')}
        data-testid="demo-section"
      />
      <CTASection
        variant="dark"
        title="Join the Community"
        description="TheSignAge is built by developers, for developers. Contribute, discuss, and shape the future of the project."
        buttonText="Contribute on GitHub"
        buttonAction={() =>
          window.open(
            'https://github.com/CambridgeMonorail/TheSignAge',
            '_blank',
          )
        }
        data-testid="community-section"
      />
      <StepsSection
        title="Explore The Sign Age"
        steps={[
          {
            title: 'Get Started',
            description:
              'Follow the installation guide to add signage components to your React project.',
          },
          {
            title: 'Explore Examples',
            description:
              'Browse signage screens in the gallery—welcome screens, menus, dashboards, wayfinding, and more.',
          },
          {
            title: 'Build Your Own',
            description:
              'Use the components and patterns to create deterministic signage screens for your use case.',
          },
        ]}
        buttonText="Getting Started Guide"
        buttonAction={() => navigate('/getting-started')}
        data-testid="steps-section"
      />
      <Tagline
        text="Signage is software. It deserves to be treated as such."
        dataTestId="tagline"
      />
      <Footer
        className="w-full px-4 sm:px-6 lg:px-8"
        navigationLinks={[
          { text: 'Getting Started', url: '/getting-started' },
          { text: 'Component Library', url: '/library' },
          { text: 'Gallery', url: '/gallery' },
          {
            text: 'Storybook',
            url: 'https://cambridgemonorail.github.io/TheSignAge/storybook/',
          },
          {
            text: 'GitHub',
            url: 'https://github.com/CambridgeMonorail/TheSignAge',
          },
        ]}
        socialMediaIcons={[
          {
            icon: (props) => <Github {...props} />,
            url: 'https://github.com/CambridgeMonorail/TheSignAge',
          },
          {
            icon: (props) => <Twitter {...props} />,
            url: 'https://x.com/TimDMorris',
          },
        ]}
        copyrightText="&copy; 2024 TheSignAge. All rights reserved."
        data-testid="footer"
      />
    </div>
  );
};
