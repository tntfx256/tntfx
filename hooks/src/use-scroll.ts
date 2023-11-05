import { useEffect, useRef } from "react";
import type { Nullable } from "@tntfx/core";

export function useScrollbarDimension(element: Nullable<HTMLElement>) {
  const dimensionRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (element) {
      const { clientWidth, clientHeight, offsetWidth, offsetHeight } = element;

      dimensionRef.current = {
        width: offsetWidth - clientWidth,
        height: offsetHeight - clientHeight,
      };
    }
  }, [element]);

  return dimensionRef.current;
}
