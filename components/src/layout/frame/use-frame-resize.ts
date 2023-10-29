import type { Boundary, Nullable } from "@tntfx/core";
import { boundaryToBoundingRect } from "@tntfx/core";
import { useResize, useRuntime } from "@tntfx/hooks";
import type { FrameStatus, SetDimension } from "./types";

interface UseFrameResizeConfig {
  id: string;
  // isDialog?: boolean;
  frameStatus?: FrameStatus;
  resizable: boolean | undefined;
  frameElement: Nullable<HTMLDivElement>;
  boundary?: Boundary;
  setDimension: SetDimension;
}

export function useFrameResize(config: UseFrameResizeConfig) {
  const { id, resizable, boundary, frameElement, setDimension, frameStatus } =
    config;

  const runtime = useRuntime();

  useResize(frameElement, {
    resizable: resizable && (!frameStatus || frameStatus === "normal"),
    boundingRect: boundaryToBoundingRect(boundary || {}),
    onResizeStart() {
      runtime.activate(id);
      // onChange({ id, type: "activate", isDialog });
    },
    onResizeEnd(dimension) {
      // onChange({ id, type: "drag", dimension });
      setDimension(dimension);
    },
  });
}
