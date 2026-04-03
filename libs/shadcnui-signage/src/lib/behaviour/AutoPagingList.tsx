import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@wallrun/shadcnui';
import type { NowProvider } from '../types/time.types';
import { useTicker } from '../hooks/useTicker';

export interface AutoPagingListProps<T> {
  items: T[];
  pageSize: number;
  dwellMs: number;
  renderItem: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => React.Key;
  now?: NowProvider;
  isPaused?: boolean;
  onPageChange?: (pageIndex: number) => void;
  className?: string;
}

function defaultGetKey<T>(_item: T, index: number) {
  return index;
}

/**
 * AutoPagingList
 *
 * Renders long lists as pages (no scrolling), with dwell time per page.
 */
export function AutoPagingList<T>({
  items,
  pageSize,
  dwellMs,
  renderItem,
  getKey,
  now,
  isPaused = false,
  onPageChange,
  className,
}: AutoPagingListProps<T>) {
  const resolvedGetKey = getKey ?? defaultGetKey;

  const keys = useMemo(
    () => items.map((item, index) => resolvedGetKey(item, index)),
    [items, resolvedGetKey],
  );

  const pageCount = pageSize > 0 ? Math.ceil(items.length / pageSize) : 0;

  const [pageIndex, setPageIndex] = useState(0);
  const firstVisibleKeyRef = useRef<React.Key | null>(null);

  // Keep pageIndex in range.
  useEffect(() => {
    if (pageCount === 0) {
      setPageIndex(0);
      return;
    }

    setPageIndex((p) => Math.max(0, Math.min(p, pageCount - 1)));
  }, [pageCount]);

  // Track the first visible item's key for "keep in view" on updates.
  useEffect(() => {
    const firstIndex = pageIndex * pageSize;
    firstVisibleKeyRef.current = keys[firstIndex] ?? null;
  }, [keys, pageIndex, pageSize]);

  // When items change, attempt to keep first visible item in view.
  useEffect(() => {
    const firstKey = firstVisibleKeyRef.current;
    if (firstKey === null || pageCount === 0) {
      setPageIndex(0);
      return;
    }

    const newIndex = keys.indexOf(firstKey);
    if (newIndex === -1) {
      setPageIndex(0);
      return;
    }

    setPageIndex(Math.floor(newIndex / pageSize));
  }, [keys, pageCount, pageSize]);

  const enabled = !isPaused && pageCount > 1;
  const tick = useTicker({
    intervalMs: dwellMs,
    enabled,
    now,
    alignTo: 'none',
  });
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

    setPageIndex((prev) => {
      const next = pageCount === 0 ? 0 : (prev + 1) % pageCount;
      onPageChange?.(next);
      return next;
    });
  }, [enabled, onPageChange, pageCount, tick]);

  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const pageItems = items.slice(start, end);

  return (
    <div
      className={cn('overflow-hidden', className)}
      data-testid="auto-paging-list"
    >
      {pageItems.map((item, indexInPage) => {
        const absoluteIndex = start + indexInPage;
        const key = resolvedGetKey(item, absoluteIndex);
        return <div key={key}>{renderItem(item, absoluteIndex)}</div>;
      })}
    </div>
  );
}
