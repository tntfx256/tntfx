import { useCallback, useMemo, useState } from "react";
import type { Any, Fields, Model, ModelConstructor, Nullable, Option, StringKeys, TObject, Violations } from "@tntfx/core";
import { Err } from "@tntfx/core";
import type { ParsedResponse } from "./api/types";
import { parseResponse } from "./api/utils";

type FormField<T extends TObject = TObject, K extends StringKeys<T> = StringKeys<T>> = {
  name: string;
  value: T[K];
  options?: Option[];
  onChange: (value: T[K], name: string) => void;
  // onInput: (value: T[K], name: K) => void;
};

export type ParentFormField<T extends TObject = TObject> = {
  name: string;
  form: FormModel<T>;
};

export type FormModel<I extends TObject = TObject, F extends Fields<I> = Fields<I>> = Required<{
  [K in StringKeys<I>]: F[K]["props"]["type"] extends "Object" ? ParentFormField<I[K]> : FormField<I, K>;
}>;

export function useModel<I extends TObject = TObject>(builder: ModelConstructor<I>, initialValue?: Nullable<Partial<I>>) {
  // const popup = usePopup();
  const [model] = useState<Model<I>>(() => {
    const model = new builder();
    if (initialValue) model.setValues(initialValue);
    return model;
  });

  const [values, setValues] = useState(() => model.getValues());
  const [violations, setViolations] = useState<Nullable<Violations>>({});

  const handleValueChange = useCallback(
    (value: unknown, name: string | keyof I) => {
      model.setValues({ [name]: value } as Any);
      setValues(model.getValues());
    },
    [model]
  );

  const handleModelValueChange = useCallback(
    (values: Partial<I>) => {
      model.setValues(values);
      setValues(model.getValues());
    },
    [model]
  );

  const handleResponse = useCallback(
    (response: Any): ParsedResponse<(typeof response)["data"]> => {
      const result = parseResponse(response);
      const { error } = result;

      if (error) {
        let isHandled = false;
        if (error.name === Err.Name.VALIDATION) {
          // check if all fields in violation, exists in model
          if (error.violations) {
            isHandled = Object.keys(error.violations).every((key) => model.fieldNames.includes(key as Any));
          }
        }
        setViolations(error.violations || null);

        if (!isHandled) {
          // popup.showToast(null, error);
        }
      }

      return result;
    },

    [model.fieldNames]
  );

  const validate = useCallback(
    (...fieldsToValidate: (keyof I)[]) => {
      const violations = model.validate(...fieldsToValidate);
      if (violations) {
        // translate
        const trViolations = Object.keys(violations).reduce((v, k) => ({ ...v, [k]: violations[k] }), {});
        setViolations(trViolations);
      } else {
        setViolations(null);
      }
      return !!violations;
    },
    [model]
  );

  const form: FormModel<I> = useMemo(() => {
    return createFormModel(builder, handleValueChange);
  }, [builder, handleValueChange]);

  updateValue(form, values);

  return {
    form,
    errors: violations || {},
    setResponse: handleResponse,
    setValue: handleValueChange,
    setValues: handleModelValueChange,
    validate,
    values,
  };
}

export type UseModel<I extends TObject = TObject> = ReturnType<typeof useModel<I>>;

function updateValue<I extends TObject>(form: FormModel<I>, values: I) {
  for (const name of Object.keys(values)) {
    const value = values[name];
    const field = (form as Any)[name];

    if (isParentField(field)) {
      updateValue(field.form, value);
    } else {
      (form[name] as Any).value = values[name];
    }
  }
}

function createFormModel<I extends TObject>(builder: ModelConstructor<I>, onChange: FormField["onChange"]): FormModel<I> {
  const form = {} as FormModel<I>;
  const model = new builder();

  for (const name of model.fieldNames) {
    form[name] = getFormData(name, builder, onChange) as Any;
  }

  return form;
}

function getFormData<I extends TObject, K extends StringKeys<I>>(
  name: K,
  builder: ModelConstructor,
  onChange: FormField["onChange"]
): FormField<I, K> | ParentFormField<I> {
  const props = builder.fields[name].props;

  if (props.type === "Object") {
    if (props.model) {
      function changeHandler(value: unknown, nestedName: string) {
        onChange({ [nestedName]: value }, name);
      }
      return {
        name,
        form: createFormModel(props.model, changeHandler) as Any,
      };
    }
    // return { name, form: {} };
  }

  return {
    name,
    options: props.enum?.map((value) => ({ id: value, title: value })),
    onChange: onChange,
  } as unknown as FormField<I, K>;
}

function isParentField(field: ParentFormField | FormField): field is ParentFormField {
  return "form" in field;
}
