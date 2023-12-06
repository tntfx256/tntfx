import type { ChangeEvent } from "react";
import type { SwitchOnChangeData, SwitchProps } from "@fluentui/react-components";
import { Switch } from "@fluentui/react-components";
import { memoize } from "@tntfx/core";

export type ToggleProps = Omit<SwitchProps, "onChange"> & {
  onChange: (status: boolean, name?: string) => void;
};

export const Toggle = memoize(function Toggle(props: ToggleProps) {
  const { name, onChange, ...libProps } = props;

  function handleCheckChange(e: ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) {
    onChange(data.checked, name);
  }

  return <Switch name={name} role="switch" onChange={handleCheckChange} {...libProps} />;
});
