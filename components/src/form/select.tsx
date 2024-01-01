import type { FC, ForwardedRef } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { DropdownProps } from "@fluentui/react-components";
import { Dropdown, Option } from "@fluentui/react-components";
import type { Defined, Option as TOption } from "@tntfx/core";
import { withFieldWrapper } from "./field";
import type { ElementProps } from "./types";
import { extendOptions } from "./utils";
import { Icon } from "../icon";

type SelfProps<T extends string, M extends boolean> = Omit<DropdownProps, "multiselect"> & {
  multiselect?: M;
  options: TOption<T>[];
};
export type SelectProps<T extends string, M extends boolean> = ElementProps<SelfProps<T, M>, M extends true ? T[] : T>;

function SelectWithRef<T extends string = string, M extends boolean = false>(
  props: SelectProps<T, M>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { options = [], onChange, multiselect, ...rest } = props;

  const optionSelectHandler = useCallback<Defined<DropdownProps["onOptionSelect"]>>(
    (ev, data) => {
      onChange?.(multiselect ? data.selectedOptions : (data.selectedOptions[0] as any));
    },
    [multiselect, onChange]
  );

  const allOptions = useMemo(() => extendOptions(options, !rest.required), [options, rest.required]);

  return (
    <Dropdown multiselect={multiselect} ref={ref} onOptionSelect={optionSelectHandler} {...rest}>
      {allOptions.map(({ id, title, disabled, icon }) => (
        <Option key={id} disabled={disabled} text={title} value={id}>
          {icon && <Icon name={icon} />}
          {title}
        </Option>
      ))}
    </Dropdown>
  );
}

export const Select = withFieldWrapper(forwardRef(SelectWithRef)) as <T extends string = string, M extends boolean = false>(
  props: SelectProps<T, M> & { ref?: ForwardedRef<HTMLButtonElement> }
) => JSX.Element;
(Select as FC).displayName = "Select";

export function ControlledSelect<T extends string = string, M extends boolean = false>(props: SelectProps<T, M>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name!}
      render={({ field, fieldState }) => (
        <Select<T, M>
          validationMessage={fieldState.error?.message}
          validationState={fieldState.invalid ? "error" : "none"}
          {...field}
          {...props}
        />
      )}
    />
  );
}
