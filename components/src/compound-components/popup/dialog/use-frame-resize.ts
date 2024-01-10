import type { Boundary, Nullable } from "@tntfx/core";
import { toBoundingRect } from "@tntfx/core";
import type { SetDimension } from "./types";
import { useResize, useRuntime } from "../../../hooks";

export function useFrameResize(
  id: string,
  setDimension: SetDimension,
  resizable: boolean | undefined,
  frame: Nullable<HTMLDivElement>,
  boundary?: Boundary
) {
  const runtime = useRuntime();

  useResize(frame, {
    resizable,
    boundingRect: toBoundingRect(boundary || {}),
    onResizeStart() {
      runtime.activate(id);
    },
    onResizeEnd({ top, left, width, height }) {
      setDimension((current) => ({ ...current, top, left, width, height }));
    },
  });
}
