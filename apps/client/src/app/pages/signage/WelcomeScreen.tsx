import { FC } from 'react';
import { SignageExample } from './components/SignageExample';

export const WelcomeScreen: FC = () => {
  return (
    <SignageExample>
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950 relative overflow-hidden"
        data-testid="welcome-screen"
      >
        {/* Animated ambient orbs */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-[32rem] w-[32rem] rounded-full bg-blue-500/20 blur-3xl animate-pulse sm:h-[50rem] sm:w-[50rem]"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-pink-500/20 blur-3xl animate-pulse sm:h-[37.5rem] sm:w-[37.5rem]"
          style={{ animationDelay: '1s' }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl animate-pulse sm:h-[25rem] sm:w-[25rem]"
          style={{ animationDelay: '2s' }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-white/[0.02] bg-[size:80px_80px]"
        />

        <div className="relative z-10 max-w-[22rem] px-4 text-center sm:max-w-4xl sm:px-8 lg:max-w-6xl">
          <div className="mb-8 sm:mb-12">
            <h1 className="mb-4 bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-6xl font-bold leading-none tracking-tight text-transparent sm:text-8xl md:text-[8rem] lg:mb-6 lg:text-[12rem] xl:text-[14rem]">
              Welcome
            </h1>
            <div className="mx-auto mb-8 h-1 w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent sm:mb-12 sm:w-48 md:w-64" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-2xl font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">
              to WallRun
            </p>
            <p className="text-lg font-light text-white/70 sm:text-2xl md:text-3xl lg:text-4xl">
              Digital Signage as Software
            </p>
          </div>
        </div>
      </div>
    </SignageExample>
  );
};
