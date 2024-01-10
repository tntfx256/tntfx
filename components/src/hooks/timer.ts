import { useRef } from "react";
import { useConst, useSetInterval, useSetTimeout } from "@fluentui/react-hooks";

type TimerCallback = () => void;

export function useTimeout(timeout: number, fn?: TimerCallback) {
  const idRef = useRef(0);
  const timer = useSetTimeout();

  return useConst(() => ({
    start(lazyFn?: TimerCallback) {
      if (fn || lazyFn) {
        idRef.current = timer.setTimeout((fn || lazyFn)!, timeout);
      } else {
        throw new Error("Callback is required");
      }
    },
    stop() {
      timer.clearTimeout(idRef.current);
    },
  }));
}

export function useInterval(interval: number, fn?: TimerCallback) {
  const idRef = useRef(0);
  const timer = useSetInterval();

  return useConst(() => ({
    start(lazyFn?: TimerCallback) {
      if (fn || lazyFn) {
        idRef.current = timer.setInterval((fn || lazyFn)!, interval);
      } else {
        throw new Error("Callback is required");
      }
    },
    stop() {
      timer.clearInterval(idRef.current);
    },
  }));
}
