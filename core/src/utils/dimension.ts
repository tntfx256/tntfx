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

const MinFrameWidth = Breakpoints.sm;
const MaxFrameWidth = Breakpoints.md;

const MinDialogWidth = Breakpoints.xxs;
const MaxDialogWidth = Breakpoints.xs;

// const GoldenRatio = 1.6;

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

export function getMinDimension(isDialog = false, boundary?: Dimension) {
  boundary = boundary || getScreenDimension().desktop;

  const ratio = boundary.width / boundary.height;

  // making sure that width and heigh are not bigger than the boundary
  return {
    minWidth: Math.min(isDialog ? MinDialogWidth : MinFrameWidth, boundary.width),
    minHeight: Math.min(isDialog ? MinDialogWidth / ratio : MinFrameWidth / ratio, boundary.height),

    maxWidth: Math.min(isDialog ? MaxDialogWidth : MaxFrameWidth, boundary.width),
    maxHeight: Math.min(isDialog ? MaxDialogWidth / ratio : MaxFrameWidth / ratio),
  };
}

export function calcInitialFrameDimension(isDialog = false, boundary?: Dimension): Dimension {
  const { minWidth, minHeight, maxWidth, maxHeight } = getMinDimension(isDialog, boundary);
  const boundingRect = toBoundingRect(boundary);
  const ratio = boundingRect.width / boundingRect.height;

  const width = boundingRect.width * 0.8;
  const height = width / ratio;
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

  dimension.top = Math.floor((boundingRect.height - dimension.height) / 2);
  dimension.left = Math.floor((boundingRect.width - dimension.width) / 2);

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
