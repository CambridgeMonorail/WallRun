import { FC } from 'react';
import { ComponentDocTemplate } from '../../../components/ComponentDocTemplate';
import { MeetingRow } from '@wallrun/shadcnui-signage';

export const MeetingRowDocPage: FC = () => {
  return (
    <ComponentDocTemplate
      category="Primitives"
      name="MeetingRow"
      description="Agenda-style row for meeting schedules, room bookings, and office lobby loop content."
      builtOnSummary="Native schedule row with shared cn utility and tabular alignment."
      builtOnPoints={[
        'Uses tabular numerals for time and room labels so schedule columns stay stable.',
        'Switches from stacked to horizontal layout across breakpoints for large-format readability.',
        'Designed to be repeated inside schedules and panel-based meeting lists.',
      ]}
      example={
        <div className="mx-auto max-w-4xl text-white">
          <MeetingRow time="09:30" title="Design Review" room="Studio A" />
        </div>
      }
      installName="meeting-row"
      sourcePaths={[
        'libs/shadcnui-signage/src/lib/primitives/MeetingRow.tsx',
        'libs/shadcnui-signage/src/lib/utils/cn.ts',
      ]}
      dependencyInstall="pnpm add clsx tailwind-merge"
      usageFilename="RoomSchedule.tsx"
      usageCode={`import { MeetingRow } from '@/components/signage/primitives/MeetingRow';

export function RoomSchedule() {
  return <MeetingRow time="14:15" title="Partner Update" room="North 2" />;
}`}
      signageNotes={[
        {
          title: 'Schedule Legibility',
          body: 'MeetingRow emphasizes time first, then title, then room so viewers can scan fast-moving lobby schedules efficiently.',
        },
        {
          title: 'Repeatable Pattern',
          body: 'Use multiple rows inside a panel or timetable zone rather than treating the component as a standalone callout.',
        },
        {
          title: 'Stable Numerals',
          body: 'Tabular numerals help time and room data stay aligned even when entries refresh throughout the day.',
        },
      ]}
      links={[
        {
          label: 'View Source',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/src/lib/primitives/MeetingRow.tsx',
        },
        {
          label: 'Library README',
          href: 'https://github.com/CambridgeMonorail/WallRun/blob/main/libs/shadcnui-signage/README.md',
        },
      ]}
    />
  );
};