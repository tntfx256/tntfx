import type { UseFormReturn } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import type { Actionable } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./form.style";
import type { BoxProps } from "../../base-components";
import { ActionBar, Box, Text } from "../../base-components";

export type { DefaultValues } from "react-hook-form";
export { FormProvider, useFormContext as useForm, useWatch } from "react-hook-form";

export interface FormProps<T extends object, A extends string = string> extends BoxProps, Actionable<A> {
  className?: string;
  legend?: string;
  form: UseFormReturn<T>;
}

export function Form<T extends object>(props: FormProps<T>) {
  const { form, actions, onAction, legend, children, className, ...libProps } = props;

  const classes = useStyle();

  return (
    <FormProvider {...form}>
      <Box className={classNames(classes.root, className)} role="form" {...libProps}>
        {legend && <Text className={classes.legend}>{legend}</Text>}

        {children}

        {actions && <ActionBar actions={actions} className={classes.actions} onAction={onAction} />}
      </Box>
    </FormProvider>
  );
}
