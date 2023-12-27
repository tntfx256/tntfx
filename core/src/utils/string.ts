import type { Any } from "../types";

export { compress, decompress } from "lz-string";

export function upperFirst(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function capitalize(string: string) {
  return string.split(/\s+/).map(upperFirst).join(" ");
}

export function lowercase(string: string) {
  return string.toLowerCase();
}
export function uppercase(string: string) {
  return string.toUpperCase();
}

export type Serialized = string;
export function serialize<T = Any>(value: T): Serialized {
  return JSON.stringify(value);
}

export function deserialize<T = Any>(value: Serialized): T {
  return JSON.parse(value) as T;
}

export function camelCase(string: string) {
  return `${string[0].toLowerCase()}${string.slice(1)}`
    .replace(/[-\s]([a-z])/g, (x, char) => char.toUpperCase())
    .replace(/[^\w-]+/g, "");
}

export function pascalCase(string: string) {
  return upperFirst(camelCase(string));
}

export function kebabCase(string: string) {
  return string.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
}
