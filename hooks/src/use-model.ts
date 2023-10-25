import { useCallback, useMemo, useState } from "react";
import type { Any, Model, ModelConstructor, Nullable, TObject, Violations } from "@tntfx/core";
import { Err } from "@tntfx/core";
import type { ParsedResponse } from "./api/types";
import { parseResponse } from "./api/utils";

export function useModel<I extends TObject = TObject>(builder: ModelConstructor<I>, initialValue?: Nullable<Partial<I>>) {
  // const popup = usePopup();
  const [model] = useState<Model<I>>(() => {
    const model = new builder();
    if (initialValue) model.setValues(initialValue);
    return model;
  });

  const [values, setValues] = useState(model.getValues());
  const [violations, setViolations] = useState<Nullable<Violations>>({});

  const handleValueChange = useCallback(
    (value: unknown, name: string | keyof I) => {
      model.setValues({ [name]: value } as Any);
      setValues(model.getValues());
    },
    [model],
  );

  const handleModelValueChange = useCallback(
    (values: Partial<I>) => {
      model.setValues(values);
      setValues(model.getValues());
    },
    [model],
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

    [model.fieldNames],
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
    [model],
  );

  return useMemo(
    () => ({
      errors: violations || {},
      setResponse: handleResponse,
      setValue: handleValueChange,
      setValues: handleModelValueChange,
      validate,
      values,
    }),
    [handleModelValueChange, handleResponse, handleValueChange, validate, values, violations],
  );
}

export type UseModel<I extends TObject = TObject> = ReturnType<typeof useModel<I>>;
