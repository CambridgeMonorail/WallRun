import { FC } from 'react';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';
import { InfoList } from '@wallrun/shadcnui-signage';

export const InfoListDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Primitives"
      name="InfoList"
      description="Large-format bullet list for lobby messages, instructions, and operational notes."
      builtOnSummary="Native unordered list with shared cn utility and signage-sized list styling."
      builtOnPoints={[
        'Displays operational notes as a clean stacked list with generous spacing.',
        'Keeps body copy large enough for queueing areas, lobbies, and service counters.',
        'Works inside panels, sidebars, and secondary message zones.',
      ]}
      example={
        <div className="mx-auto max-w-4xl text-white">
          <InfoList
            items={[
              'Check in at reception on arrival.',
              'Guest Wi-Fi details are available from the host desk.',
              'Workshop rooms open ten minutes before each session.',
            ]}
          />
        </div>
      }
      installName="info-list"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/primitives/InfoList.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx tailwind-merge"
      usageFilename="VisitorInfo.tsx"
      usageCode={`import { InfoList } from '@/components/signage/primitives/InfoList';

export function VisitorInfo() {
  return (
    <InfoList
      items={[
        'Badge collection closes at 17:00.',
        'Use the east entrance after 18:00.',
      ]}
    />
  );
}`}
      signageNotes={[
        {
          title: 'Bullet-Led Messaging',
          body: 'Use InfoList for concise operational instructions rather than long paragraphs that are harder to scan at distance.',
        },
        {
          title: 'Panel Companion',
          body: 'The component pairs well with SignagePanel when you need framed supporting notes alongside a primary hero or schedule.',
        },
        {
          title: 'Consistent Rhythm',
          body: 'Keep list items short and parallel so the spacing and typographic rhythm do most of the legibility work.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/InfoList.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};