import type { Any, TObject } from "../types";
import { EmptyValues } from "../validation";

type Callback = (...args: Any[]) => void;

function genRandom() {
  return Math.random().toString(36).slice(2);
}

export function generateCode(length = 6): string {
  return (genRandom() + genRandom()).slice(-length).toUpperCase();
}

export function generateId(length = 16) {
  return (genRandom() + genRandom()).slice(-length);
}

export function debounceCallback(cb: Callback, delay = 100) {
  let timer: Any;

  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export function getFirstPair<T = Any>(object: TObject<T>) {
  const [pair] = Object.entries(object);
  return pair ? { key: pair[0], value: pair[1] } : { key: "", value: "" };
}

export function getNonEmptyValues<T extends TObject>(data: T): Partial<T> {
  const values: Partial<T> = {};

  for (const [field, value] of Object.entries(data)) {
    if (!EmptyValues.includes(value as Any)) {
      (values as Any)[field] = value;
    }
  }

  return values;
}

export function isServer() {
  return typeof window === "undefined";
}

export function isClient() {
  return !isServer();
}

export function toNumericVersion(version: string) {
  const [major = "0", minor = "0"] = version.split(".");

  return +major + +minor / 10 ** minor.length;
}
