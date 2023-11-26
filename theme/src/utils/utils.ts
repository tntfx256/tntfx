const space = /\s+/;
export function splitBySpace(value: string | undefined): string[] {
  return value ? value.split(space).filter(Boolean) : [];
}

export function toRem(pxSize: number, basePX = 16): string {
  return `${+(pxSize / basePX).toFixed(4)}rem`;
}
