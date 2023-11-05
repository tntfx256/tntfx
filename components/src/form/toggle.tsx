import type { ClassName } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import { FormElement } from "./form-element";
import "./toggle.scss";

export type ToggleProps = {
  disabled?: boolean;
  label?: string;
  value: boolean;
  name: string;
  error?: string;
  onChange: (status: boolean, name: string) => void;
};

export function Toggle(props: ClassName<ToggleProps>) {
  const [className, { label, value, name, onChange, error }] = parseProps(props);

  function handleCheckChange() {
    if (!props.disabled) {
      onChange(!value, name);
    }
  }

  return (
    <FormElement
      className={classNames("toggle", className, { "toggle--checked": value })}
      error={error}
      label={label}
      name={name}
      onClick={handleCheckChange}
    >
      <div className="toggle__container">
        <input checked={value} className="toggle__checkbox" disabled={props.disabled} name={name} type="checkbox" />
        <div className="toggle__indicator" />
      </div>
    </FormElement>
  );
}
