import { isServer } from "./etc";
import type { Boundary, BoundingRect, Dimension } from "../types";

const MinFrameSize = 420;
const MinDialogSize = 360;
const Columns = 28;
const MaxFrameWidth = 768;

function calcOffset(boundingRect: Dimension) {
  const Rows = Math.ceil(Columns * (boundingRect.height / boundingRect.width));
  return { X: Math.ceil(boundingRect.width / Columns), Y: Math.ceil(boundingRect.height / Rows) };
}

export function getScreenDimension() {
  if (isServer()) {
    return {
      desktop: { top: 0, left: 0, height: 768, width: 1024 },
      screen: { top: 0, left: 0, height: 768, width: 1024 },
    };
  }

  const { devicePixelRatio, screen, innerWidth, innerHeight } = window;
  return {
    desktop: { top: 0, left: 0, height: innerHeight, width: innerWidth },
    screen: { top: 0, left: 0, height: screen.availHeight * devicePixelRatio, width: screen.availWidth * devicePixelRatio },
  };
}

export function dimensionToBoundingRect(dimension: Dimension): BoundingRect {
  return { ...dimension, right: dimension.left + dimension.width, bottom: dimension.top + dimension.height };
}

export function boundaryToBoundingRect(boundary: Partial<Dimension>): BoundingRect {
  const { desktop } = getScreenDimension();
  const { top = 0, left = 0, width = desktop.width, height = desktop.height } = boundary;

  return { top, left, width, height, right: left + width, bottom: top + height };
}

export function getMinDimension(isDialog = false): Dimension {
  return {
    top: 0,
    left: 0,
    width: isDialog ? MinDialogSize : MinFrameSize,
    height: isDialog ? MinDialogSize : MinFrameSize,
  };
}

export function calcInitialFrameDimension(
  // otherFrames: Dimension[],
  boundary?: Boundary
  // initialDimension?: Dimension
): Dimension {
  const { desktop } = getScreenDimension();
  const hasBoundingRect = Boolean(boundary);

  const boundingRect = boundary ? boundaryToBoundingRect(boundary) : dimensionToBoundingRect(desktop);

  const offset = calcOffset(boundingRect);

  // initialDimension = initialDimension || getMinDimension();

  let width = Math.min(
    Math.ceil(Math.min(boundingRect.width / 1.25, boundingRect.width - 2 * offset.X)), // initialDimension.width
    MaxFrameWidth
  );
  let height = Math.ceil(Math.min(boundingRect.height / 1.25, boundingRect.height - 2 * offset.Y)); // initialDimension.height

  let left = offset.X;
  let top = offset.Y;

  if (hasBoundingRect) {
    // put the popup in the middle
    left = Math.ceil(boundingRect.left + (boundingRect.width - width) / 2);
    top = Math.ceil(boundingRect.top + (boundingRect.height - height) / 2);
  }
  // else {
  // check overlap with other frames
  // while (otherFrames.some((frame) => frame.top === top || frame.left === left)) {
  //   if (
  //     left + width + offset.X <= boundingRect.left + boundingRect.width &&
  //     top + height + offset.Y <= boundingRect.top + boundingRect.height
  //   ) {
  //     left += offset.X;
  //     top += offset.Y;
  //   } else {
  //     break;
  //   }
  // }
  // }

  return { height, left, top, width };
}
