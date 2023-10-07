import { createContext, useContext } from "react";
import type { ClassAndChildren, Violations } from "@tntfx/core";
import { getNestedErrors } from "@tntfx/core";
import { classNames } from "@tntfx/theme";

export interface NestedFormProviderProps {
  label?: string;
  fieldName: string;
  errors?: Violations;
}

type NestedFormContext = {
  getErrors(fieldNameOrIndex: number | string): Violations;
};

const nestedFormContext = createContext<NestedFormContext>({ getErrors: () => ({}) });

export function NestedFormProvider(props: ClassAndChildren<NestedFormProviderProps>) {
  const { fieldName, errors = {}, className, label, children } = props;
  const parentPrefix = `${fieldName}.`;

  const wrapperErrorMsg = errors[fieldName];

  function getErrors(prefix: string): Violations {
    return getNestedErrors(errors, parentPrefix + prefix);
  }

  return (
    <nestedFormContext.Provider value={{ getErrors }}>
      <fieldset className={classNames("nested-form", className)}>
        <legend className="nested-form-label">{label}</legend>
        {children}
        <p className="nested-form-error">{wrapperErrorMsg}</p>
      </fieldset>
    </nestedFormContext.Provider>
  );
}

export const useNestedForm = () => useContext(nestedFormContext);
