import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ModelConstructor, Option } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./form.style";
import type { BoxProps } from "../layout";
import { Box } from "../layout";
import { ActionBar } from "../layout/bar/action-bar";
import { Text } from "../text";

export interface FormProps<T extends object> extends BoxProps {
  className?: string;
  legend?: string;
  actions?: Option[];
  Model: ModelConstructor<T>;
}

export function Form<T extends object>(props: FormProps<T>) {
  const { Model, actions, legend, children, className, ...libProps } = props;

  const classes = useStyle();
  const form = useModel(Model);

  return (
    <FormProvider {...form}>
      <Box className={classNames(classes.root, className)} role="form" {...libProps}>
        {legend && <Text className={classes.legend}>{legend}</Text>}

        {children}

        {actions && <ActionBar actions={actions} className={classes.actions} />}
      </Box>
    </FormProvider>
  );
}

export function useModel<T extends object>(Model: ModelConstructor<T>) {
  const [model] = useState(() => new Model());

  const form = useForm<T>({
    resolver: zodResolver(model.schema),
  });

  return form;
}

export { FormProvider, useFormContext as useForm, useWatch } from "react-hook-form";
