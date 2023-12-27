import { isServer } from "./etc";
import type { BoundingRect, Dimension } from "../types";

export const Breakpoints = {
  xxs: 240,
  xs: 360,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
  xxl: 1920,
};

const OffsetRatio = 0.85;
const MinFrameWidth = Breakpoints.sm;
const MinDialogWidth = Breakpoints.xxs;

export function getScreenDimension() {
  if (isServer()) {
    return {
      desktop: { top: 0, left: 0, height: Breakpoints.md, width: Breakpoints.lg },
      screen: { top: 0, left: 0, height: Breakpoints.md, width: Breakpoints.lg },
    };
  }

  const { devicePixelRatio, screen, innerWidth, innerHeight } = window;
  return {
    desktop: { top: 0, left: 0, height: innerHeight, width: innerWidth },
    screen: { top: 0, left: 0, height: screen.availHeight * devicePixelRatio, width: screen.availWidth * devicePixelRatio },
  };
}

export function toBoundingRect(boundary: Partial<BoundingRect> = {}): BoundingRect {
  const { desktop } = getScreenDimension();
  const { top = 0, left = 0, width = desktop.width, height = desktop.height } = boundary;

  return { top, left, width, height, right: left + width, bottom: top + height };
}

export function toDimension(boundary: Partial<BoundingRect> = {}): Dimension {
  const { desktop } = getScreenDimension();
  const { top = 0, left = 0, width = desktop.width, height = desktop.height } = boundary;

  return { top, left, width, height };
}

export function getMinMaxDimension(isDialog = false, boundary?: Dimension) {
  boundary = boundary || getScreenDimension().desktop;

  const ratio = boundary.width / boundary.height;
  const minWidth = isDialog ? MinDialogWidth : MinFrameWidth;
  const minHeight = Math.floor(isDialog ? MinDialogWidth / ratio : MinFrameWidth / ratio);
  // making sure that width and heigh are not bigger than the boundary
  const maxWidth = Math.floor(boundary.width * OffsetRatio);
  const maxHeight = Math.floor(boundary.height * OffsetRatio);

  return {
    minWidth: Math.min(minWidth, maxWidth),
    minHeight: Math.min(minHeight, maxHeight),
    maxWidth,
    maxHeight,
  };
}

export function calcInitialFrameDimension(frame: HTMLElement, isDialog = false, boundary?: Dimension): Dimension {
  const { minWidth, minHeight, maxWidth, maxHeight } = getMinMaxDimension(isDialog, boundary);
  const boundingRect = toBoundingRect(boundary);

  const { width, height } = frame.getBoundingClientRect();

  const dimension: Dimension = {
    width: Math.floor(width),
    height: Math.floor(height),
    top: boundingRect.top + (boundingRect.height - height) / 2,
    left: boundingRect.left + (boundingRect.width - width) / 2,
  };

  if (dimension.width < minWidth) {
    dimension.width = minWidth;
  } else if (dimension.width > maxWidth) {
    dimension.width = maxWidth;
  }

  if (dimension.height < minHeight) {
    dimension.height = minHeight;
  } else if (dimension.height > maxHeight) {
    dimension.height = maxHeight;
  }

  const offset = isDialog ? 2 : (Math.floor(Math.random() * 100) % 6) + 2;
  dimension.top = Math.floor((boundingRect.height - dimension.height) / offset);
  dimension.left = Math.floor((boundingRect.width - dimension.width) / offset);

  return dimension;
}

export function isInBoundary(boundary: BoundingRect, x: number, y: number, padding = 0) {
  return (
    x >= boundary.left + padding &&
    x <= boundary.right - padding &&
    y >= boundary.top + padding &&
    y <= boundary.bottom - padding
  );
}
