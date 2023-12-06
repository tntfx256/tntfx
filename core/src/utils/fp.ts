import type { TObject } from "../types";

export const pick =
  <V extends TObject = TObject, K extends keyof V = keyof V>(key: K) =>
  (value: V): V[K] =>
    value[key];

export const pickMany =
  <V extends TObject = TObject, K extends keyof V = keyof V>(...keys: K[]) =>
  (value: V): Pick<V, K> =>
    keys.reduce((result, key) => ({ ...result, [key]: value[key] }), {} as V);
