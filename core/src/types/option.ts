import type { IconName } from "@tntfx/icons";
import type { EnumString, StringKeys } from "./base";
import type { Accent, Size, Variant } from "./theme";

export type Option<T extends string = string> = {
  id: T;
  title: string;
  avatar?: string;
  children?: Option<T>[];
  disabled?: boolean;
  external?: boolean;
  hidden?: boolean;
  href?: string;
  icon?: IconName;
  iconPosition?: "before" | "after";
  path?: string;
  size?: EnumString<Size>;
  accent?: EnumString<Accent>;
  variant?: EnumString<Variant>;
};

export const OptionModel = {
  convert(options: object | ReadonlyArray<string>) {
    if (Array.isArray(options)) {
      type T = (typeof options)[number];
      return options.map((id) => ({ id, title: id })) as Option<T>[];
    }

    type K = StringKeys<typeof options>;
    const keys = Object.keys(options) as K[];
    return keys.map((id) => ({ id, title: options[id] }) as Option<K>);
  },
};
