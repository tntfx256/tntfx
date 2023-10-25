import type { ForwardedRef, MouseEvent } from "react";
import { forwardRef, useCallback } from "react";
import type { ClassAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Loader } from "../loader";
import { Text } from "../typography/text";
import "./form-element.scss";

export type ModifiedAttributes = "onChange";

export interface FormElementProps {
  name: string;
  isLoading?: boolean;
  label?: string;
  error?: string;
  help?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
}

export const FormElement = forwardRef(function FormElement(
  props: ClassAndChildren<FormElementProps>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { className, label, error, help, children, name, isLoading, disabled, onClick } = props;

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClick?.();
    },
    [onClick]
  );

  const hasHint = Boolean(error || help);
  const hasError = !!error;

  return (
    <div className={classNames("form-element", className, { error: hasError })} ref={ref} onClick={handleClick}>
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      {children}
      {hasHint && (
        <Text className="hint" size="xSmall">
          {error || help}
        </Text>
      )}
      <Loader visible={isLoading} />
    </div>
  );
});
