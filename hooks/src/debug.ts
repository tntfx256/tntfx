import { useEffect } from "react";
import type { Nullable } from "@tntfx/core";

export function useEventsLog<K extends keyof HTMLElementEventMap>(element: Nullable<HTMLElement>, ...events: K[]) {
  useEffect(() => {
    if (!element) return;

    for (const event of events) {
      element.addEventListener(event, logEvent);
    }

    return () => {
      for (const event of events) {
        element.removeEventListener(event, logEvent);
      }
    };
  }, [element, events]);
}

function logEvent(event: Event) {
  const { type, currentTarget } = event;
  console.log(`[${type}]`, currentTarget);
}
