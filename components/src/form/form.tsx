import type { FormEvent } from "react";
import { useCallback } from "react";
import type { ClassAndChildren, Option } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import { Box } from "../layout";
import { ActionBar } from "../layout/bar/action-bar";
import { Text } from "../typography/text";
import "./form.scss";

export type FormProps = EnhancedProps & {
  legend?: string;
  actions?: Option[];
  onSubmit?: () => void;
};

export function Form(props: ClassAndChildren<FormProps>) {
  const [className, { actions, legend, children, onSubmit }] = parseProps(props);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onSubmit?.();
    },
    [onSubmit]
  );

  return (
    <Box className={classNames("form", className)}>
      {legend && <Text className="form__legend">{legend}</Text>}

      <form onSubmit={handleSubmit}>
        {children}

        {actions && <ActionBar actions={actions} className="form__actions" />}
      </form>
    </Box>
  );
}
