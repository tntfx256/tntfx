import { type FC, type ForwardedRef, forwardRef, useRef } from "react";
import type { FieldProps as LibFieldProps } from "@fluentui/react-components";
import { Field } from "@fluentui/react-components";
import { isRefValid } from "../utils";

export type FieldProps = {
  orientation?: LibFieldProps["orientation"];
  required?: LibFieldProps["required"];
  label?: LibFieldProps["label"];
  validationMessage?: LibFieldProps["validationMessage"];
  validationMessageIcon?: LibFieldProps["validationMessageIcon"];
  validationState?: LibFieldProps["validationState"];
  hint?: LibFieldProps["hint"];
};

export function withFieldWrapper<T extends object = object, E = HTMLElement>(Component: FC<T>) {
  function WithField(props: FieldProps & T, ref?: ForwardedRef<E>) {
    const { label, validationMessage, validationMessageIcon, validationState, hint, orientation, ...childProps } = props;

    const internalRef = useRef<E>(null);
    const passedRef = isRefValid(ref) ? ref : internalRef;

    return (
      <Field
        hint={hint}
        label={label}
        orientation={orientation}
        required={props.required}
        validationMessage={validationMessage}
        validationMessageIcon={validationMessageIcon}
        validationState={validationState}
      >
        <Component {...(childProps as T)} ref={passedRef} />
      </Field>
    );
  }

  WithField.displayName = `WithField(${Component.displayName || Component.name})`;

  return forwardRef(WithField);
}
