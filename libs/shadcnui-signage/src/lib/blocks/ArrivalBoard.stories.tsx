import type { Meta, StoryObj } from '@storybook/react';
import { ScreenFrame } from '../primitives/ScreenFrame';
import { ArrivalBoard } from './ArrivalBoard';
import type { ArrivalBoardProps } from './ArrivalBoard';

const renderPreview = (
  args: ArrivalBoardProps,
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
      <ArrivalBoard {...args} />
    </ScreenFrame>
  </div>
);

const meta: Meta<typeof ArrivalBoard> = {
  title: 'Signage/Blocks/ArrivalBoard',
  component: ArrivalBoard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ArrivalBoard is an opinionated full-screen template for arrival moments such as reception check-in, clinic onboarding, and event entry guidance. It keeps one dominant message, one next step, and an optional phone continuation path without turning the screen into a generic dashboard.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArrivalBoard>;

export const ReceptionCheckIn: Story = {
  args: {
    eyebrow: 'Visitor reception',
    title: 'Check in at Desk 3 before entering the atrium',
    message:
      'Staff will issue your badge, confirm your host, and direct you to the correct meeting floor.',
    nextStep: 'Follow the illuminated floor markers',
    serviceNote:
      'If you need step-free access, speak to the concierge beside the south entrance.',
    variant: 'blue',
  },
  render: (args) =>
    renderPreview(args, {
      resolution: '1080p',
      scale: 0.38,
    }),
};

export const EventArrivalHandoff: Story = {
  args: {
    eyebrow: 'Summit arrivals',
    title: 'Welcome to WallRun Summit 2026',
    message:
      'Collect your badge at the east registration bank, then continue to Hall B for opening remarks.',
    nextStep: 'Registration opens at 08:30',
    serviceNote:
      'Late arrivals can use the help desk beside the main escalator.',
    variant: 'violet',
    qrHandoff: {
      title: 'Finish arrival on your phone',
      description:
        'Scan for your personal agenda, live room changes, accessibility notes, and venue navigation.',
      qrValue: 'https://wallrun.dev/summit',
      qrLabel: 'Summit companion app',
      qrInstruction: 'Scan for agenda, badge details, and venue guidance',
      shortUrl: 'wallrun.dev/summit',
      eyebrow: 'Arrive prepared',
    },
  },
  render: (args) =>
    renderPreview(args, {
      resolution: '1080p',
      scale: 0.36,
    }),
};

export const PortraitClinicArrival: Story = {
  args: {
    eyebrow: 'Clinic arrivals',
    title: 'Please confirm your appointment before taking a seat',
    message:
      'Show your booking reference at the reception desk or scan below to complete your check-in privately on your phone.',
    nextStep: 'Reception desk is directly ahead',
    serviceNote:
      'If you are early, staff will advise when your clinician is ready.',
    variant: 'teal',
    qrHandoff: {
      title: 'Confirm arrival privately',
      description:
        'Scan to confirm your details, update contact preferences, and review clinic guidance before your appointment.',
      qrValue: 'https://wallrun.dev/clinic-arrival',
      qrLabel: 'Clinic self check-in',
      qrInstruction: 'Scan to confirm your appointment details',
      shortUrl: 'wallrun.dev/clinic-arrival',
      eyebrow: 'Private check-in option',
    },
  },
  render: (args) =>
    renderPreview(args, {
      resolution: 'portrait-1080p',
      scale: 0.3,
    }),
};
