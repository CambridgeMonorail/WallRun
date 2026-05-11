import { FC } from 'react';
import { ArrivalBoard } from '@wallrun/shadcnui-signage';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';

export const ArrivalBoardDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Blocks"
      name="ArrivalBoard"
      description="Opinionated full-screen arrival template for reception, clinic, and event-entry screens that need one dominant message and one clear next step."
      builtOnSummary="Composed block built on SignageContainer, OneMessageFrame, and optional QRHandoff."
      builtOnPoints={[
        'Owns the full-screen shell so arrival guidance feels intentional rather than assembled ad hoc.',
        'Uses OneMessageFrame to keep the main arrival instruction dominant and readable at distance.',
        "Supports optional QRHandoff when the arrival job continues on the viewer's phone.",
      ]}
      example={
        <div style={{ height: '720px' }}>
          <ArrivalBoard
            eyebrow="Visitor reception"
            title="Check in at Desk 3 before entering the atrium"
            message="Staff will issue your badge, confirm your host, and direct you to the correct meeting floor."
            nextStep="Follow the illuminated floor markers"
            serviceNote="If you need step-free access, speak to the concierge beside the south entrance."
            qrHandoff={{
              title: 'Finish arrival on your phone',
              description:
                'Scan to confirm your host, receive your floor pass, and keep the venue guide with you.',
              qrValue: 'https://wallrun.dev/visitor-arrival',
              qrLabel: 'Visitor arrival flow',
              qrInstruction: 'Scan for host details and venue guidance',
              shortUrl: 'wallrun.dev/visitor-arrival',
              eyebrow: 'Arrive prepared',
            }}
          />
        </div>
      }
      installName="arrival-board"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/blocks/ArrivalBoard.tsx',
        'libs/shadcnui-signage/src/lib/blocks/OneMessageFrame.tsx',
        'libs/shadcnui-signage/src/lib/blocks/QRHandoff.tsx',
        'libs/shadcnui-signage/src/lib/layouts/SignageContainer.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx qrcode.react tailwind-merge"
      usageFilename="ReceptionArrival.tsx"
      usageCode={`import { ArrivalBoard } from '@wallrun/shadcnui-signage';

export function ReceptionArrival() {
  return (
    <ArrivalBoard
      eyebrow="Visitor reception"
      title="Check in at Desk 3 before entering the atrium"
      message="Staff will issue your badge and direct you to the correct floor."
      nextStep="Follow the illuminated floor markers"
      qrHandoff={{
        title: 'Finish arrival on your phone',
        description: 'Scan for host details and venue guidance.',
        qrValue: 'https://wallrun.dev/visitor-arrival',
        qrLabel: 'Visitor arrival flow',
        shortUrl: 'wallrun.dev/visitor-arrival',
      }}
    />
  );
}`}
      signageNotes={[
        {
          title: 'Single Journey Stage',
          body: 'Use ArrivalBoard for the start of a public journey such as check-in, onboarding, or first-orientation, not for dense live dashboards.',
        },
        {
          title: 'One Next Step',
          body: 'Keep the next-step treatment to one dominant instruction so the screen remains glanceable from across a lobby or waiting area.',
        },
        {
          title: 'Phone Continuation',
          body: 'Add the QR handoff only when it genuinely reduces queue friction or helps the viewer continue privately on their own device.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/ArrivalBoard.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};
