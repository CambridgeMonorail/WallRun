import { FC } from 'react';
import { SignageExample } from './components/SignageExample';
import { Calendar, Trophy, Users, Coffee } from 'lucide-react';
import {
  SignageContainer,
  SignageHeader,
  AnnouncementCard,
} from '@wallrun/shadcnui-signage';

const announcements = [
  {
    id: 1,
    title: 'Team Building Event',
    description:
      'Join us for our quarterly team building event at the park. Food and drinks provided!',
    date: 'Friday, Feb 14',
    icon: Users,
    category: 'Event',
  },
  {
    id: 2,
    title: 'Q1 Sales Achievement',
    description:
      'Congratulations to the sales team for exceeding Q1 targets by 25%!',
    date: 'This Week',
    icon: Trophy,
    category: 'Celebration',
  },
  {
    id: 3,
    title: 'New Coffee Machine',
    description:
      'The new espresso machine is now available in the break room. Enjoy!',
    date: 'Today',
    icon: Coffee,
    category: 'Facility',
  },
  {
    id: 4,
    title: 'Product Launch Meeting',
    description:
      'All hands meeting to discuss the upcoming product launch. Conference Room A.',
    date: 'Monday, Feb 10 at 2 PM',
    icon: Calendar,
    category: 'Meeting',
  },
];

export const AnnouncementsBoard: FC = () => {
  return (
    <SignageExample>
      <SignageContainer
        variant="pink"
        showGrid={false}
        data-testid="announcements-board"
        className="bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950"
      >
        {/* Additional grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />

        <SignageHeader
          tag="Company News"
          tagVariant="pink"
          title="Announcements"
        >
          <p className="text-4xl text-white/90 font-light mt-2">
            Stay informed about what's happening
          </p>
        </SignageHeader>

        <div className="max-w-6xl mx-auto space-y-8">
          {announcements.map((announcement, index) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              description={announcement.description}
              date={announcement.date}
              icon={announcement.icon}
              category={announcement.category}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </SignageContainer>
    </SignageExample>
  );
};
