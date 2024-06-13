import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { type Any, isEqual, type Nullable } from "@tntfx/core";

type BlurEventReason = "clickOutside" | "escape";
type UseBlurHandler = (reason: BlurEventReason, e: MouseEvent | KeyboardEvent) => void;

export function useBlurObserver(container: Nullable<HTMLElement>, handler?: UseBlurHandler, disabled = true) {
  useLayoutEffect(() => {
    if (!container || !handler || disabled) {
      return;
    }

    function clickHandler(e: MouseEvent) {
      if (!container?.contains(e.target as Any)) {
        handler?.("clickOutside", e);
      }
    }

    function keyboardHandler(e: KeyboardEvent) {
      if (!container?.contains(e.target as Any) && e.key === "Escape") {
        handler?.("escape", e);
      }
    }

    // setTimeout(() => {
    document.addEventListener("click", clickHandler);
    document.addEventListener("keyup", keyboardHandler);
    // }, 500);

    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keyup", keyboardHandler);
    };
  }, [container, disabled, handler]);
}

export function useResizeObserver(callback: () => void, target?: Nullable<HTMLElement>, disabled = true) {
  const resizeTimer = useRef<Any>();

  const resizeHandler = useCallback(() => {
    clearTimeout(resizeTimer.current);
    resizeTimer.current = setTimeout(callback, 100);
  }, [callback]);

  const [observer] = useState(() => new ResizeObserver(resizeHandler));

  useEffect(() => {
    if (disabled || !target) return;
    observer.observe(target);

    return () => {
      observer.disconnect();
      // observer.unobserve(target);
    };
  }, [disabled, observer, target]);
}

export function useScrollObserver(callback: () => void, target?: Nullable<HTMLElement>, disabled = true) {
  const scrollTimer = useRef<Any>();

  useEffect(() => {
    if (!target || disabled) return;

    function scrollHandler() {
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(callback, 100);
    }

    target.addEventListener("scroll", scrollHandler, true);

    return () => {
      clearTimeout(scrollTimer.current);
      document.removeEventListener("scroll", scrollHandler, true);
    };
  }, [callback, disabled, target]);
}

export function usePositionObserver(callback: () => void, target?: Nullable<HTMLElement>, disabled = true) {
  const rect = target?.getBoundingClientRect();
  const ref = useRef<Any>(null);

  useEffect(() => {
    if (disabled) {
      return;
    }
    if (!isEqual(ref.current, rect)) {
      return callback();
    }
  }, [callback, disabled, rect]);
}
