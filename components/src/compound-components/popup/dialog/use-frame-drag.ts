import type { Boundary, Dimension, Nullable } from "@tntfx/core";
import { toBoundingRect } from "@tntfx/core";
import { useDrag, useRuntime } from "@tntfx/hooks";
import type { SetDimension } from "./types";

export function useFrameDrag(
  id: string,
  setDimension: SetDimension,
  draggable: boolean | undefined,
  frame: Nullable<HTMLDivElement>,
  titlebar: Nullable<HTMLDivElement>,
  boundary?: Boundary
) {
  const runtime = useRuntime();

  useDrag(titlebar, {
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
}
