import type { MouseEvent } from "react";
import { useCallback, useEffect } from "react";
import type { Any, Nullable, Option, Props } from "@tntfx/core";
import { useRefState, useStateReducer, useToggle } from "@tntfx/hooks";
import { Icon } from "@tntfx/icons";
import { classNames, useParseProps } from "@tntfx/theme";
import { BaseInput } from "./base-input";
import type { FormElementProps } from "./form-element";
import { FormElement } from "./form-element";
import { TextInput } from "./text-input";
import { Box } from "../layout";
import { Menu } from "../menu";
import { Text } from "../typography";
import "./select.scss";

type State<T extends string = string> = {
  filteredOptions: Option<T>[];
  text: string;
  displayValue: string;
};

const initialState: State = { filteredOptions: [], text: "", displayValue: "" };

export interface SelectProps<T extends string = string, M extends boolean = false> extends FormElementProps, Props {
  options?: Option<T>[];
  searchable?: boolean;
  readOnly?: boolean;
  value?: M extends true ? T[] : T;
  placeholder?: string;
  multi?: M;
  onChange?: (value: M extends true ? T[] : T, name: string) => void;
}

export function Select<T extends string = string, M extends boolean = false>(props: SelectProps<T, M>) {
  const { name, value, options = [], onChange, placeholder, searchable, multi, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  const [isOpen, , hideDropdown, toggleSubmenu] = useToggle();
  const [target, targetRefHandler] = useRefState<Nullable<HTMLInputElement>>();
  const [{ filteredOptions, text, displayValue }, setState] = useStateReducer(initialState as State<T>);

  const handleItemSelect = useCallback(
    (id: T) => {
      hideDropdown();
      if (!onChange) return;
      if (multi) {
        const existing = assertMultiValue(value);
        if (existing.includes(id)) {
          onChange(existing.filter((o) => o != id) as Any, name || "");
        } else {
          onChange?.([...existing, id] as Any, name || "");
        }
      } else {
        onChange?.(id as Any, name || "");
      }
      setState({ filteredOptions: options, text: "" });
    },
    [hideDropdown, multi, name, onChange, options, setState, value]
  );

  const handleTextChange = useCallback(
    (text: string) => {
      if (text) {
        const regex = new RegExp(text, "ig");
        setState({
          filteredOptions: options.filter(({ title }) => regex.test(title)),
          text,
        });
      } else {
        setState({ filteredOptions: options, text: "" });
      }
    },
    [options, setState]
  );

  const toggleMultiselectItem = useCallback(
    (id: T, e: MouseEvent) => {
      e.stopPropagation();

      const currentValue = assertMultiValue<T>(value);
      if (currentValue.includes(id)) {
        onChange?.(currentValue.filter((item) => item !== id) as Any, name || "");
      } else {
        onChange?.([...currentValue, id] as Any, name || "");
      }
    },
    [name, onChange, value]
  );

  // display value
  useEffect(() => {
    if (value) {
      if (multi) {
        setState({
          displayValue: options
            .filter(({ id }) => value.includes(id))
            .map(({ title }) => title)
            .join(", "),
        });
      } else {
        setState({
          displayValue: options.find(({ id }) => value == id)?.title || "",
        });
      }
    } else {
      setState({ displayValue: "" });
    }
  }, [multi, options, setState, value]);

  // reset filtered options
  useEffect(() => {
    setState({ filteredOptions: options });
  }, [options, setState]);

  const isEmpty = options.length < 1;
  const multiValues = multi ? assertMultiValue(value) : [];

  return (
    <FormElement
      name={name}
      ref={targetRefHandler}
      role="combobox"
      style={style}
      className={classNames("select", className, {
        "--isOpen": isOpen,
        "--isEmpty": isEmpty,
        "--pristine": !value,
      })}
    >
      <BaseInput
        readOnly
        className="select__input"
        placeholder={placeholder}
        slots={{ end: <Icon className="select__dorpdownIcon" name="down" /> }}
        value={displayValue}
        onClick={toggleSubmenu}
      />

      <Menu
        switchSlotsBasedOnMenuPosition
        className="select__menu"
        isOpen={isOpen}
        items={filteredOptions}
        menuType="dropdown"
        role="listbox"
        target={target}
        renderItem={(item) => (
          <Box key={item.id} horizontal className="menuItem__body">
            {multi ? (
              <Icon
                className="menuItem__Icon"
                name={multiValues.includes(item.id) ? "checkSquare" : "square"}
                onClick={(e) => toggleMultiselectItem(item.id, e)}
              />
            ) : null}

            {typeof item.icon === "string" ? <Icon className="menuItem__icon" name={item.icon} /> : item.icon}

            <Text className="menuItem__title">{item.title}</Text>
          </Box>
        )}
        slots={{
          header: searchable ? (
            <TextInput
              className="select__searchInput"
              name="text"
              placeholder="Search"
              readOnly={isEmpty}
              role="searchbox"
              value={text}
              onChange={handleTextChange}
            />
          ) : undefined,
        }}
        onClick={handleItemSelect}
        onClose={hideDropdown}
      />
    </FormElement>
  );
}

function assertMultiValue<T>(value: undefined | T | T[]): T[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}
