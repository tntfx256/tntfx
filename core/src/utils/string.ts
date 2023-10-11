import type { Any } from "../types";

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

export function serialize<T = Any>(value: T): string {
  return JSON.stringify(value);
}

export function deserialize<T = Any>(value: string): T {
  return JSON.parse(value) as T;
}
