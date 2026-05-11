import { FC } from 'react';
import { DecisionBoard } from '@wallrun/shadcnui-signage';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';

export const DecisionBoardDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Blocks"
      name="DecisionBoard"
      description="Opinionated full-screen routing template for lobbies, receptions, and venues that need one dominant prompt and a small, high-clarity choice set."
      builtOnSummary="Composed block built on SignageContainer, OneMessageFrame, SignagePanel, ActionStrip, and optional QRHandoff."
      builtOnPoints={[
        'Uses OneMessageFrame to keep the decision prompt dominant before the viewer scans the available routes.',
        'Uses a tightly bounded SignagePanel grid so choices remain legible and visually distinct from across the room.',
        'Supports optional ActionStrip guidance and QRHandoff when the routing decision continues on a personal device.',
      ]}
      example={
        <div style={{ height: '720px' }}>
          <DecisionBoard
            eyebrow="Lobby routing"
            title="Choose the service you need"
            message="Follow the option that matches your appointment, enquiry, or document request."
            serviceNote="If you already have a ticket number, keep it visible and proceed only when called."
            options={[
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
            ]}
            qrHandoff={{
              title: 'Open the self-service flow',
              description:
                'Scan to complete forms, receive queue updates, and carry the next steps with you.',
              qrValue: 'https://wallrun.dev/self-service',
              qrLabel: 'Self-service flow',
              qrInstruction: 'Scan for queue updates and private forms',
              shortUrl: 'wallrun.dev/self-service',
            }}
          />
        </div>
      }
      installName="decision-board"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/blocks/DecisionBoard.tsx',
        'libs/shadcnui-signage/src/lib/blocks/OneMessageFrame.tsx',
        'libs/shadcnui-signage/src/lib/blocks/QRHandoff.tsx',
        'libs/shadcnui-signage/src/lib/layouts/SignageContainer.tsx',
        'libs/shadcnui-signage/src/lib/primitives/ActionStrip.tsx',
        'libs/shadcnui-signage/src/lib/primitives/SignagePanel.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx qrcode.react tailwind-merge"
      usageFilename="ReceptionDecisionScreen.tsx"
      usageCode={`import { DecisionBoard } from '@wallrun/shadcnui-signage';

export function ReceptionDecisionScreen() {
  return (
    <DecisionBoard
      eyebrow="Lobby routing"
      title="Choose the service you need"
      message="Follow the option that matches your appointment, enquiry, or document request."
      options={[
        {
          eyebrow: 'Appointments',
          title: 'Check in at Desk A',
          description: 'For booked visits, pre-arranged collections, and clinician referrals.',
          cue: 'Blue counter',
          tone: 'brand',
        },
        {
          eyebrow: 'General enquiries',
          title: 'Speak to Reception',
          description: 'For walk-in questions, visitor badges, and documentation support.',
          cue: 'Main foyer',
        },
      ]}
    />
  );
}`}
      signageNotes={[
        {
          title: 'Choice Boundaries',
          body: 'Keep the visible choice set small. If viewers have more than a few routes to compare, this pattern stops being a decision board and becomes a directory or schedule.',
        },
        {
          title: 'Reading Order',
          body: 'The dominant question should always read first, followed by the options in a clear left-to-right or top-to-bottom sequence.',
        },
        {
          title: 'Private Continuation',
          body: 'Use the QR handoff when the real task continues on a personal device, not as a substitute for making the on-screen choice set understandable.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/DecisionBoard.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};
