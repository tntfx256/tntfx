import type { AriaRole, ForwardedRef, MouseEvent } from "react";
import { forwardRef } from "react";
import { memoize, type PropsAndChildren } from "@tntfx/core";
import { classNames, useParseProps } from "@tntfx/theme";
import { Box } from "../layout";
import { Loader } from "../loader";
import { Text } from "../typography/text";
import "./form-element.scss";

export type ModifiedAttributes = "onChange";

export interface FormElementProps extends PropsAndChildren {
  name: string;
  isLoading?: boolean;
  label?: string;
  error?: string;
  help?: string;
  disabled?: boolean;
  readOnly?: boolean;
  role?: AriaRole;
  onClick?: (e: MouseEvent) => void;
}

function FormElementWithRef(props: FormElementProps, ref: ForwardedRef<HTMLDivElement>) {
  const { label, error, help, children, name, onClick, role, isLoading, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  const hasHint = Boolean(error || help);
  const hasError = !!error;

  return (
    <Box
      horizontal
      className={classNames("formElement", className, { "formElement--error": hasError })}
      ref={ref}
      role={role}
      style={style}
      onClick={onClick}
    >
      {label && (
        <label className="formElement__label" htmlFor={name}>
          {label}
        </label>
      )}

      {children}

      {hasHint && (
        <Text className="formElement__hint" fontSize="xs">
          {error || help}
        </Text>
      )}
      <Loader visible={isLoading} />
    </Box>
  );
}

export const FormElement = memoize(forwardRef(FormElementWithRef));
FormElement.displayName = "FormElement";
