import { FC } from 'react';
import { Smartphone } from 'lucide-react';
import { SignageExample } from './components/SignageExample';
import {
  CTABanner,
  SignageContainer,
  SignageHeader,
  EventCard,
} from '@wallrun/shadcnui-signage';

interface Event {
  time: string;
  title: string;
  speaker: string;
  room: string;
  track: string;
}

const events: Event[] = [
  {
    time: '9:00 AM',
    title: 'Opening Keynote: The Future of Digital Signage',
    speaker: 'Dr. Sarah Chen',
    room: 'Main Auditorium',
    track: 'Keynote',
  },
  {
    time: '10:30 AM',
    title: 'Building Scalable Signage Solutions',
    speaker: 'Michael Rodriguez',
    room: 'Room A',
    track: 'Technical',
  },
  {
    time: '10:30 AM',
    title: 'Design Principles for Distance Viewing',
    speaker: 'Emma Thompson',
    room: 'Room B',
    track: 'Design',
  },
  {
    time: '12:00 PM',
    title: 'Lunch & Networking',
    speaker: 'All Attendees',
    room: 'Cafeteria',
    track: 'Social',
  },
  {
    time: '1:30 PM',
    title: 'Interactive Signage with React',
    speaker: 'James Wilson',
    room: 'Room A',
    track: 'Technical',
  },
  {
    time: '1:30 PM',
    title: 'Content Strategy for Retail Displays',
    speaker: 'Lisa Park',
    room: 'Room B',
    track: 'Business',
  },
  {
    time: '3:00 PM',
    title: 'Closing Remarks & Q&A',
    speaker: 'Conference Organizers',
    room: 'Main Auditorium',
    track: 'Keynote',
  },
];

export const EventSchedule: FC = () => {
  return (
    <SignageExample>
      <SignageContainer
        variant="violet"
        showGrid={false}
        data-testid="event-schedule"
        className="bg-slate-950"
      >
        {/* Additional background effects */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--secondary)_/_0.16),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"
        />

        <SignageHeader
          tag="Conference Schedule"
          tagVariant="violet"
          title="Today's Schedule"
          subtitle="Digital Signage Summit 2026 • February 7"
        />

        <div
          className="mx-auto max-w-6xl space-y-4 sm:space-y-5 lg:space-y-6"
          data-testid="event-schedule-list"
        >
          {events.map((event, index) => (
            <EventCard
              key={index}
              time={event.time}
              title={event.title}
              speaker={event.speaker}
              room={event.room}
              track={event.track}
            />
          ))}
        </div>

        <footer className="mt-10 text-center sm:mt-12 lg:mt-16">
          <CTABanner
            message="Download the mobile app for personalized schedule and notifications"
            icon={Smartphone}
          />
        </footer>
      </SignageContainer>
    </SignageExample>
  );
};
