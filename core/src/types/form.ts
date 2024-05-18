import type { TObject } from "./base";

export type WithId<T extends TObject = TObject, K extends string = "id", KT = string> = Omit<T, K> & { [key in K]: KT };

export type FormValues<T extends TObject = TObject> = {
  [K in keyof T]: T[K] extends string | number | boolean | Date
    ? T[K] | ""
    : T[K] extends (infer U)[]
      ? U extends TObject
        ? FormValues<U>[]
        : U extends string | number | boolean | Date
          ? U[]
          : ""
      : T[K] extends TObject
        ? FormValues<T[K]>
        : "";
};
