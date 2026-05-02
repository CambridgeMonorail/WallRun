import type { Meta, StoryObj } from '@storybook/react';
import { InfoCardGrid } from './InfoCardGrid';
import { ScreenFrame } from '../primitives/ScreenFrame';
import type { InfoCardItem } from '../types/signage.types';

const meta: Meta<typeof InfoCardGrid> = {
  title: 'Signage/Blocks/InfoCardGrid',
  component: InfoCardGrid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: 'Number of columns',
    },
    density: {
      control: 'select',
      options: ['comfortable', 'compact'],
      description: 'Density variant',
    },
    highlightIndex: {
      control: 'number',
      description: 'Index of card to highlight',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-950/95 p-8">
        <ScreenFrame resolution="1080p" scale={0.38}>
          <div className="h-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_34%),linear-gradient(145deg,#020617,#0f172a_52%,#082f49)] p-14 text-white">
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-center rounded-[2rem] border border-white/10 bg-slate-950/68 p-10 shadow-2xl backdrop-blur-sm lg:p-14">
              <div className="mb-8 lg:mb-10">
                <div className="text-sm uppercase tracking-[0.32em] text-sky-300/65 lg:text-lg">
                  Information grid
                </div>
                <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white lg:text-7xl">
                  Repeating cards without bespoke page markup.
                </h2>
                <p className="mt-5 max-w-4xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
                  `InfoCardGrid` is for uniform, glanceable blocks like KPIs,
                  directories, promos, or schedules. The story frame should make
                  that usage obvious.
                </p>
              </div>
              <Story />
            </div>
          </div>
        </ScreenFrame>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InfoCardGrid>;

const kpiItems: InfoCardItem[] = [
  {
    title: 'Total Revenue',
    value: '$1.2M',
    description: 'Up 12% from last quarter',
    meta: 'Q4 2025',
  },
  {
    title: 'Active Users',
    value: '45.2K',
    description: 'Monthly active users',
    meta: 'December 2025',
  },
  {
    title: 'Conversion Rate',
    value: '3.8%',
    description: 'Above industry average',
    meta: 'Last 30 days',
  },
];

const menuItems: InfoCardItem[] = [
  {
    title: 'Classic Burger',
    value: '$12.99',
    description: 'Angus beef, lettuce, tomato, special sauce',
  },
  {
    title: 'Chicken Sandwich',
    value: '$10.99',
    description: 'Grilled chicken breast, avocado, mayo',
  },
  {
    title: 'Veggie Wrap',
    value: '$9.99',
    description: 'Fresh vegetables, hummus, whole wheat wrap',
  },
  {
    title: 'Caesar Salad',
    value: '$8.99',
    description: 'Romaine, parmesan, croutons, Caesar dressing',
  },
];

const featureItems: InfoCardItem[] = [
  {
    title: 'Fast Performance',
    description: 'Lightning-fast load times with optimized rendering',
    meta: 'Core Feature',
  },
  {
    title: 'Easy Integration',
    description: 'Drop-in components ready to use in minutes',
    meta: 'Developer Experience',
  },
  {
    title: 'Fully Responsive',
    description: 'Works perfectly on all screen sizes and devices',
    meta: 'Accessibility',
  },
];

/**
 * Default 3-column KPI dashboard
 */
export const Default: Story = {
  args: {
    items: kpiItems,
    columns: 3,
    density: 'comfortable',
  },
};

/**
 * 2-column layout
 */
export const TwoColumns: Story = {
  args: {
    items: kpiItems.slice(0, 2),
    columns: 2,
    density: 'comfortable',
  },
};

/**
 * 4-column menu layout
 */
export const FourColumns: Story = {
  args: {
    items: menuItems,
    columns: 4,
    density: 'comfortable',
  },
};

/**
 * Compact density variant
 */
export const CompactDensity: Story = {
  args: {
    items: kpiItems,
    columns: 3,
    density: 'compact',
  },
};

/**
 * Highlighted card example
 */
export const WithHighlight: Story = {
  args: {
    items: kpiItems,
    columns: 3,
    density: 'comfortable',
    highlightIndex: 1,
  },
};

/**
 * Menu board example
 */
export const MenuBoard: Story = {
  args: {
    items: menuItems,
    columns: 2,
    density: 'comfortable',
  },
};

/**
 * Feature showcase
 */
export const FeatureShowcase: Story = {
  args: {
    items: featureItems,
    columns: 3,
    density: 'comfortable',
  },
};

/**
 * Stats dashboard with long text
 */
export const LongTextClamping: Story = {
  args: {
    items: [
      {
        title:
          'This is an extremely long title that will be clamped to two lines',
        value: '$999.9M',
        description:
          'This is a very long description that demonstrates the three-line clamping behavior to ensure content remains readable and maintains layout integrity even with verbose text',
        meta: 'This is long meta information that gets clamped to one line',
      },
      {
        title: 'Normal Card',
        value: '$10K',
        description: 'Short description',
      },
      {
        title: 'Another Card',
        value: '$5K',
        description: 'Brief text',
        meta: 'Meta',
      },
    ],
    columns: 3,
    density: 'comfortable',
  },
};

/**
 * Minimal cards (title only)
 */
export const MinimalCards: Story = {
  args: {
    items: [
      { title: 'Innovation' },
      { title: 'Collaboration' },
      { title: 'Excellence' },
      { title: 'Integrity' },
    ],
    columns: 4,
    density: 'comfortable',
  },
};

/**
 * Promotion cards
 */
export const Promotions: Story = {
  args: {
    items: [
      {
        title: 'Summer Sale',
        value: '50% OFF',
        description: 'Save big on all summer merchandise',
        meta: 'Limited time offer',
      },
      {
        title: 'Buy One Get One',
        value: 'BOGO',
        description: 'On selected items only',
        meta: 'Ends Sunday',
      },
      {
        title: 'Free Shipping',
        value: '$0',
        description: 'On orders over $50',
        meta: 'Always available',
      },
    ],
    columns: 3,
    density: 'comfortable',
    highlightIndex: 0,
  },
};

/**
 * Event schedule
 */
export const EventSchedule: Story = {
  args: {
    items: [
      {
        title: 'Registration',
        value: '9:00 AM',
        description: 'Check in at main lobby',
        meta: 'Building A',
      },
      {
        title: 'Keynote',
        value: '10:00 AM',
        description: 'Opening presentation',
        meta: 'Auditorium',
      },
      {
        title: 'Lunch',
        value: '12:30 PM',
        description: 'Catered buffet',
        meta: 'Cafeteria',
      },
      {
        title: 'Workshop',
        value: '2:00 PM',
        description: 'Hands-on sessions',
        meta: 'Room 201',
      },
    ],
    columns: 2,
    density: 'comfortable',
  },
};

/**
 * Department directory
 */
export const DepartmentDirectory: Story = {
  args: {
    items: [
      {
        title: 'Customer Service',
        value: 'Ext. 1001',
        description: 'Support and assistance',
        meta: 'Floor 1',
      },
      {
        title: 'Sales',
        value: 'Ext. 2002',
        description: 'Product inquiries',
        meta: 'Floor 2',
      },
      {
        title: 'IT Support',
        value: 'Ext. 3003',
        description: 'Technical help',
        meta: 'Floor 3',
      },
      {
        title: 'Human Resources',
        value: 'Ext. 4004',
        description: 'Employee services',
        meta: 'Floor 4',
      },
    ],
    columns: 2,
    density: 'compact',
  },
};
