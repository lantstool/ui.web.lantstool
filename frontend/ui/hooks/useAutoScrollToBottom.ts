import { type DependencyList, type RefObject, useLayoutEffect } from 'react';

interface UseAutoScrollToBottomOptions {
  /** Ref to the scrollable container */
  ref: RefObject<HTMLElement>;
  /** Dependency array that triggers scroll (e.g. logs) */
  deps?: DependencyList;
  /** Whether to scroll smoothly (default: false) */
  smooth?: boolean;
  /** Height from the bottom where auto-scroll engages (default: 25px) */
  nearBottomHeight?: number;
}

/**
 * Automatically scrolls to the bottom of a container when `deps` change.
 * If the user has manually scrolled up, it will not auto-scroll unless
 * they're near the bottom.
 */
export const useAutoScrollToBottom = ({
  ref,
  deps = [],
  smooth = false,
  nearBottomHeight = 25,
}: UseAutoScrollToBottomOptions): void => {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isNearBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + nearBottomHeight;

    if (isNearBottom) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }, deps);
};
