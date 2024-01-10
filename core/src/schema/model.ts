import type { ZodSchema } from "zod";
import type { Violation } from "../error";
import type { Nullable, TObject } from "../types";

export class Model<T extends TObject = TObject> {
  #schema: ZodSchema<T>;
  #values: Nullable<T> = null;

  constructor(schema: ZodSchema<T>) {
    this.#schema = schema;
  }

  setValues<U>(data: U extends T ? U : unknown) {
    const result = this.#schema.safeParse(data);
    if (result.success) {
      this.#values = result.data;
      return true;
    }
    return false;
  }

  get schema() {
    return this.#schema;
  }

  getValues(): Nullable<T> {
    return this.#values;
  }

  validate(): Nullable<Violation<T>> {
    const result = this.#schema.safeParse(this.#values);
    if (result.success) {
      return null;
    }
    return null;
  }
}

export type ModelConstructor<T extends TObject = TObject> = new () => Model<T>;
