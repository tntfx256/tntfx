export function toRem(px: number | string) {
  if (typeof px === "string") {
    px = parseInt(px, 10);
  }
  return `${px / 16}rem`;
}
