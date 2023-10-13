import type { Boundary, Nullable } from "@tntfx/core";
import { boundaryToBoundingRect } from "@tntfx/core";
import { useResize } from "@tntfx/hooks";
import type { SetDimension } from "./types";

interface UseFrameResizeConfig {
  // id: string;
  // isDialog?: boolean;
  // frameStatus?: FrameStatus;
  resizable: boolean | undefined;
  frameElement: Nullable<HTMLDivElement>;
  boundary?: Boundary;
  setDimension: SetDimension;
}

export function useFrameResize(config: UseFrameResizeConfig) {
  const { resizable, boundary, frameElement, setDimension } = config;

  useResize(frameElement, {
    resizable: resizable && (!status || status === "normal"),
    boundingRect: boundaryToBoundingRect(boundary || {}),
    onResizeStart() {
      // onChange({ id, type: "activate", isDialog });
    },
    onResizeEnd(dimension) {
      // onChange({ id, type: "drag", dimension });
      setDimension(dimension);
    },
  });
}
