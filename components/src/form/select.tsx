import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef } from "react";
import type { Any, ClassName, Nullable, Option } from "@tntfx/core";
import { useStateReducer, useToggle } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { BaseInput } from "./base-input";
import type { FormElementProps } from "./form-element";
import { FormElement } from "./form-element";
import { TextInput } from "./text-input";
import { Backdrop } from "../backdrop";
import { Icon } from "../icon";
import { MenuList } from "../menu";
import { Svg } from "../svg";
import { Text } from "../typography/text";
import "./select.scss";

const OFFSET = 32;

type State<T extends string = string> = {
  filteredOptions: Option<T>[];
  text: string;
  displayValue: string;
  dropdown?: {
    direction: "up" | "down";
    left: number;
    maxHeight: number;
    position: number;
    width: number;
  };
};

const initialState: State = { filteredOptions: [], text: "", displayValue: "" };

type SelectProps<T extends string = string, M extends boolean = false> = FormElementProps & {
  options: Option<T>[];
  searchable?: boolean;
  readOnly?: boolean;
  value?: M extends true ? T[] : T;
  placeholder?: string;
  multi?: M;
  onChange?: (value: M extends true ? T[] : T, name: string) => void;
};

export function Select<T extends string = string, M extends boolean = false>(props: ClassName<SelectProps<T, M>>) {
  const {
    name,
    label,
    error,
    value,
    options,
    onChange,
    placeholder,
    disabled,
    readOnly,
    className,
    searchable,
    isLoading,
    multi,
  } = props;

  const [isOpen, showDropdown, hideDropdown] = useToggle();
  const listRef = useRef<Nullable<HTMLUListElement>>(null);
  const inputRef = useRef<Nullable<HTMLInputElement>>(null);
  const [{ filteredOptions, text, dropdown, displayValue }, setState] = useStateReducer(initialState as State<T>);

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
    [hideDropdown, multi, name, onChange, options, setState, value],
  );

  const handleTextChange = useCallback(
    (text: string) => {
      if (text) {
        const regex = new RegExp(text, "ig");
        setState({ filteredOptions: options.filter(({ title }) => regex.test(title)), text });
      } else {
        setState({ filteredOptions: options, text: "" });
      }
    },
    [options, setState],
  );

  const handleShowDropdown = useCallback(() => {
    if (!readOnly) {
      showDropdown();
    }
  }, [readOnly, showDropdown]);

  function handleDropdownClick(e: MouseEvent) {
    e.stopPropagation();
  }

  const toggleMultiselectItem = useCallback(
    (id: T) => {
      const currentValue = assertMultiValue<T>(value);
      if (currentValue.includes(id)) {
        onChange?.(currentValue.filter((item) => item !== id) as Any, name || "");
      } else {
        onChange?.([...currentValue, id] as Any, name || "");
      }
    },
    [name, onChange, value],
  );

  // setting dropdown position
  useEffect(() => {
    if (!isOpen || !inputRef.current) return;

    const { bottom, left, top, width } = inputRef.current.getBoundingClientRect() || {};
    const maxUpHeight = top - OFFSET;
    const maxDownHeight = window.innerHeight - bottom - OFFSET;

    if (maxDownHeight >= maxUpHeight) {
      setState({ dropdown: { direction: "down", maxHeight: maxDownHeight, left, width, position: bottom } });
    } else {
      setState({ dropdown: { direction: "up", maxHeight: maxUpHeight, left, width, position: top } });
    }
  }, [isOpen, setState]);

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
        setState({ displayValue: options.find(({ id }) => value == id)?.title || "" });
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
  const isDropup = dropdown?.direction === "up";
  const shouldShowDropdown = Boolean(isOpen && !disabled && dropdown);
  const dirClassName = isDropup ? "is-dropup" : "is-dropdown";
  const multiValues = multi ? assertMultiValue(value) : [];

  return (
    <FormElement
      className={classNames("select", className, dirClassName, { "is-open": shouldShowDropdown, pristine: !value })}
      disabled={disabled}
      error={error}
      isLoading={isLoading}
      label={label}
      name={name}
      ref={inputRef}
    >
      <BaseInput
        readOnly
        className={"select-input"}
        disabled={disabled}
        placeholder={placeholder}
        value={displayValue}
        onClick={handleShowDropdown}
        onFocus={handleShowDropdown}
      />
      <Svg className="control-icon" name="down" size="small" />

      {shouldShowDropdown && (
        <Backdrop global isOpen background="transparent" className="select-backdrop" onClick={hideDropdown}>
          <div
            className={classNames("select-dropdown", dirClassName)}
            style={{
              top: isDropup ? "unset" : dropdown?.position,
              bottom: isDropup ? dropdown?.position : "unset",
              left: dropdown?.left,
              width: dropdown?.width,
              maxHeight: dropdown?.maxHeight,
            }}
            onClick={handleDropdownClick}
          >
            {searchable && !isEmpty && (
              <TextInput
                className="select-dropdown-input"
                name="text"
                placeholder="Search"
                value={text}
                onChange={handleTextChange}
              />
            )}

            {isEmpty ? (
              <Text className="select-dropdown-empty">Empty</Text>
            ) : (
              <MenuList<T>
                className="select-dropdown-list"
                items={filteredOptions}
                ref={listRef}
                render={(item) => {
                  return (
                    <Text key={item.id}>
                      {multi ? (
                        <Icon
                          name={multiValues.includes(item.id) ? "checkSquare" : "square"}
                          onClick={() => toggleMultiselectItem(item.id)}
                        />
                      ) : null}
                      {item.title}
                    </Text>
                  );
                }}
                onClick={handleItemSelect}
              />
            )}
          </div>
        </Backdrop>
      )}
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
