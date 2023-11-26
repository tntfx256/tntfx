import { type Accent, memoize, type Props } from "@tntfx/core";
import { classNames, useParseProps } from "@tntfx/theme";
import { FormElement } from "./form-element";
import "./toggle.scss";

export interface ToggleProps extends Props {
  disabled?: boolean;
  label?: string;
  value: boolean;
  name: string;
  error?: string;
  accent?: Accent | `${Accent}`;
  onChange: (status: boolean, name: string) => void;
}

export const Toggle = memoize(function Toggle(props: ToggleProps) {
  const { label, value, name, onChange, error, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

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
      role="switch"
      style={style}
      onClick={handleCheckChange}
    >
      <div className="toggle__container">
        <input checked={value} className="toggle__checkbox" disabled={props.disabled} name={name} type="checkbox" />
        <div className="toggle__indicator" />
      </div>
    </FormElement>
  );
});
