import type { Meta, StoryObj } from '@storybook/react';
import { FullscreenHero } from './FullscreenHero';
import { ScreenFrame } from '../primitives/ScreenFrame';

const previewFrameClassName =
  'rounded-[32px] border border-white/10 bg-slate-950 shadow-[0_30px_80px_rgba(15,23,42,0.45)]';

const baseHeroClassName =
  'min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/85 to-slate-950 px-16 py-20';

const baseContentClassName = 'max-w-5xl';

const baseTitleClassName =
  'text-7xl font-semibold tracking-tight text-white md:text-8xl lg:text-[7.5rem]';

const baseSubtitleClassName =
  'text-3xl font-light tracking-wide text-violet-100 md:text-4xl';

const baseBodyClassName =
  'max-w-4xl text-xl leading-relaxed text-slate-300 md:text-2xl';

const titleDivider = (
  <div className="mx-auto mb-8 mt-4 h-px w-48 bg-gradient-to-r from-transparent via-violet-300 to-transparent md:mb-10 md:w-64" />
);

const alertDivider = (
  <div className="mx-auto mb-8 mt-4 h-px w-48 bg-gradient-to-r from-transparent via-red-300 to-transparent md:mb-10 md:w-64" />
);

const meta: Meta<typeof FullscreenHero> = {
  title: 'Signage/Blocks/FullscreenHero',
  component: FullscreenHero,
  tags: ['autodocs'],
  args: {
    variant: 'dark',
    className: baseHeroClassName,
    contentClassName: baseContentClassName,
    titleClassName: baseTitleClassName,
    subtitleClassName: baseSubtitleClassName,
    bodyClassName: baseBodyClassName,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Color variant',
    },
    backgroundImageUrl: {
      control: 'text',
      description: 'Background image URL',
    },
    className: {
      table: {
        disable: true,
      },
    },
    contentClassName: {
      table: {
        disable: true,
      },
    },
    titleClassName: {
      table: {
        disable: true,
      },
    },
    subtitleClassName: {
      table: {
        disable: true,
      },
    },
    bodyClassName: {
      table: {
        disable: true,
      },
    },
    decoration: {
      control: false,
      table: {
        disable: true,
      },
    },
    logo: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame
          resolution="1080p"
          scale={0.4}
          className={previewFrameClassName}
        >
          <Story />
        </ScreenFrame>
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    layout: 'padded',
    docs: {
      description: {
        component:
          'Fullscreen hero block for welcome screens, alerts, launches, and other single-message signage surfaces. The stories below use signage-oriented typography and contrast instead of bare default props.',
      },
    },
    controls: {
      expanded: false,
    },
  },
  render: (args) => (
    <FullscreenHero
      {...args}
      className={args.className ?? baseHeroClassName}
      contentClassName={args.contentClassName ?? baseContentClassName}
      titleClassName={args.titleClassName ?? baseTitleClassName}
      subtitleClassName={args.subtitleClassName ?? baseSubtitleClassName}
      bodyClassName={args.bodyClassName ?? baseBodyClassName}
    />
  ),
};

export default meta;
type Story = StoryObj<typeof FullscreenHero>;

export const BasicTitle: Story = {
  args: {
    title: 'Welcome',
    subtitle: 'Digital signage for real screens',
    decoration: titleDivider,
    body: 'A single focal message with enough contrast and spacing to read from across the room.',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Digital Signage',
    subtitle: 'Built for distance, uptime, and repeatable layout systems',
    decoration: titleDivider,
    body: 'Use this variant when a screen needs a headline, one supporting line, and a short context block without adding dashboard clutter.',
  },
};

export const Complete: Story = {
  args: {
    title: 'Campus Open Day',
    subtitle: 'Registration now open in the main atrium',
    decoration: titleDivider,
    body: 'Wayfinding screens update every fifteen minutes with room changes, late additions, and visitor guidance.',
    cta: {
      label: 'Scan To Register',
      hint: 'Check-in desks open at 8:30 AM',
    },
  },
};

export const DarkVariant: Story = {
  args: {
    title: 'Innovation Summit 2026',
    subtitle: 'Keynote begins in Hall A at 09:00',
    decoration: titleDivider,
    body: 'A dark stage-friendly treatment with quieter body text and strong edge-to-edge contrast.',
    className:
      'min-h-screen bg-gradient-to-br from-slate-950 via-sky-950/80 to-slate-900 px-16 py-20',
    subtitleClassName:
      'text-3xl font-light tracking-wide text-sky-100 md:text-4xl',
  },
};

