import { useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";

// Generate or retrieve a session ID for this browser session
function getSessionId(): string {
  const key = "if_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, id);
  }
  return id;
}

/**
 * Tracks a page view when the component mounts.
 * Call this once per page component.
 */
export function usePageTracker(page: string) {
  const trackMutation = trpc.portal.trackPageView.useMutation();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackMutation.mutate({
      page,
      sessionId: getSessionId(),
    });
  }, [page]);
}
