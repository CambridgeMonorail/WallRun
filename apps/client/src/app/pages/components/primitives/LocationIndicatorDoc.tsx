import { FC } from 'react';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';
import { LocationIndicator } from '@wallrun/shadcnui-signage';

export const LocationIndicatorDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Primitives"
      name="LocationIndicator"
      description="Current-location chip with map pin iconography for directory and wayfinding screens."
      builtOnSummary="Native signage pill with Lucide iconography and shared utility styling."
      builtOnPoints={[
        'Uses MapPin from Lucide to reinforce place and orientation cues.',
        'Combines a configurable label with the active location value.',
        'Fits naturally into headers, map callouts, and directory landing states.',
      ]}
      example={
        <div className="flex justify-center">
          <LocationIndicator label="Current zone:" location="North Atrium" />
        </div>
      }
      installName="location-indicator"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/primitives/LocationIndicator.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx lucide-react tailwind-merge"
      usageFilename="LobbyHeader.tsx"
      usageCode={`import { LocationIndicator } from '@/components/signage/primitives/LocationIndicator';

export function LobbyHeader() {
  return (
    <LocationIndicator label="You are here:" location="Visitor Reception" />
  );
}`}
      signageNotes={[
        {
          title: 'Orientation Cue',
          body: 'Use LocationIndicator near page titles or maps so viewers always know which zone or building area they are reading.',
        },
        {
          title: 'Header-Friendly',
          body: 'Its pill layout keeps the location visible without needing a full-width header treatment.',
        },
        {
          title: 'Readable Prefix',
          body: 'The optional label helps clarify whether the location is current position, destination, or service point.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/LocationIndicator.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};