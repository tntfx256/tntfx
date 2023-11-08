import { Field } from "./field";
import type { Any, StringKeys, TObject } from "./types";
import type { Violations } from "./validation";

export type Fields<I extends TObject = TObject> = { [N in StringKeys<I>]: Field<N> };

export type ModelConstructor<I extends TObject = TObject> = {
  new (): Model<I>;
  fields: Fields<I>;
};

export class Model<I extends TObject = TObject> {
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
        if (props.type === "List" && Array.isArray(values[name]) && props.listType == "Object" && props.model) {
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
        } else if (props.type === "Object" && props.model) {
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

  static validate<I extends TObject = TObject>(model: Model<I>, fieldNames?: (keyof I)[]) {
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

export class FreeModel<T extends TObject = TObject> extends Model<T> {
  #addedFields: string[] = [];

  static get fields() {
    return {} as Fields;
  }

  setValues(values: TObject, reset?: boolean) {
    const fieldsToBeAdded: Fields<T> = {} as Fields<T>;

    for (const field of Object.keys(values)) {
      if (!this.#addedFields.includes(field)) {
        fieldsToBeAdded[field as StringKeys<T>] = new Field(field as StringKeys<T>, { type: "String" });
        this.#addedFields.push(field);
      }
    }
    this.extend(fieldsToBeAdded);

    super.setValues(values, reset);
  }
}
