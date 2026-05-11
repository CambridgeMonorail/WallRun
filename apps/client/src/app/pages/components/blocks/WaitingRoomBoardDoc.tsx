import { FC } from 'react';
import { WaitingRoomBoard } from '@wallrun/shadcnui-signage';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';

export const WaitingRoomBoardDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Blocks"
      name="WaitingRoomBoard"
      description="Opinionated full-screen waiting-area template for clinics, lounges, and collection zones that need one calm instruction, clear expectation setting, and a small number of lightweight service updates."
      builtOnSummary="Composed block built on SignageContainer, OneMessageFrame, ActionStrip, and optional QRHandoff."
      builtOnPoints={[
        'Uses OneMessageFrame so the dominant waiting instruction stays readable from across the room.',
        'Adds a dedicated wait summary panel for expectation-setting without turning the screen into a dense dashboard.',
        'Limits lightweight updates to ActionStrip surfaces so service notices remain subordinate to the main message.',
      ]}
      example={
        <div style={{ height: '720px' }}>
          <WaitingRoomBoard
            eyebrow="Clinic waiting room"
            title="Please remain seated until your name appears"
            message="Staff will call each patient directly when the next clinician is ready."
            reassurance="If your appointment time has passed, stay seated and staff will update you shortly."
            estimatedWait="12 min"
            waitDetail="Triage is currently running slightly behind schedule."
            updates={[
              { message: 'Forms are available at the reception desk.' },
              {
                message: 'Paediatric appointments are checking in at Window 2.',
                tone: 'brand',
              },
            ]}
            qrHandoff={{
              title: 'Complete forms on your phone',
              description:
                'Scan to review appointment details, confirm your contact information, and finish intake privately while you wait.',
              qrValue: 'https://wallrun.dev/clinic-waiting',
              qrLabel: 'Clinic waiting flow',
              qrInstruction: 'Scan to complete intake while you wait',
              shortUrl: 'wallrun.dev/clinic-waiting',
              eyebrow: 'Private waiting-room handoff',
            }}
          />
        </div>
      }
      installName="waiting-room-board"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/blocks/WaitingRoomBoard.tsx',
        'libs/shadcnui-signage/src/lib/blocks/OneMessageFrame.tsx',
        'libs/shadcnui-signage/src/lib/blocks/QRHandoff.tsx',
        'libs/shadcnui-signage/src/lib/layouts/SignageContainer.tsx',
        'libs/shadcnui-signage/src/lib/primitives/ActionStrip.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx qrcode.react tailwind-merge"
      usageFilename="ClinicWaitingRoom.tsx"
      usageCode={`import { WaitingRoomBoard } from '@wallrun/shadcnui-signage';

export function ClinicWaitingRoom() {
  return (
    <WaitingRoomBoard
      eyebrow="Clinic waiting room"
      title="Please remain seated until your name appears"
      message="Staff will call each patient directly when the next clinician is ready."
      reassurance="If your appointment time has passed, stay seated and staff will update you shortly."
      estimatedWait="12 min"
      waitDetail="Triage is currently running slightly behind schedule."
      updates={[
        { message: 'Forms are available at the reception desk.' },
        {
          message: 'Paediatric appointments are checking in at Window 2.',
          tone: 'brand',
        },
      ]}
    />
  );
}`}
      signageNotes={[
        {
          title: 'Expectation First',
          body: 'Use WaitingRoomBoard when the main job is calming a dwell space, setting expectations, and preventing people from repeatedly approaching staff.',
        },
        {
          title: 'Update Discipline',
          body: 'Keep updates short and few in number so the dominant waiting instruction remains the first thing a viewer understands.',
        },
        {
          title: 'Private Continuation',
          body: "Add the QR handoff only when forms, order tracking, or contact updates genuinely belong on the viewer's own device.",
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/blocks/WaitingRoomBoard.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};
