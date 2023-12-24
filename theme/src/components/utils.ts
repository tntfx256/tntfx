import { tokens } from "./tokens";

export function toRem(px: number | string) {
  if (typeof px === "string") {
    px = parseInt(px, 10);
  }
  return `${px / 16}rem`;
}

export function splitBorderStyle(border: string) {
  const [width = "1px", type = "solid", color = tokens.palette.border] = border.split(/\s+/);
  return [width, type, color];
}
