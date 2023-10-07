import type { Boundary, FrameStatus, Nullable } from "@tntfx/core";
import { boundaryToBoundingRect } from "@tntfx/core";
import { useResize } from "@tntfx/hooks";
import type { FrameEventHandler } from "./utils";

interface UseFrameResizeConfig {
  id: string;
  isDialog?: boolean;
  status?: FrameStatus;
  resizable: boolean | undefined;
  frameElement: Nullable<HTMLDivElement>;
  boundary?: Boundary;
  onChange: FrameEventHandler;
}

export function useFrameResize(config: UseFrameResizeConfig) {
  const { id, resizable, status, boundary, frameElement, isDialog, onChange } = config;

  useResize(frameElement, {
    resizable: resizable && (!status || status === "normal"),
    boundingRect: boundaryToBoundingRect(boundary || {}),
    onResizeStart() {
      onChange({ id, type: "activate", isDialog });
    },
    onResizeEnd(dimension) {
      onChange({ id, type: "drag", dimension });
    },
  });
}
