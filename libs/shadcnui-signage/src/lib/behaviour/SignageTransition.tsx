import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@wallrun/shadcnui';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export interface SignageTransitionProps {
  children: ReactNode;
  type?: 'none' | 'crossfade' | 'slide-left' | 'slide-up';
  durationMs?: number;
  reducedMotionBehaviour?: 'disable' | 'shorten';
  className?: string;
}

type TransitionPhase = 'idle' | 'pre' | 'animating';

/**
 * SignageTransition
 *
 * A constrained transition wrapper designed for signage: predictable, safe,
 * and reduced-motion aware.
 */
export function SignageTransition({
  children,
  type = 'crossfade',
  durationMs = 350,
  reducedMotionBehaviour = 'shorten',
  className,
}: SignageTransitionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [current, setCurrent] = useState<ReactNode>(children);
  const [previous, setPrevious] = useState<ReactNode | null>(null);
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const completeTimeoutRef = useRef<number | null>(null);

  const resolvedDurationMs = prefersReducedMotion
    ? reducedMotionBehaviour === 'disable'
      ? 0
      : Math.min(150, durationMs)
    : durationMs;

  useEffect(() => {
    if (children === current) {
      return;
    }

    if (type === 'none' || resolvedDurationMs === 0) {
      setPrevious(null);
      setPhase('idle');
      setCurrent(children);
      return;
    }

    setPrevious(current);
    setCurrent(children);
    setPhase('pre');

    const raf = window.requestAnimationFrame(() => {
      setPhase('animating');
    });

    if (completeTimeoutRef.current !== null) {
      window.clearTimeout(completeTimeoutRef.current);
    }
    completeTimeoutRef.current = window.setTimeout(() => {
      setPrevious(null);
      setPhase('idle');
    }, resolvedDurationMs);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [children, current, resolvedDurationMs, type]);

  useEffect(() => {
    return () => {
      if (completeTimeoutRef.current !== null) {
        window.clearTimeout(completeTimeoutRef.current);
      }
    };
  }, []);

  const base = cn('relative overflow-hidden', className);
  const layer = cn(
    'absolute inset-0 will-change-transform will-change-opacity',
    phase === 'idle' && 'relative',
  );

  const transitionStyle =
    type === 'none'
      ? undefined
      : ({
          transitionProperty: 'opacity, transform',
          transitionDuration: `${resolvedDurationMs}ms`,
          transitionTimingFunction: 'linear',
        } satisfies CSSProperties);

  if (previous === null || type === 'none' || resolvedDurationMs === 0) {
    return <div className={base}>{current}</div>;
  }

  const isAnimating = phase === 'animating';

  const outgoingClasses =
    type === 'crossfade'
      ? cn('opacity-100', isAnimating && 'opacity-0')
      : type === 'slide-left'
        ? cn(
            'translate-x-0 opacity-100',
            isAnimating && '-translate-x-6 opacity-0',
          )
        : cn(
            'translate-y-0 opacity-100',
            isAnimating && '-translate-y-6 opacity-0',
          );

  const incomingClasses =
    type === 'crossfade'
      ? cn('opacity-0', isAnimating && 'opacity-100')
      : type === 'slide-left'
        ? cn(
            'translate-x-6 opacity-0',
            isAnimating && 'translate-x-0 opacity-100',
          )
        : cn(
            'translate-y-6 opacity-0',
            isAnimating && 'translate-y-0 opacity-100',
          );

  return (
    <div className={base}>
      <div className={cn(layer, outgoingClasses)} style={transitionStyle}>
        {previous}
      </div>
      <div className={cn(layer, incomingClasses)} style={transitionStyle}>
        {current}
      </div>
    </div>
  );
}
