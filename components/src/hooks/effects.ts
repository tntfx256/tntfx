import { useEffect, useMemo, useState } from "react";
import type { Nullable } from "@tntfx/core";

export function useRefEffect<T>() {
  const [state, setState] = useState<Nullable<T>>(null);

  return useMemo(
    () =>
      [
        state,
        function refHandler(ref: T) {
          setState(ref);
        },
      ] as const,
    [state]
  );
}

export function useRenderEffect() {
  const [, setState] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    return () => setIsMounted(false);
  }, [isMounted]);

  return function render() {
    setState((state) => state + 1);
  };
}
