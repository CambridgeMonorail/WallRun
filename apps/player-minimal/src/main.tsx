// BrightSign OS 9.1.92 with Chrome 120 runtime (Series 5 default)
// ES2022 features natively supported
console.log('🚀 [REACT] Starting React app on BrightSign OS 9.1.92...');

console.log('📦 [REACT] Importing React and ReactDOM...');
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
console.log('✅ [REACT] React imports successful');

console.log('🎨 [REACT] Importing styles...');
import './styles.css';
console.log('✅ [REACT] Styles imported');

console.log('🎯 [REACT] Importing App component...');
import App from './app/app';
console.log('✅ [REACT] App component imported');

try {
  console.log('🔍 [REACT] Looking for root element...');
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('❌ [REACT] Root element not found!');
    throw new Error('Root element #root not found in DOM');
  }
  console.log('✅ [REACT] Root element found:', rootElement);

  console.log('🏗️  [REACT] Creating React root...');
  const root = ReactDOM.createRoot(rootElement);
  console.log('✅ [REACT] React root created');

  console.log('🎬 [REACT] Rendering app...');
  root.render(<App />);
  console.log('✅ [REACT] Render called successfully');
  
  // Diagnostic logging
  setTimeout(() => {
    console.log('=== DIAGNOSTIC INFO ===');
    console.log('User Agent:', navigator.userAgent);
    console.log('Root innerHTML length:', rootElement.innerHTML.length);
    console.log('Root children count:', rootElement.children.length);
    console.log('Body children count:', document.body.children.length);
    console.log('First child:', rootElement.children[0]?.tagName, rootElement.children[0]?.className);
    
    // Check computed styles
    if (rootElement.children[0]) {
      const styles = window.getComputedStyle(rootElement.children[0]);
      console.log('First child display:', styles.display);
      console.log('First child visibility:', styles.visibility);
      console.log('First child opacity:', styles.opacity);
      console.log('First child background:', styles.backgroundColor);
      console.log('First child color:', styles.color);
    }

    // CSS FEATURE SUPPORT DIAGNOSTICS (Tailwind v4 requirements)
    console.log('=== CSS FEATURE SUPPORT ===');
    
    // Critical for Tailwind v4
    console.log('CSS.supports oklch():', CSS.supports('color', 'oklch(0.7 0.1 240)'));
    console.log('CSS.supports :where():', CSS.supports('selector(:where(*))'));
    console.log('CSS.supports CSS variables:', CSS.supports('color', 'var(--test)'));
    
    // Additional modern CSS features
    console.log('CSS.supports @layer:', typeof CSS !== 'undefined' && 'supports' in CSS);
    console.log('CSS.supports container queries:', CSS.supports('container-type', 'inline-size'));
    console.log('CSS.supports flexbox gap:', CSS.supports('gap', '1rem'));
    console.log('CSS.supports grid:', CSS.supports('display', 'grid'));
    
    // Color space support
    console.log('CSS.supports rgb():', CSS.supports('color', 'rgb(255 0 0)'));
    console.log('CSS.supports rgba():', CSS.supports('color', 'rgba(255, 0, 0, 0.5)'));
    console.log('CSS.supports hsl():', CSS.supports('color', 'hsl(0 100% 50%)'));
    
    console.log('=== END CSS DIAGNOSTICS ===');
  }, 1000);
  
} catch (error) {
  console.error('💥 [REACT] Fatal error:', error);
  console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
  
  // Show error on screen
  document.body.innerHTML = `
    <div style="background: #ff0000; color: #ffffff; padding: 20px; font-family: monospace; font-size: 24px;">
      <h1>React Error</h1>
      <pre>${error instanceof Error ? error.message : String(error)}</pre>
      <pre style="font-size: 16px;">${error instanceof Error ? error.stack : ''}</pre>
    </div>
  `;
}