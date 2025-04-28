import { useLayoutEffect } from 'react';

/**
 * Automatically scrolls to the bottom of a container when `deps` change.
 * If the user has manually scrolled up, it will not auto-scroll unless
 * they're near the bottom.
 *
 * @param {React.RefObject<HTMLElement>} ref - Ref to the scrollable container
 * @param {Array<any>} deps - Dependency array that triggers scroll (e.g. logs)
 * @param {boolean} smooth - Whether to scroll smoothly (default: true)
 * @param nearBottomHeight - height from the bottom where script start works
 */
export const useAutoScrollToBottom = ({ ref, deps = [], smooth = false, nearBottomHeight = 25 }) => {
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
