import { type FC, type ForwardedRef, forwardRef, useRef } from "react";
import type { FieldProps as LibFieldProps } from "@fluentui/react-components";
import { Field } from "@fluentui/react-components";
import { useStyle } from "./field.style";
import { isRefValid } from "../../utils";

export type FieldProps = {
  orientation?: LibFieldProps["orientation"];
  required?: LibFieldProps["required"];
  label?: LibFieldProps["label"];
  validationMessage?: LibFieldProps["validationMessage"];
  validationMessageIcon?: LibFieldProps["validationMessageIcon"];
  validationState?: LibFieldProps["validationState"];
  hint?: LibFieldProps["hint"];
};

type FieldWrapperConfig = {
  hideLabel?: boolean;
};

export function withFieldWrapper<T extends object = object, E = HTMLElement>(
  Component: FC<T>,
  config: FieldWrapperConfig = {}
) {
  const { hideLabel = false } = config;
  function WithField(props: FieldProps & T, ref?: ForwardedRef<E>) {
    const { label, validationMessage, validationMessageIcon, validationState, hint, orientation, ...childProps } = props;

    const classes = useStyle();
    const internalRef = useRef<E>(null);
    const passedRef = isRefValid(ref) ? ref : internalRef;

    return (
      <Field
        className={classes.root}
        hint={hint}
        label={hideLabel ? undefined : label}
        orientation={orientation}
        required={props.required}
        validationMessage={validationMessage}
        validationMessageIcon={validationMessageIcon}
        validationState={validationState}
      >
        <Component {...(childProps as T)} label={hideLabel ? label : undefined} ref={passedRef} />
      </Field>
    );
  }

  WithField.displayName = `WithField(${Component.displayName || Component.name})`;

  return forwardRef(WithField);
}
