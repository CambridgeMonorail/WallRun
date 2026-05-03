import { FC } from 'react';
import { ConciergeBell } from 'lucide-react';
import {
  CTABanner,
  DirectoryCard,
  LocationIndicator,
  SignageContainer,
  SignageHeader,
} from '@wallrun/shadcnui-signage';
import { SignageExample } from './components/SignageExample';

const directories = [
  { department: 'Reception', floor: 1, room: '101', phone: 'x1001' },
  { department: 'Human Resources', floor: 1, room: '105', phone: 'x1005' },
  { department: 'Marketing', floor: 2, room: '201', phone: 'x2001' },
  { department: 'Sales', floor: 2, room: '205', phone: 'x2005' },
  { department: 'Engineering', floor: 3, room: '301', phone: 'x3001' },
  { department: 'Product Design', floor: 3, room: '305', phone: 'x3005' },
  { department: 'Executive Offices', floor: 4, room: '401', phone: 'x4001' },
  { department: 'Conference Rooms', floor: 4, room: '410-415', phone: 'x4010' },
];

export const OfficeDirectory: FC = () => {
  return (
    <SignageExample>
      <SignageContainer
        variant="blue"
        className="p-4 sm:p-8 lg:p-16"
        data-testid="office-directory"
      >
        <div className="mx-auto max-w-7xl">
          <SignageHeader
            title="Office Directory"
            tagVariant="blue"
            className="text-center"
          >
            <div className="mt-5 sm:mt-6 lg:mt-8">
              <LocationIndicator location="Main Lobby" />
            </div>
          </SignageHeader>

          <div
            className="mb-10 grid grid-cols-1 gap-4 sm:mb-12 sm:gap-6 md:grid-cols-2 lg:mb-16 lg:gap-8"
            data-testid="office-directory-grid"
          >
            {directories.map((dir, index) => (
              <DirectoryCard
                key={dir.department}
                department={dir.department}
                floor={dir.floor}
                room={dir.room}
                phone={dir.phone}
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>

          <footer className="text-center">
            <CTABanner
              message="For assistance, please contact Reception at extension 1001"
              icon={ConciergeBell}
              variant="accent"
            />
          </footer>
        </div>
      </SignageContainer>
    </SignageExample>
  );
};
