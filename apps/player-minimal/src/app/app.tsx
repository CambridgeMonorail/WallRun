// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import { StatusPage } from './StatusPage';

// Version info - update these when deploying
const VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0';
const BUILD_TIMESTAMP =
  import.meta.env.VITE_BUILD_TIMESTAMP || new Date().toISOString();

export function App() {
  // CSS Feature Support Diagnostics
  const cssFeatures = {
    // Critical for Tailwind v4
    'oklch() colors': CSS.supports('color', 'oklch(0.7 0.1 240)'),
    ':where() selector': CSS.supports('selector(:where(*))'),
    'CSS variables': CSS.supports('color', 'var(--test)'),
    
    // Additional features
    'container queries': CSS.supports('container-type', 'inline-size'),
    'flexbox gap': CSS.supports('gap', '1rem'),
    'grid': CSS.supports('display', 'grid'),
    'rgb()': CSS.supports('color', 'rgb(255 0 0)'),
    'rgba()': CSS.supports('color', 'rgba(255, 0, 0, 0.5)'),
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-800 to-slate-700 text-gray-200 p-10 font-sans flex flex-col items-start overflow-auto">
      <h1 className="text-4xl mb-5 text-white">
        CSS Feature Support + Tailwind v4 Test
      </h1>
      <p className="text-lg mb-8 text-slate-400">
        BrightSign OS 9.1.92 + Chrome 120 (External CSS File)
      </p>
      
      <div className="bg-white/10 border-2 border-white/20 rounded-xl p-8 w-full max-w-3xl mb-5">
        <h2 className="text-2xl mb-5 text-white">Runtime Info</h2>
        <div className="grid grid-cols-[200px_1fr] gap-4">
          <div className="text-gray-400">User Agent:</div>
          <div className="text-sm break-all">{navigator.userAgent}</div>
          <div className="text-gray-400">Version:</div>
          <div>{VERSION}</div>
          <div className="text-gray-400">Build:</div>
          <div>{BUILD_TIMESTAMP}</div>
        </div>
      </div>

      <div className="bg-white/10 border-2 border-white/20 rounded-xl p-8 w-full max-w-3xl mb-5">
        <h2 className="text-2xl mb-5 text-white">CSS.supports() Results</h2>
        <div className="flex flex-col gap-3">
          {Object.entries(cssFeatures).map(([feature, supported]) => (
            <div 
              key={feature}
              className="flex items-center justify-between p-3 bg-black/30 rounded-lg"
            >
              <span className="text-base">{feature}</span>
              <span className={`px-4 py-1.5 rounded-md text-sm font-bold text-white ${
                supported ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {supported ? '✓ YES' : '✗ NO'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-500/20 border-2 border-blue-400/40 rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-xl mb-3 text-blue-300 font-bold">Tailwind v4 Rendering Test</h2>
        <p className="text-base text-gray-300">
          If you can see this blue box with proper colors, gradients above, and rounded corners everywhere, 
          <span className="font-bold text-green-400"> Tailwind v4 classes are working!</span>
        </p>
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <p className="text-white font-bold text-center">
            Gradient background test: Purple to Pink
          </p>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        External CSS file (app.css) loaded from assets/
      </p>
    </div>
  );
}

export default App;
