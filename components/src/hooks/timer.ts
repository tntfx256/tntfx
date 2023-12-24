import { useRef } from "react";
import { useConst, useSetInterval, useSetTimeout } from "@fluentui/react-hooks";

type TimerCallback = () => void;

/**
 *
 * @param timeout - in seconds
 */
export function useTimeout(timeout: number, fn?: TimerCallback) {
  const idRef = useRef(0);
  const timer = useSetTimeout();

  return useConst(() => ({
    start(lazyFn?: TimerCallback) {
      if (!fn || !lazyFn) {
        throw new Error("Callback is required");
      }
      idRef.current = timer.setTimeout(fn || lazyFn, timeout);
    },
    stop() {
      timer.clearTimeout(idRef.current);
    },
  }));
}

/**
 *
 * @param interval - in seconds
 */
export function useInterval(interval: number, fn: TimerCallback) {
  const idRef = useRef(0);
  const timer = useSetInterval();

  return useConst(() => ({
    start(lazyFn?: TimerCallback) {
      if (!fn || !lazyFn) {
        throw new Error("Callback is required");
      }
      idRef.current = timer.setInterval(fn || lazyFn, interval);
    },
    stop() {
      timer.clearInterval(idRef.current);
    },
  }));
}
