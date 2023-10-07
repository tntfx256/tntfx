import type { Field } from "./field";
import type { Any, OBJECT, StringKeys } from "./types";
import type { Violations } from "./validation";

type Fields<I extends OBJECT = OBJECT> = { [N in StringKeys<I>]: Field<N> };

export type ModelConstructor<I extends OBJECT = OBJECT> = {
  new (): Model<I>;
  fields: Fields<I>;
};

export class Model<I extends OBJECT = OBJECT> {
  #fieldNames: StringKeys<I>[] = [];
  #fields: Fields<Required<I>> = {} as Fields<I>;
  #values: Partial<I> = {};

  constructor() {
    if ("fields" in this.constructor) {
      this.extend((this.constructor as ModelConstructor<I>).fields);
    }
  }

  extend(fields: Fields<I>) {
    for (const entry of Object.entries(fields)) {
      const [fieldName, field] = entry as [StringKeys<I>, Field<StringKeys<I>>];
      if (!this.#fieldNames.includes(fieldName)) {
        this.#fieldNames.push(fieldName);
      }
      this.#fields[fieldName] = field;
    }
  }

  getValues(): I {
    return { ...this.#values } as I;
  }

  setValues(values: Partial<I> | Any, reset = false) {
    // in case value is null, model should reflect it
    if (reset) {
      this.#values = {};
    }

    for (const name of this.#fieldNames) {
      if (name in values) {
        const { props } = this.#fields[name]!;
        // if it's a list of object
        if (props.type === "LIST" && Array.isArray(values[name]) && props.listType == "OBJECT" && props.model) {
          const model = new Model();
          model.extend(props.model.fields);
          this.#values[name] = [] as unknown as I[StringKeys<I>];

          for (const value of values[name] as Any) {
            if (value) {
              model.setValues(value, true);
              // @ts-ignore
              this.#values[name].push(model.getValues());
            }
          }
        } else if (props.type === "OBJECT" && props.model) {
          // or if it's just a single object
          const model = new Model();
          model.extend(props.model.fields);
          // @ts-ignore
          model.setValues(values[name], true);
          // @ts-ignore
          this.#values[name] = model.getValues();
        } else {
          // @ts-ignore
          this.#values[name] = values[name];
        }
      }
    }
  }

  get fieldNames() {
    return [...this.#fieldNames];
  }

  validate(...fieldNames: (keyof I)[]) {
    return Model.validate<I>(this, fieldNames);
  }

  static validate<I extends OBJECT = OBJECT>(model: Model<I>, fieldNames?: (keyof I)[]) {
    let hasViolation = false;
    const violations: Violations = {};

    const fieldsToValidate = fieldNames && fieldNames.length ? fieldNames : model.#fieldNames;

    for (const name of fieldsToValidate) {
      // @ts-ignore
      const violation = model.#fields[name].validate(model.#values[name]);
      if (violation) {
        hasViolation = true;
        const [error, internalField] = violation;
        violations[(internalField || name) as string] = error;
      }
    }

    return hasViolation ? violations : null;
  }
}
