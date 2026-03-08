import { useState, useEffect } from 'react';

const VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0';
const BUILD_TIMESTAMP =
  import.meta.env.VITE_BUILD_TIMESTAMP || new Date().toISOString();

export function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const period = currentTime.getHours() >= 12 ? 'PM' : 'AM';
  const displayTime = (() => {
    const hours = currentTime.getHours();
    const hour12 = hours % 12 || 12;
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    return `${hour12}:${minutes}:${seconds}`;
  })();

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* Dynamic gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="relative h-full flex flex-col justify-between p-8">
        {/* Top: Minimal Brand */}
        <div className="text-center">
          <div className="text-2xl font-light tracking-[0.3em] text-white/60">
            THE SIGN AGE
          </div>
        </div>

        {/* Center: HERO TIME */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-8">
            <div className="flex items-start justify-center gap-3">
              <div
                className="text-[7rem] font-black leading-none tracking-tight tabular-nums"
                style={{
                  background:
                    'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f0abfc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
                }}
              >
                {displayTime}
              </div>
              <div
                className="text-4xl font-bold mt-3 tracking-wide"
                style={{
                  background:
                    'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f0abfc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {period}
              </div>
            </div>
            <div className="text-2xl font-light text-white/70 tracking-wide">
              {dateString}
            </div>
          </div>
        </div>

        {/* Bottom: Clean Tech Stack */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-8 text-xl">
            <span className="font-medium text-blue-400">React 19</span>
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            <span className="font-medium text-purple-400">Tailwind v4</span>
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            <span className="font-medium text-pink-400">shadcn/ui</span>
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            <span className="font-medium text-fuchsia-400">BrightSign</span>
          </div>
          <div className="text-center text-sm text-white/40 tracking-wider">
            Digital Signage as Software
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
