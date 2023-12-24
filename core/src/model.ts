import type { ZodSchema } from "zod";

export { z } from "zod";

export class Model<T> {
  #schema: ZodSchema<T>;
  // #values: T;

  constructor(schema: ZodSchema<T>) {
    this.#schema = schema;
  }

  get schema(): ZodSchema<T> {
    return this.#schema;
  }

  // setValues<U>(data: U extends T ? U : unknown) {
  //   const result = this.#schema.safeParse(data);
  //   if (result.success) {
  //     this.#values = result.data;
  //   }
  // }

  validate(data: unknown) {
    return this.#schema.safeParse(data);
  }
}

export type ModelConstructor<T> = new () => Model<T>;
