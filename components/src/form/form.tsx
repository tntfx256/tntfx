import type { FormEvent } from "react";
import { useCallback } from "react";
import type { ClassAndChildren, Option } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Box } from "../layout";
import { ActionBar } from "../layout/bar/action-bar";
import { Text } from "../typography/text";
import "./form.scss";

export type FormProps = {
  legend?: string;
  actions?: Option[];
  onSubmit?: () => void;
  bordered?: boolean;
};

export function Form(props: ClassAndChildren<FormProps>) {
  const { actions, legend, className, children, onSubmit, bordered } = props;

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onSubmit?.();
    },
    [onSubmit]
  );

  return (
    <Box className={classNames("form", className, { _bordered: bordered })}>
      {legend && <Text className="legend">{legend}</Text>}

      <form onSubmit={handleSubmit}>
        {children}

        {actions && <ActionBar actions={actions} />}
      </form>
    </Box>
  );
}
