import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from '../primitives/ScreenFrame';
import { DecisionBoard } from './DecisionBoard';
import type { DecisionBoardProps } from './DecisionBoard';

const renderPreview = (
  args: DecisionBoardProps,
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
      <DecisionBoard {...args} />
    </ScreenFrame>
  </div>
);

const meta: Meta<typeof DecisionBoard> = {
  title: 'Signage/Blocks/DecisionBoard',
  component: DecisionBoard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'DecisionBoard is an opinionated full-screen template for routing viewers between a small number of next actions. It keeps one dominant prompt, a tightly bounded choice set, and an optional phone continuation without collapsing into a dashboard or menu board.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DecisionBoard>;

export const ReceptionRouting: Story = {
  args: {
    eyebrow: 'Lobby routing',
    title: 'Choose the service you need',
    message:
      'Follow the option that matches your appointment, enquiry, or document request.',
    serviceNote:
      'If you already have a ticket number, keep it visible and proceed only when called.',
    options: [
      {
        eyebrow: 'Appointments',
        title: 'Check in at Desk A',
        description:
          'For booked visits, pre-arranged collections, and clinician referrals.',
        cue: 'Blue counter',
        tone: 'brand',
      },
      {
        eyebrow: 'General enquiries',
        title: 'Speak to Reception',
        description:
          'For walk-in questions, visitor badges, and documentation support.',
        cue: 'Main foyer',
      },
    ],
    variant: 'violet',
  },
  render: (args) =>
    renderPreview(args, {
      resolution: '1080p',
      scale: 0.36,
    }),
};

export const SelfServiceChoice: Story = {
  args: {
    eyebrow: 'Service options',
    title: 'Choose how to continue',
    message:
      'Pick the route that best matches whether you need staff help, document upload, or a private mobile flow.',
    options: [
      {
        eyebrow: 'In person',
        title: 'Join the staffed queue',
        description:
          'Speak to the front-desk team for in-person support and exceptions.',
        cue: 'Staffed support',
      },
      {
        eyebrow: 'Fastest route',
        title: 'Continue on your phone',
        description:
          'Scan below for private forms, queue updates, and live wayfinding.',
        cue: 'Private flow',
        tone: 'brand',
      },
    ],
    variant: 'blue',
    qrHandoff: {
      title: 'Open the self-service flow',
      description:
        'Scan to complete forms, receive queue updates, and carry the next steps with you.',
      qrValue: 'https://wallrun.dev/self-service',
      qrLabel: 'Self-service flow',
      qrInstruction: 'Scan for queue updates and private forms',
      shortUrl: 'wallrun.dev/self-service',
    },
  },
  render: (args) =>
    renderPreview(args, {
      resolution: '1080p',
      scale: 0.34,
    }),
};

export const PortraitTriageChoice: Story = {
  args: {
    eyebrow: 'Event routing',
    title: 'Choose your next stop',
    message:
      'Follow the route that matches your registration state so queues stay moving and support remains visible.',
    serviceNote:
      'Accessibility support is available at every checkpoint; ask any steward for immediate assistance.',
    options: [
      {
        eyebrow: 'Already registered',
        title: 'Badge collection',
        description:
          'Collect your printed badge and continue straight to Hall B.',
        cue: 'East desk',
        tone: 'brand',
      },
      {
        eyebrow: 'Need assistance',
        title: 'Help and accessibility',
        description:
          'Speak to the support team for access, ticket, or venue questions.',
        cue: 'Orange desk',
      },
      {
        eyebrow: 'New arrivals',
        title: 'On-site registration',
        description:
          'Use the assisted registration bank if you have not completed check-in yet.',
        cue: 'South foyer',
        tone: 'urgent',
      },
    ],
    variant: 'violet',
  },
  render: (args) =>
    renderPreview(args, {
      resolution: 'portrait-1080p',
      scale: 0.28,
    }),
};
