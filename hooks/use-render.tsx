import { useCallback, useRef, useState } from "react";
import { generateId, isClient } from "@tntfx/core";

export function useRender() {
  const [, setState] = useState("");

  return useCallback(() => {
    setState(generateId());
  }, []);
}

export function useRenderCounter(clientSideOnly = false) {
  const counter = useRef(0);

  if (clientSideOnly) {
    if (isClient()) {
      counter.current += 1;
    }
  } else {
    counter.current += 1;
  }

  return counter.current;
}
