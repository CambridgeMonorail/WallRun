import { type FC, useState, useEffect } from 'react';

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
  const cardClassName =
    'bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-card/70 hover:border-accent/40 hover:shadow-lg';

  const normalizeDeviceInfo = (data: unknown): DeviceInfo => {
    if (!data || typeof data !== 'object') {
      return {};
    }

    const record = data as Record<string, unknown>;

    const asString = (value: unknown): string | undefined =>
      typeof value === 'string' ? value : undefined;

    const asNumber = (value: unknown): number | undefined => {
      if (typeof value === 'number') {
        return Number.isFinite(value) ? value : undefined;
      }
      if (typeof value === 'string') {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : undefined;
      }
      return undefined;
    };

    return {
      model: asString(record.model) ?? asString(record.Model),
      serial: asString(record.serial) ?? asString(record.Serial),
      firmware: asString(record.firmware) ?? asString(record.Firmware),
      ip: asString(record.ip) ?? asString(record.ipAddress) ?? asString(record.ip_address),
      uptime: asNumber(record.uptime),
    };
  };

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
        // BrightSign Diagnostic Web Server endpoint
        const response = await fetch('http://localhost:8008/GetDeviceInfo').catch(
          () => null,
        );
        if (response?.ok) {
          const data: unknown = await response.json();
          setDeviceInfo(normalizeDeviceInfo(data));
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-card text-foreground p-8">
      <div className="max-w-7xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-2 text-foreground">
            The Sign Age
          </h1>
          <p className="text-2xl text-muted-foreground">
            Player Status Monitor
          </p>
        </header>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-12">
          <div className={cardClassName}>
            <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
              Version
            </div>
            <div className="text-3xl font-semibold break-all">{version}</div>
          </div>

          <div className={cardClassName}>
            <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
              Build Time
            </div>
            <div className="text-3xl font-semibold break-all">
              {buildTimestamp}
            </div>
          </div>

          <div className={cardClassName}>
            <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
              Uptime
            </div>
            <div className="text-3xl font-semibold break-all">
              {formatUptime(uptime)}
            </div>
          </div>

          <div className={cardClassName}>
            <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
              Current Time
            </div>
            <div className="text-3xl font-semibold break-all">
              {formatDateTime(currentTime)}
            </div>
          </div>

          <div className={cardClassName}>
            <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
              Network Status
            </div>
            <div
              className={`text-3xl font-semibold break-all ${networkStatus === 'online' ? 'text-green-500' : 'text-red-500'}`}
            >
              {networkStatus.toUpperCase()}
            </div>
          </div>

          {deviceInfo.model && (
            <>
              <div className={cardClassName}>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                  Device Model
                </div>
                <div className="text-3xl font-semibold break-all">
                  {deviceInfo.model}
                </div>
              </div>

              <div className={cardClassName}>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                  Serial Number
                </div>
                <div className="text-3xl font-semibold break-all">
                  {deviceInfo.serial}
                </div>
              </div>

              <div className={cardClassName}>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                  Firmware
                </div>
                <div className="text-3xl font-semibold break-all">
                  {deviceInfo.firmware}
                </div>
              </div>

              <div className={cardClassName}>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                  IP Address
                </div>
                <div className="text-3xl font-semibold break-all">
                  {deviceInfo.ip}
                </div>
              </div>
            </>
          )}
        </div>

        <footer className="text-center pt-8 border-t border-border/50">
          <p className="text-lg text-muted-foreground">
            Ready for deployment • {networkStatus === 'online' ? '🟢' : '🔴'}{' '}
            Network {networkStatus}
          </p>
        </footer>
      </div>
    </div>
  );
};
