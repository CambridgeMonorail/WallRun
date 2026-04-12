import { FC } from 'react';
import { SignageExample } from './components/SignageExample';
import { MapPin } from 'lucide-react';

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
      <div
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-8 lg:p-16"
        data-testid="office-directory"
      >
        {/* Ambient lighting effects */}
        <div
          aria-hidden="true"
          className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl sm:h-96 sm:w-96"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl sm:h-96 sm:w-96"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <header className="mb-10 text-center sm:mb-12 lg:mb-16">
            <h1 className="mb-5 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-5xl font-bold leading-none text-transparent sm:mb-6 sm:text-6xl lg:mb-8 lg:text-8xl">
              Office Directory
            </h1>
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-800/50 bg-blue-950/50 px-4 py-3 text-base text-cyan-300 backdrop-blur-sm sm:gap-4 sm:px-6 sm:text-xl lg:px-8 lg:py-4 lg:text-3xl">
              <MapPin className="h-6 w-6 shrink-0 lg:h-10 lg:w-10" />
              <span>You are here: Main Lobby</span>
            </div>
          </header>

          <div
            className="mb-10 grid grid-cols-1 gap-4 sm:mb-12 sm:gap-6 md:grid-cols-2 lg:mb-16 lg:gap-8"
            data-testid="office-directory-grid"
          >
            {directories.map((dir, index) => (
              <div
                key={dir.department}
                className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-5 shadow-2xl backdrop-blur-md transition-all duration-300 sm:p-6 lg:p-8"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    {dir.department}
                  </h2>
                  <div className="w-fit rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow-lg sm:text-base lg:px-5 lg:text-xl">
                    Floor {dir.floor}
                  </div>
                </div>
                <div className="mb-4 h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-transparent sm:mb-6" />
                <div className="flex flex-col gap-2 text-lg sm:flex-row sm:items-center sm:justify-between sm:text-xl lg:text-2xl">
                  <span className="font-semibold text-cyan-300">Room {dir.room}</span>
                  <span className="font-mono text-blue-300">{dir.phone}</span>
                </div>
              </div>
            ))}
          </div>

          <footer className="rounded-3xl border border-blue-500/50 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 p-5 text-center text-white shadow-2xl sm:p-8 lg:p-10">
            <p className="text-lg font-medium sm:text-2xl lg:text-3xl">
              For assistance, please contact Reception at extension 1001
            </p>
          </footer>
        </div>
      </div>
    </SignageExample>
  );
};
