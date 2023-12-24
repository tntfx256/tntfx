import { useEffect, useState } from "react";
import type { Boundary, Dimension, Nullable } from "@tntfx/core";
import { toBoundingRect } from "@tntfx/core";
import type { SetDimension } from "./types";
import { useDrag, useRuntime } from "../../hooks";

export function useFrameDrag(
  id: string,
  setDimension: SetDimension,
  draggable: boolean | undefined,
  frame: Nullable<HTMLDivElement>,
  boundary?: Boundary
) {
  const runtime = useRuntime();
  const [headerElement, setHeaderElement] = useState<Nullable<HTMLDivElement>>(null);

  useDrag(headerElement, {
    draggable,
    boundingRect: toBoundingRect(boundary || {}),
    onDragStart() {
      runtime.activate(id);
    },
    onDragging({ top, left }) {
      if (frame) {
        frame.style.top = `${top}px`;
        frame.style.left = `${left}px`;
      }
    },
    onDragEnd({ top, left }) {
      setDimension((current) => ({ ...current, top, left }) as Dimension);
    },
  });

  useEffect(() => {
    if (headerElement || !frame) {
      return;
    }

    setHeaderElement(frame.querySelector<HTMLDivElement>(".frame__header"));
  }, [frame, headerElement]);
}
