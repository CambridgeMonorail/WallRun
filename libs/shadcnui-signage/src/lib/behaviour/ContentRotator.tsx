import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import type { NowProvider } from '../types/time.types';
import { useTicker } from '../hooks/useTicker';
import { SignageTransition } from './SignageTransition';

export interface ContentRotatorProps {
  children: ReactNode[];
  intervalMs: number;
  startIndex?: number;
  isPaused?: boolean;
  transition?: 'none' | 'fade' | 'slide';
  transitionDurationMs?: number;
  now?: NowProvider;
  onIndexChange?: (index: number) => void;
  className?: string;
}

/**
 * ContentRotator
 *
 * Rotate between multiple pieces of content on a fixed cadence, with
 * optional transitions and pause controls.
 */
export function ContentRotator({
  children,
  intervalMs,
  startIndex = 0,
  isPaused = false,
  transition = 'fade',
  transitionDurationMs,
  now,
  onIndexChange,
  className,
}: ContentRotatorProps) {
  const safeChildren = useMemo(() => children.filter(Boolean), [children]);
  const childCount = safeChildren.length;

  const [index, setIndex] = useState(() => {
    if (childCount === 0) {
      return 0;
    }
    return Math.max(0, Math.min(startIndex, childCount - 1));
  });

  useEffect(() => {
    if (childCount === 0) {
      setIndex(0);
      return;
    }

    setIndex((existing) => Math.max(0, Math.min(existing, childCount - 1)));
  }, [childCount]);

  const enabled = !isPaused && childCount > 1;
  const tick = useTicker({ intervalMs, enabled, now, alignTo: 'none' });
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      lastTickRef.current = null;
      return;
    }

    if (lastTickRef.current === null) {
      lastTickRef.current = tick;
      return;
    }

    if (lastTickRef.current === tick) {
      return;
    }

    lastTickRef.current = tick;

    setIndex((prev) => {
      const next = childCount === 0 ? 0 : (prev + 1) % childCount;
      onIndexChange?.(next);
      return next;
    });
  }, [childCount, enabled, onIndexChange, tick]);

  const activeChild = childCount === 0 ? null : safeChildren[index];

  const transitionType =
    transition === 'none'
      ? 'none'
      : transition === 'slide'
        ? 'slide-left'
        : 'crossfade';

  const resolvedDurationMs =
    transitionDurationMs ?? (transition === 'none' ? 0 : 350);

  return (
    <div className={cn('w-full', className)} data-testid="content-rotator">
      {transition === 'none' ? (
        activeChild
      ) : (
        <SignageTransition
          type={transitionType}
          durationMs={resolvedDurationMs}
        >
          {activeChild}
        </SignageTransition>
      )}
    </div>
  );
}