export const LongTextClamping: Story = {
  args: {
    title:
      'This hero keeps a very long primary message readable without letting the layout collapse into a wall of text',
    subtitle:
      'Long supporting copy is still constrained so the screen remains legible at distance and predictable in production',
    decoration: titleDivider,
    body: 'This example intentionally pushes the title, subtitle, and body lengths so the clamping behavior can be checked in the same visual treatment used for the stronger showcase stories.',
  },
};

export const WithBackgroundImage: Story = {
  args: {
    title: 'Explore The Possibilities',
    subtitle: 'Immersive screens for lobbies, venues, and launch spaces',
    body: 'Background imagery works best when the message stays short and the overlay remains strong enough to preserve contrast.',
    decoration: titleDivider,
    backgroundImageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
    className: 'min-h-screen px-16 py-20',
    titleClassName:
      'text-7xl font-semibold tracking-tight text-white drop-shadow-[0_8px_24px_rgba(15,23,42,0.55)] md:text-8xl lg:text-[7.5rem]',
    subtitleClassName:
      'text-3xl font-light tracking-wide text-white/90 drop-shadow-[0_6px_20px_rgba(15,23,42,0.45)] md:text-4xl',
    bodyClassName:
      'max-w-4xl text-xl leading-relaxed text-white/80 drop-shadow-[0_6px_20px_rgba(15,23,42,0.45)] md:text-2xl',
  },
};

export const DarkWithBackground: Story = {
  args: {
    title: 'The Future Is Here',
    subtitle: 'Prototype demonstrations every half hour',
    decoration: titleDivider,
    body: 'This version uses a darker image treatment for launch content, product reveals, and keynote countdown screens.',
    cta: {
      label: 'Join The Queue',
      hint: 'Next demo starts at 14:30',
    },
    backgroundImageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    className: 'min-h-screen px-16 py-20',
  },
};

export const WithLogo: Story = {
  args: {
    title: 'Corporate Headquarters',
    subtitle: 'Visitor check-in and meeting guidance',
    decoration: titleDivider,
    logo: (
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-violet-300/40 bg-violet-400/15 text-4xl font-semibold text-violet-50 shadow-[0_10px_35px_rgba(139,92,246,0.35)]">
        WR
      </div>
    ),
  },
};

export const Announcement: Story = {
  args: {
    title: 'System Maintenance',
    subtitle: 'Display network window tonight at 02:00',
    decoration: titleDivider,
    body: 'Playback continues on cached content during the maintenance interval. Network publishing resumes once the gateway returns.',
    cta: {
      label: 'Read Status Notes',
      hint: 'Operations channel 4B',
    },
    className:
      'min-h-screen bg-gradient-to-br from-slate-950 via-orange-950/50 to-slate-950 px-16 py-20',
    subtitleClassName:
      'text-3xl font-light tracking-wide text-orange-100 md:text-4xl',
  },
};

export const WelcomeScreen: Story = {
  args: {
    title: 'Good Morning',
    subtitle: 'Welcome to Tech Innovation Center',
    body: "Today's schedule includes team standup at 10:00, Lunch and Learn at 12:30, and community office hours at 16:00.",
    decoration: titleDivider,
    className:
      'min-h-screen bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950 px-16 py-20',
  },
};

export const EventPromotion: Story = {
  args: {
    title: 'Summer Music Festival',
    subtitle: 'June 15-17, 2026',
    decoration: titleDivider,
    body: 'Three days of headline acts, outdoor dining, and late-night city programming across the river district.',
    cta: {
      label: 'Tickets Available',
      hint: 'Scan the QR code in the venue lobby',
    },
    backgroundImageUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=1080&fit=crop',
    className: 'min-h-screen px-16 py-20',
  },
};

export const EmergencyAlert: Story = {
  args: {
    title: 'Weather Advisory',
    subtitle: 'Severe thunderstorm warning in effect',
    decoration: alertDivider,
    body: 'Move away from exterior doors and glass until the warning expires at 18:00. Follow local safety staff instructions.',
    cta: {
      label: 'Emergency Information',
      hint: 'Call 911 for immediate danger',
    },
    className:
      'min-h-screen bg-gradient-to-br from-slate-950 via-red-950/65 to-slate-950 px-16 py-20',
    subtitleClassName:
      'text-3xl font-light tracking-wide text-red-100 md:text-4xl',
  },
};
