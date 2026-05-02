import type { Meta, StoryObj } from '@storybook/react';
import { SignageContainer } from './SignageContainer';
import { SignageHeader } from './SignageHeader';
import { ScreenFrame } from '../primitives/ScreenFrame';

const meta: Meta<typeof SignageContainer> = {
  title: 'Signage/Layouts/SignageContainer',
  component: SignageContainer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'SignageContainer is the full-screen foundation for signage pages. Use it to apply the ambient gradient system, grid overlay, and consistent safe-area padding before placing blocks or page content inside.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'emerald',
        'teal',
        'blue',
        'violet',
        'indigo',
        'pink',
        'orange',
        'cyan',
      ],
      description: 'Color theme variant',
    },
    showGrid: {
      control: 'boolean',
      description: 'Whether to show grid overlay',
    },
    showAmbientOrbs: {
      control: 'boolean',
      description: 'Whether to show ambient orb effects',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.36}>
          <Story />
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignageContainer>;

const heroShellClassName =
  'flex h-full items-center justify-center px-10 py-16 lg:px-16';

const kpiShellClassName =
  'flex h-full flex-col items-center justify-center gap-12 px-10 py-16 lg:px-16';

const createHeroChildren = (
  title: string,
  subtitle: string,
  tag?: string,
  tagVariant?: 'emerald' | 'teal' | 'blue' | 'violet' | 'pink' | 'orange',
) => (
  <div className={heroShellClassName}>
    <div className="flex w-full max-w-6xl flex-col gap-8 rounded-[2rem] border border-white/10 bg-slate-950/55 p-10 shadow-2xl backdrop-blur-sm lg:p-14">
      <SignageHeader
        tag={tag}
        tagVariant={tagVariant}
        title={title}
        subtitle={subtitle}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-xl">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-300/65">
            Zone
          </div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Main lobby
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-xl">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-300/65">
            Mode
          </div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Visitor guidance
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-xl">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-300/65">
            Surface
          </div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Ambient shell
          </div>
        </div>
      </div>
    </div>
  </div>
);

const createDashboardChildren = () => (
  <div className={kpiShellClassName}>
    <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-950/55 p-10 shadow-2xl backdrop-blur-sm lg:p-14">
      <SignageHeader
        tag="Live"
        tagVariant="emerald"
        title="KPI dashboard"
        subtitle="Real-time performance metrics across sales, traffic, and conversion"
      />
    </div>
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm">
        <div className="text-6xl font-semibold tracking-tight text-white">$1.2M</div>
        <div className="mt-3 text-xl text-slate-300">Revenue</div>
        <div className="mt-2 text-lg text-emerald-300">+12.5%</div>
      </div>
      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm">
        <div className="text-6xl font-semibold tracking-tight text-white">8,432</div>
        <div className="mt-3 text-xl text-slate-300">Users</div>
        <div className="mt-2 text-lg text-rose-300">-3.2%</div>
      </div>
      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm">
        <div className="text-6xl font-semibold tracking-tight text-white">24.8%</div>
        <div className="mt-3 text-xl text-slate-300">Conversion</div>
        <div className="mt-2 text-lg text-emerald-300">+8.4%</div>
      </div>
    </div>
  </div>
);

/**
 * Emerald variant with all effects
 */
export const Emerald: Story = {
  args: {
    variant: 'emerald',
    showGrid: true,
    showAmbientOrbs: true,
    children: createHeroChildren(
      'Welcome centre',
      'Emerald can carry calm operational or hospitality content without feeling flat.',
      'Live now',
      'emerald',
    ),
  },
};

/**
 * Teal variant
 */
export const Teal: Story = {
  args: {
    variant: 'teal',
    showGrid: true,
    showAmbientOrbs: true,
    children: createHeroChildren(
      'Operations overview',
      'Teal works well for status-heavy internal displays.',
      'Updated',
      'teal',
    ),
  },
};

/**
 * Blue variant (default)
 */
export const Blue: Story = {
  args: {
    variant: 'blue',
    showGrid: true,
    showAmbientOrbs: true,
    children: createHeroChildren(
      'Visitor arrivals',
      'Blue is the neutral default for general-purpose signage shells.',
      'Today',
      'blue',
    ),
  },
};

/**
 * Violet variant
 */
export const Violet: Story = {
  args: {
    variant: 'violet',
    showGrid: true,
    showAmbientOrbs: true,
    children: createHeroChildren(
      'Employee spotlight',
      'Violet gives editorial or celebratory screens a softer emphasis.',
      'Featured',
      'violet',
    ),
  },
};

/**
 * Indigo variant with vibrant gradients
 */
export const Indigo: Story = {
  args: {
    variant: 'indigo',
    showGrid: true,
    showAmbientOrbs: true,
    children: createHeroChildren(
      'Conference 2026',
      'Indigo supports a more dramatic event-led background without custom page CSS.',
      'Special event',
      'violet',
    ),
  },
};

/**
 * Pink variant
 */
export const Pink: Story = {
  args: {
    variant: 'pink',
    showGrid: true,
    showAmbientOrbs: true,
    children: createHeroChildren(
      'Anniversary party',
      'Pink gives short-run celebratory screens a brighter mood while preserving readability.',
      'Celebration',
      'pink',
    ),
  },
};

/**
 * Orange variant
 */
export const Orange: Story = {
  args: {
    variant: 'orange',
    showGrid: true,
    showAmbientOrbs: true,
    children: createHeroChildren(
      'Maintenance notice',
      'Orange is better suited to timed alerts and attention states.',
      'Alert',
      'orange',
    ),
  },
};

/**
 * Cyan variant
 */
export const Cyan: Story = {
  args: {
    variant: 'cyan',
    showGrid: true,
    showAmbientOrbs: true,
    children: createHeroChildren(
      'Innovation hub',
      'Cyan leans technical without becoming cold or generic.',
      'Tech',
      'teal',
    ),
  },
};

/**
 * Without grid overlay
 */
export const NoGrid: Story = {
  args: {
    variant: 'blue',
    showGrid: false,
    showAmbientOrbs: true,
    children: createHeroChildren(
      'Clean layout',
      'Disable the grid when the page artwork or photography already carries enough structure.',
    ),
  },
};

/**
 * Without ambient orbs
 */
export const NoAmbientOrbs: Story = {
  args: {
    variant: 'violet',
    showGrid: true,
    showAmbientOrbs: false,
    children: createHeroChildren(
      'Minimal effects',
      'Turn off the ambient glow when the layout needs a stricter, flatter background.',
    ),
  },
};

/**
 * Plain container (no effects)
 */
export const Plain: Story = {
  args: {
    variant: 'blue',
    showGrid: false,
    showAmbientOrbs: false,
    children: createHeroChildren(
      'Plain container',
      'This is the bare shell when you want only the spacing contract and variant background.',
    ),
  },
};

/**
 * With complex content
 */
export const WithContent: Story = {
  args: {
    variant: 'emerald',
    showGrid: true,
    showAmbientOrbs: true,
    children: createDashboardChildren(),
  },
};
