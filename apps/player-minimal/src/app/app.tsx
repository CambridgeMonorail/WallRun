import { useState, useEffect } from 'react';

const VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0';
const BUILD_TIMESTAMP = import.meta.env.VITE_BUILD_TIMESTAMP || new Date().toISOString();

export function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-stretch justify-center px-8 py-8">
      <div className="w-full flex flex-col justify-between max-w-5xl">
        {/* Header */}
        <div className="text-center space-y-2 mt-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent pb-2">
            The Sign Age
          </h1>
          <p className="text-lg text-slate-300">
            Modern Digital Signage for Web Developers
          </p>
        </div>

        {/* Clock Display */}
        <div className="text-center space-y-2">
          <div className="text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
            {timeString}
          </div>
          <div className="text-2xl text-slate-300 font-light">
            {dateString}
          </div>
        </div>

        {/* Feature Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/20 rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center items-center h-20 mb-4">
              <div className="text-6xl leading-none">⚡</div>
            </div>
            <h3 className="text-2xl font-semibold mb-3">React 19</h3>
            <p className="text-base text-slate-400 text-center">Latest React with full hooks support</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/20 rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center items-center h-20 mb-4">
              <div className="text-6xl leading-none">🎨</div>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Tailwind v4</h3>
            <p className="text-base text-slate-400 text-center">Modern utility-first CSS framework</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/20 rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center items-center h-20 mb-4">
              <div className="text-6xl leading-none">🧩</div>
            </div>
            <h3 className="text-2xl font-semibold mb-3">shadcn/ui</h3>
            <p className="text-base text-slate-400 text-center">Beautiful accessible components</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-400/20 rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center items-center h-20 mb-4">
              <div className="text-6xl leading-none">🖥️</div>
            </div>
            <h3 className="text-2xl font-semibold mb-3">BrightSign</h3>
            <p className="text-base text-slate-400 text-center">Chrome 120 on OS 9.1.92</p>
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-5">
          <div className="flex items-center justify-center gap-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-base font-medium">System Status: Operational</span>
            <span className="text-sm text-slate-300">
              Build {VERSION} • {new Date(BUILD_TIMESTAMP).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>Built with Vite • Deployed via REST API • Running on BrightSign Hardware</p>
        </div>
      </div>
    </div>
  );
}

export default App;
