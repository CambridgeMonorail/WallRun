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
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:80px_80px]" />

        <div className="text-center px-8 max-w-6xl relative z-10">
          <div className="mb-12">
            <h1 className="text-[12rem] md:text-[14rem] font-bold mb-6 leading-none bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-transparent tracking-tight">
              Welcome
            </h1>
            <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-12" />
          </div>

          <div className="space-y-6">
            <p className="text-5xl md:text-6xl text-white font-light tracking-wide">
              to WallRun
            </p>
            <p className="text-3xl md:text-4xl text-white/70 font-light">
              Digital Signage as Software
            </p>
          </div>
        </div>
      </div>
    </SignageExample>
  );
};
