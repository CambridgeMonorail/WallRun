import { FC } from 'react';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';
import { InfoList, SignagePanel } from '@wallrun/shadcnui-signage';

export const SignagePanelDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Primitives"
      name="SignagePanel"
      description="Bordered content panel for grouped operational or supporting information on signage screens."
      builtOnSummary="Glass-like content panel built with shared cn utility and optional panel labeling."
      builtOnPoints={[
        'Creates a restrained bordered container for secondary or supporting content.',
        'Supports an optional label line above the main panel body.',
        'Works well with child content such as InfoList, MeetingRow, or custom markup.',
      ]}
      example={
        <div className="mx-auto max-w-4xl text-white">
          <SignagePanel label="Visitor Notes">
            <InfoList
              items={[
                'Check in at reception before entering the studio floor.',
                'Use the blue lift bank for rooms 3.01 to 3.18.',
              ]}
            />
          </SignagePanel>
        </div>
      }
      installName="signage-panel"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/primitives/SignagePanel.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx tailwind-merge"
      usageFilename="LobbyNotes.tsx"
      usageCode={`import { SignagePanel } from '@/components/signage/primitives/SignagePanel';

export function LobbyNotes() {
  return (
    <SignagePanel label="Today">
      <p className="text-2xl text-white/80">Reception closes at 18:30.</p>
    </SignagePanel>
  );
}`}
      signageNotes={[
        {
          title: 'Secondary Information',
          body: 'Use SignagePanel for grouped notes, schedules, or status items that should feel contained but still readable from distance.',
        },
        {
          title: 'Content Flexibility',
          body: 'The component is intentionally lightweight so it can host lists, rows, or richer custom content without dictating the inner layout.',
        },
        {
          title: 'Quiet Framing',
          body: 'Its subtle border and translucent background help supporting content stay visually subordinate to the main headline area.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/SignagePanel.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};