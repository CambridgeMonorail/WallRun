import { FC } from 'react';
import { SignageExample } from './components/SignageExample';
import {
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
        className="bg-gradient-to-br from-violet-950 via-slate-950 to-indigo-950"
      >
        {/* Additional background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <SignageHeader
          tag="Conference Schedule"
          tagVariant="violet"
          title="Today's Schedule"
          subtitle="Digital Signage Summit 2026 • February 7"
        />

        <div className="max-w-6xl mx-auto space-y-6">
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

        <footer className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 backdrop-blur-sm border border-violet-500/30 rounded-2xl px-12 py-6">
            <p className="text-2xl text-violet-200">
              Download the mobile app for personalized schedule and
              notifications
            </p>
          </div>
        </footer>
      </SignageContainer>
    </SignageExample>
  );
};
