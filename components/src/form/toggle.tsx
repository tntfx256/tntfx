import type { ClassName } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
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
  const { disabled, label, value, name, onChange, error, className } = props;

  function handleCheckChange() {
    if (!disabled) {
      onChange(!value, name);
    }
  }

  return (
    <FormElement
      className={classNames("toggle", className, { _disabled: disabled, _checked: value })}
      error={error}
      label={label}
      name={name}
      onClick={handleCheckChange}
    >
      <div className="toggle-container">
        <input checked={value} className="toggle-checkbox" disabled={disabled} name={name} type="checkbox" />
        <div className="toggle-indicator" />
      </div>
    </FormElement>
  );
}
