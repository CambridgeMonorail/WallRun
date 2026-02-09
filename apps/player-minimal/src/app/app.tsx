// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import { StatusPage } from './StatusPage';

// Version info - update these when deploying
const VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0';
const BUILD_TIMESTAMP =
  import.meta.env.VITE_BUILD_TIMESTAMP || new Date().toISOString();

export function App() {
  return <StatusPage version={VERSION} buildTimestamp={BUILD_TIMESTAMP} />;
}

export default App;
