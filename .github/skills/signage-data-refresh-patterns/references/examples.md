# Data Refresh Implementation Examples

TypeScript patterns for implementing the data refresh strategies described in [SKILL.md](../SKILL.md).

## Complete `useSignageData` Hook

A production-ready hook that polls a data source, validates before swapping, and implements exponential backoff on failure.

```typescript
import { useState, useEffect, useRef, useCallback } from 'react';

type UseSignageDataOptions<T> = {
  /** Polling interval in milliseconds */
  interval: number;
  /** Validate data before swapping — return false to reject bad data */
  validate?: (data: T) => boolean;
  /** Called on fetch error (for logging, not UI) */
  onError?: (error: unknown) => void;
  /** Milliseconds of sustained failure before reporting offline (default: 600_000 = 10 min) */
  offlineThreshold?: number;
};

type UseSignageDataResult<T> = {
  /** Current data — never undefined after first successful fetch */
  data: T | null;
  /** Whether the initial fetch is still in progress */
  isInitialLoad: boolean;
  /** Whether the data source appears offline */
  isOffline: boolean;
  /** Timestamp of last successful fetch */
  lastUpdated: number | null;
};

function useSignageData<T>(
  fetcher: () => Promise<T>,
  options: UseSignageDataOptions<T>,
): UseSignageDataResult<T> {
  const { interval, validate, onError, offlineThreshold = 600_000 } = options;

  const [data, setData] = useState<T | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const failureCount = useRef(0);
  const firstFailureTime = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getBackoffDelay = useCallback((failures: number): number => {
    // 5s, 15s, 30s, 60s, 120s ceiling
    const delays = [5_000, 15_000, 30_000, 60_000, 120_000];
    return delays[Math.min(failures, delays.length - 1)] ?? 120_000;
  }, []);

  const doFetch = useCallback(async () => {
    try {
      const result = await fetcher();

      // Validate before swapping
      if (validate && !validate(result)) {
        throw new Error('Data validation failed');
      }

      // Success — stage and swap in single update
      setData(result);
      setLastUpdated(Date.now());
      setIsInitialLoad(false);
      setIsOffline(false);

      // Reset failure tracking
      failureCount.current = 0;
      firstFailureTime.current = null;

      // Schedule next fetch at normal interval (add ±10% jitter)
      const jitter = interval * 0.1 * (Math.random() * 2 - 1);
      timerRef.current = setTimeout(doFetch, interval + jitter);
    } catch (error: unknown) {
      onError?.(error);
      failureCount.current += 1;

      if (firstFailureTime.current === null) {
        firstFailureTime.current = Date.now();
      }

      // Check for sustained failure
      if (Date.now() - firstFailureTime.current > offlineThreshold) {
        setIsOffline(true);
      }

      // If initial load failed, mark it done (caller shows static fallback)
      setIsInitialLoad(false);

      // Retry with backoff
      const delay = getBackoffDelay(failureCount.current - 1);
      timerRef.current = setTimeout(doFetch, delay);
    }
  }, [fetcher, interval, validate, onError, offlineThreshold, getBackoffDelay]);

  useEffect(() => {
    doFetch();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [doFetch]);

  return { data, isInitialLoad, isOffline, lastUpdated };
}
```

## Multi-Source Coordination

When a screen depends on multiple independent data sources, fetch each on its own interval:

```typescript
function TransitDashboard() {
  const arrivals = useSignageData(fetchArrivals, { interval: 30_000 });
  const weather = useSignageData(fetchWeather, { interval: 300_000 });
  const alerts = useSignageData(fetchAlerts, { interval: 60_000 });

  return (
    <div className="signage-shell">
      {/* Each zone renders independently with whatever data is available */}
      <ArrivalsZone data={arrivals.data} lastUpdated={arrivals.lastUpdated} />
      <WeatherZone data={weather.data} isOffline={weather.isOffline} />
      <AlertsZone data={alerts.data} />
    </div>
  );
}
```

## Freshness Indicator

A small component that shows when data was last updated:

```typescript
function FreshnessIndicator({ lastUpdated }: { lastUpdated: number | null }) {
  if (!lastUpdated) return null;

  const seconds = Math.floor((Date.now() - lastUpdated) / 1000);
  const label =
    seconds < 60 ? 'Updated just now'
    : seconds < 3600 ? `Updated ${Math.floor(seconds / 60)} min ago`
    : `Updated ${Math.floor(seconds / 3600)}h ago`;

  return (
    <span className="text-xs opacity-50">{label}</span>
  );
}
```
