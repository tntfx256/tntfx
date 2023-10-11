import { useEffect, useMemo, useRef, useState } from "react";
import type { Any, Nullable } from "@tntfx/core";

export function useTimer(timeout?: number, fn?: Function) {
  const timer = useLazyTimer(timeout, fn);

  useEffect(() => {
    timer.restart();
  }, [timer]);

  return timer;
}

export function useLazyTimer(timeout?: number, fn?: Function) {
  const cb = useRef<Nullable<Function>>(null);
  const timer = useRef<Any>(null);

  if (fn) {
    cb.current = fn;
  }

  const [callback] = useState(
    () =>
      function defaultCallback() {
        if (cb.current) {
          cb.current();
        }
      }
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return useMemo(
    () => ({
      set fn(callback: Function) {
        cb.current = callback;
      },
      stop() {
        clearTimeout(timer.current);
      },
      restart() {
        clearTimeout(timer.current);
        if (timeout && timeout > 0) {
          timer.current = setTimeout(callback, timeout);
        }
      },
    }),
    [callback, timeout]
  );
}

export function useInterval(interval?: number, fn?: Function) {
  const timer = useLazyInterval(interval, fn);

  useEffect(() => {
    timer.restart();
  }, [timer]);

  return timer;
}

export function useLazyInterval(interval?: number, fn?: Function) {
  const cb = useRef<Nullable<Function>>(null);
  const timer = useRef<Any>(null);

  if (fn) {
    cb.current = fn;
  }

  const [callback] = useState(
    () =>
      function defaultCallback() {
        if (cb.current) {
          cb.current();
        }
      }
  );

  useEffect(() => () => clearInterval(timer.current), []);

  return useMemo(
    () => ({
      set fn(callback: Function) {
        cb.current = callback;
      },
      stop() {
        clearInterval(timer.current);
      },
      restart() {
        clearInterval(timer.current);
        if (interval && interval > 0) {
          callback();
          timer.current = setInterval(callback, interval);
        }
      },
    }),
    [callback, interval]
  );
}
