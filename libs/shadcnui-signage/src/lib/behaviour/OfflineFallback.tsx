import { type ReactNode, useEffect, useState } from 'react';
import { cn } from '@wallrun/shadcnui';

export interface OfflineFallbackProps {
  isOnline?: boolean;
  isHealthy?: boolean;
  fallback: ReactNode;
  children: ReactNode;
  className?: string;
}

function getNavigatorOnline() {
  if (typeof navigator === 'undefined') {
    return true;
  }
  return navigator.onLine;
}

/**
 * OfflineFallback
 *
 * A boundary for networked content that renders a stable fallback when offline
 * (or when an app-provided health signal is false).
 */
export function OfflineFallback({
  isOnline,
  isHealthy = true,
  fallback,
  children,
  className,
}: OfflineFallbackProps) {
  const [navigatorOnline, setNavigatorOnline] = useState(getNavigatorOnline);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    const update = () => setNavigatorOnline(getNavigatorOnline());
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  const online = isOnline ?? navigatorOnline;
  const shouldShowFallback = online === false || isHealthy === false;

  return (
    <div className={cn('w-full', className)} data-testid="offline-fallback">
      {shouldShowFallback ? fallback : children}
    </div>
  );
}
