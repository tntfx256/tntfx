import { useState } from "react";
import type { UseFormProps, UseFormReturn } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { Field } from "@fluentui/react-components";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Actionable, FormValues, ModelConstructor } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useRowStyle, useStackStyle, useStyle } from "./form.style";
import type { BoxProps } from "../../base-components";
import { ActionBar, Box, Text } from "../../base-components";

export interface FormProps<T extends object, A extends string = string> extends BoxProps, Actionable<A> {
  className?: string;
  legend?: string;
  form: UseFormReturn<T>;
}

export function Form<T extends object>(props: FormProps<T>) {
  const { form, actions, legend, children, className, ...libProps } = props;

  const classes = useStyle();

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

export type UseModelReturn<T extends object> = UseFormReturn<FormValues<T>>;
export function useModel<T extends object>(
  Model: ModelConstructor<T>,
  props: UseFormProps<FormValues<T>> = {}
): UseModelReturn<T> {
  const [model] = useState(() => new Model());

  const form = useForm<FormValues<T>>({
    resolver: zodResolver(model.schema),
    ...props,
  });

  return form;
}

type FormRowProps = Omit<BoxProps, "horizontal"> & {
  title?: string;
};

export function FormRow(props: FormRowProps) {
  const { className, children, title, ...rest } = props;
  const { root, field } = useRowStyle();

  return (
    <Field className={field} label={title}>
      <Box horizontal className={classNames(root, className)} {...rest}>
        {children}
      </Box>
    </Field>
  );
}

type FormStackProps = Omit<BoxProps, "horizontal">;
export function FormStack(props: FormStackProps) {
  const { className, children, ...rest } = props;
  const { root } = useStackStyle();

  return (
    <Box className={classNames(root, className)} {...rest}>
      {children}
    </Box>
  );
}

export type { DefaultValues } from "react-hook-form";
export { FormProvider, useFormContext as useForm, useWatch } from "react-hook-form";
