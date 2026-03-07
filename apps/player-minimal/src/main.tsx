// BrightSign OS 9.1.92 with Chrome 120 runtime
// Modern React 19 + Tailwind v4 demo
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.css';
import App from './app/app';
import { DisplayRotation } from './components/DisplayRotation';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in DOM');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <DisplayRotation>
      <App />
    </DisplayRotation>
  </StrictMode>
);