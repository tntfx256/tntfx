import type { EffectCallback } from "react";
import { useEffect, useMemo } from "react";

export function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(effect, []);
}

export function useRunFirst(factory: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, []);
}
