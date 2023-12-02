import type { LegacyRef, RefCallback } from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { type Any, isEqual, type Nullable } from "@tntfx/core";

export function useRefState<T>(): [Nullable<T>, RefCallback<T>] {
  const [container, setContainer] = useState<Any>(null);

  const handleRef = useCallback((ref: LegacyRef<T>) => setContainer(ref), []);

  return useMemo(() => [container, handleRef as RefCallback<T>], [container, handleRef]);
}

export function useCompare<T>(value: T) {
  const ref = useRef<T>(value);

  const hasChanched = useCallback((value: T) => {
    const isChanges = !isEqual(value, ref.current);
    if (isChanges) {
      ref.current = value;
      return true;
    }
    return false;
  }, []);

  return hasChanched;
}
