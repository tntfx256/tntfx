import type { Nullable } from "@tntfx/core";
import { serialize } from "@tntfx/core";
import type { DependencyList, EffectCallback } from "react";
import { useEffect, useMemo, useRef } from "react";

type Destructor = ReturnType<EffectCallback> | void;
type Fn = () => unknown;
type ExcludeVoidFn<T extends Fn = Fn> = (() => void) extends T ? never : T;

export function useSerializedMemo<T>(factory: ExcludeVoidFn, deps: DependencyList): T {
  const serializedDeps = deps.map(serialize);

  return useMemo<T>(factory, serializedDeps);
}

export function useSerializedEffect(
  effect: (serializedDeps: string[]) => Destructor,
  deps: DependencyList,
  skipFirstRun = false
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
    return skipFirstRun ? undefined : effect(serializedDeps);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serializedDeps]);
}
