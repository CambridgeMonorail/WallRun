import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from '../primitives/ScreenFrame';
import { WaitingRoomBoard } from './WaitingRoomBoard';
import type { WaitingRoomBoardProps } from './WaitingRoomBoard';

const renderPreview = (
  args: WaitingRoomBoardProps,
  {
    resolution,
    scale,
  }: {
    resolution: '1080p' | 'portrait-1080p';
    scale: number;
  },
) => (
  <div className="bg-slate-950/95 p-8">
    <ScreenFrame resolution={resolution} scale={scale}>
      <WaitingRoomBoard {...args} />
    </ScreenFrame>
  </div>
);

const meta: Meta<typeof WaitingRoomBoard> = {
  title: 'Signage/Blocks/WaitingRoomBoard',
  component: WaitingRoomBoard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'WaitingRoomBoard is an opinionated full-screen template for dwell spaces such as clinics, lounges, and collection areas. It keeps the dominant instruction calm and readable, adds a visible wait summary when needed, and allows only a small number of lightweight updates so the screen does not collapse into a dashboard.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WaitingRoomBoard>;

export const ClinicQueueUpdate: Story = {
  args: {
    eyebrow: 'Clinic waiting room',
    title: 'Please remain seated until your name appears',
    message:
      'Staff will call each patient directly when the next clinician is ready.',
    reassurance:
      'If your appointment time has passed, stay seated and staff will update you shortly.',
    estimatedWait: '12 min',
    waitDetail: 'Triage is currently running slightly behind schedule.',
    updates: [
      { message: 'Forms are available at the reception desk.' },
      {
        message: 'Paediatric appointments are checking in at Window 2.',
        tone: 'brand',
      },
    ],
    variant: 'teal',
  },
  render: (args) =>
    renderPreview(args, {
      resolution: '1080p',
      scale: 0.36,
    }),
};

export const FoodCollectionHandoff: Story = {
  args: {
    eyebrow: 'Collection area',
    title: 'Your order is in preparation',
    message:
      'Please remain in the collection area and watch for your order number.',
    reassurance:
      'Hot drinks and allergy-safe orders may take slightly longer during peak service.',
    estimatedWait: '4 min',
    waitDetail: 'Current collection range: orders 148 to 156',
    updates: [
      {
        message: 'Cold drinks are collecting from the express counter.',
      },
    ],
    variant: 'blue',
    qrHandoff: {
      title: 'Track progress on your phone',
      description:
        'Scan to see order status, allergens, and collection guidance without leaving your seat.',
      qrValue: 'https://wallrun.dev/order-status',
      qrLabel: 'Order status',
      qrInstruction: 'Scan for order progress and collection details',
      shortUrl: 'wallrun.dev/order-status',
      eyebrow: 'Private order details',
    },
  },
  render: (args) =>
    renderPreview(args, {
      resolution: '1080p',
      scale: 0.34,
    }),
};

export const PortraitServiceLounge: Story = {
  args: {
    eyebrow: 'Service lounge',
    title: 'A specialist will be with you shortly',
    message:
      'Please keep your ticket visible and remain in the seating area nearest the north wall display.',
    reassurance:
      'Priority and accessibility appointments will be called separately by staff.',
    estimatedWait: '8 min',
    waitDetail: 'Current service desk: Insurance and renewals',
    updates: [
      {
        message: 'Document checks are moving faster at Desk B.',
        tone: 'brand',
      },
      {
        message: 'Walk-in consultations will resume at 14:00.',
        tone: 'urgent',
      },
    ],
    variant: 'violet',
  },
  render: (args) =>
    renderPreview(args, {
      resolution: 'portrait-1080p',
      scale: 0.29,
    }),
};
