import type { TObject } from "./base";

export type WithId<T extends TObject = TObject, K extends string = "id", KT = string> = Omit<T, "id"> & { [key in K]: KT };

export type FormValues<T> = T extends string | number
  ? T | ""
  : T extends (infer U)[]
    ? FormValues<U>[]
    : T extends object
      ? { [K in keyof T]: FormValues<T[K]> }
      : T;
