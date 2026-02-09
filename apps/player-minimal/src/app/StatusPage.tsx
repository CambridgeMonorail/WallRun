import { type FC, useState, useEffect } from 'react';
import './StatusPage.css';

export interface DeviceInfo {
  model?: string;
  serial?: string;
  firmware?: string;
  ip?: string;
  uptime?: number;
}

export interface StatusPageProps {
  version: string;
  buildTimestamp: string;
}

export const StatusPage: FC<StatusPageProps> = ({
  version,
  buildTimestamp,
}) => {
  const [uptime, setUptime] = useState<number>(0);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({});
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>(
    navigator.onLine ? 'online' : 'offline',
  );

  // Update uptime every second
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch BrightSign device info (if available)
  useEffect(() => {
    // Check if we're running on BrightSign (window.roDeviceInfo exists)
    // For now, simulate device info or fetch from diagnostic endpoint
    const fetchDeviceInfo = async () => {
      try {
        // In a real BrightSign environment, you'd access roDeviceInfo here
        // For development, we can fetch from diagnostic endpoint or use placeholders
        const response = await fetch(
          'http://localhost:8008/device_info.json',
        ).catch(() => null);
        if (response?.ok) {
          const data = await response.json();
          setDeviceInfo(data);
        } else {
          // Placeholder for development
          setDeviceInfo({
            model: 'Development Mode',
            serial: 'N/A',
            firmware: 'N/A',
            ip: '127.0.0.1',
          });
        }
      } catch (error) {
        console.error('Failed to fetch device info:', error);
      }
    };

    fetchDeviceInfo();
  }, []);

  const formatUptime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="status-page">
      <div className="status-container">
        <header className="status-header">
          <h1 className="status-title">The Sign Age</h1>
          <p className="status-subtitle">Player Status Monitor</p>
        </header>

        <div className="status-grid">
          <div className="status-card">
            <div className="status-label">Version</div>
            <div className="status-value">{version}</div>
          </div>

          <div className="status-card">
            <div className="status-label">Build Time</div>
            <div className="status-value">{buildTimestamp}</div>
          </div>

          <div className="status-card">
            <div className="status-label">Uptime</div>
            <div className="status-value">{formatUptime(uptime)}</div>
          </div>

          <div className="status-card">
            <div className="status-label">Current Time</div>
            <div className="status-value">{formatDateTime(currentTime)}</div>
          </div>

          <div className="status-card">
            <div className="status-label">Network Status</div>
            <div className={`status-value status-${networkStatus}`}>
              {networkStatus.toUpperCase()}
            </div>
          </div>

          {deviceInfo.model && (
            <>
              <div className="status-card">
                <div className="status-label">Device Model</div>
                <div className="status-value">{deviceInfo.model}</div>
              </div>

              <div className="status-card">
                <div className="status-label">Serial Number</div>
                <div className="status-value">{deviceInfo.serial}</div>
              </div>

              <div className="status-card">
                <div className="status-label">Firmware</div>
                <div className="status-value">{deviceInfo.firmware}</div>
              </div>

              <div className="status-card">
                <div className="status-label">IP Address</div>
                <div className="status-value">{deviceInfo.ip}</div>
              </div>
            </>
          )}
        </div>

        <footer className="status-footer">
          <p>
            Ready for deployment • {networkStatus === 'online' ? '🟢' : '🔴'}{' '}
            Network {networkStatus}
          </p>
        </footer>
      </div>
    </div>
  );
};
