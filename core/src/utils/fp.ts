import type { Any, TObject } from "../types";

export const pick =
  <V extends TObject = TObject, K extends keyof V = keyof V>(...keys: K[]) =>
  (value: V): Pick<V, K> =>
    keys.reduce((result, key) => ({ ...result, [key]: value[key] }), {} as V);

export const splitProperties =
  <K extends string = string>(...keysToPick: K[]) =>
  <V extends TObject = TObject>(value: V): [Pick<V, K>, Omit<V, K>] =>
    Object.entries(value).reduce(
      ([picked, rest], [k, v]) =>
        keysToPick.includes(k as Any) ? [{ ...picked, [k]: v }, rest] : [picked, { ...rest, [k]: v }],
      [{} as Pick<V, K>, {} as Omit<V, K>],
    );
