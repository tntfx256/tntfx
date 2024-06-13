import type { DependencyList, EffectCallback } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { isEqual, type Nullable } from "@tntfx/core";

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

type UseWatchEffectConfig = {
  skipFirstRender?: boolean;
  renderOnUpdate?: boolean;
};
export function useWatchEffect(effect: EffectCallback, deps: DependencyList, config: UseWatchEffectConfig = {}) {
  const render = useRenderEffect();
  const prevDeps = useRef<Nullable<DependencyList>>(null);
  const { skipFirstRender = true, renderOnUpdate = false } = config;

  useEffect(() => {
    if (skipFirstRender) {
      if (prevDeps.current === null) {
        prevDeps.current = deps;
        return;
      }
    }
    if (deps.some((dep, index) => !isEqual(dep, prevDeps.current?.[index]))) {
      prevDeps.current = deps;
      const effectResult = effect();
      if (renderOnUpdate) {
        render();
      }
      return effectResult;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
