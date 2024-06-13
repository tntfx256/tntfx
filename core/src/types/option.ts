import type { IconName } from "@tntfx/icons";
import type { EnumString, Keys, StringKeys } from "./base";
import type { Accent, Size, Variant } from "./theme";

export type Option<T extends string | number = string> = {
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
  fromEnum<T extends Record<string, string | number>>(object: T) {
    type K = StringKeys<typeof object>;
    const keys = Object.keys(object) as K[];
    return keys.map((title) => ({ id: object[title], title }) as Option<T[K]>);
  },

  fromArray(array: ReadonlyArray<string | number>) {
    type T = (typeof array)[number];
    return array.map((id) => ({ id, title: id })) as Option<T>[];
  },

  fromList<T extends Record<string, string | number>, K extends Keys<T>>(list: T[], idKey: K, titleKey: Keys<T>) {
    return list.map((option) => ({
      id: option[idKey],
      title: option[titleKey],
    })) as Option<T[K]>[];
  },

  toZodEnum<T extends string | number>(options: Option<T>[]) {
    return options.map((option) => option.id) as unknown as [`${T}`, ...`${T}`[]];
  },

  /** @deprecated use from<Source> methods */
  convert(options: Record<string, string | number> | ReadonlyArray<string | number>) {
    if (Array.isArray(options)) {
      type T = (typeof options)[number];
      return options.map((id) => ({ id, title: id })) as Option<T>[];
    }

    type K = StringKeys<typeof options>;
    const keys = Object.keys(options) as K[];
    return keys.map((title) => ({ id: options[title], title }) as Option<K>);
  },

  /** @deprecated use from<Source> methods */
  toOptions<T extends Record<string, string | number>, K extends Keys<T>>(list: T[], idKey: K, titleKey: Keys<T>) {
    return list.map((option) => ({
      id: option[idKey],
      title: option[titleKey],
    })) as Option<T[K]>[];
  },
};
