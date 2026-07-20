import { useEffect, useRef } from "react";

/**
 * Tracks a page view when the component mounts.
 * Currently a no-op as the backend API is not available on static hosting.
 * Can be replaced with a client-side analytics solution (e.g. Google Analytics).
 */
export function usePageTracker(_page: string) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    // Page tracking disabled — no backend API available on static hosting
    // To enable analytics, integrate Google Analytics or similar here
  }, [_page]);
}
