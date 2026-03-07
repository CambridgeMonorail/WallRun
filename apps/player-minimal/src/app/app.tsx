// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import { StatusPage } from './StatusPage';

// Version info - update these when deploying
const VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0';
const BUILD_TIMESTAMP =
  import.meta.env.VITE_BUILD_TIMESTAMP || new Date().toISOString();

export function App() {
  // TEMP: Bypassing Tailwind completely -inline styles test
  // Chrome 120 is active but Tailwind CSS not rendering
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      color: '#e5e7eb',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#ffffff' }}>
        The Sign Age
      </h1>
      <p style={{ fontSize: '24px', marginBottom: '40px', color: '#94a3b8' }}>
        React 19 + Chrome 120 Test
      </p>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '30px',
        minWidth: '400px'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>VERSION</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{VERSION}</div>
        </div>
        <div>
          <div style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>BUILD TIME</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{BUILD_TIMESTAMP}</div>
        </div>
      </div>
      <p style={{ marginTop: '40px', fontSize: '16px', color: '#6b7280' }}>
        If you see this, React + Chrome 120 works!
      </p>
    </div>
  );
}

export default App;
