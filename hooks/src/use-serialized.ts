import type { DependencyList, EffectCallback } from "react";
import { useEffect, useMemo, useRef } from "react";
import type { Nullable } from "@tntfx/core";
import { serialize } from "@tntfx/core";

type Destructor = ReturnType<EffectCallback> | void;

export function useSerializedMemo<T>(factory: (serializedDeps: string[]) => T, deps: DependencyList): T {
  const serializedDeps = deps.map(serialize);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<T>(() => factory(serializedDeps), serializedDeps);
}

export function useSerializedEffect(
  effect: (serializedDeps: string[]) => Destructor,
  deps: DependencyList,
  skipFirst = false
) {
  const ref = useRef<Nullable<string[]>>(null);
  const serializedDeps = deps.map(serialize);

  useEffect(() => {
    if (ref.current) {
      if (ref.current.some((s, i) => s !== serializedDeps[i])) {
        ref.current = serializedDeps;
        return effect(serializedDeps);
      }
      return;
    }

    ref.current = serializedDeps;
    return skipFirst ? undefined : effect(serializedDeps);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serializedDeps]);
}
