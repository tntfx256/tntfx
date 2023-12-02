import type {
  ForwardRefExoticComponent,
  MouseEvent,
  PropsWithoutRef,
  PropsWithRef,
  ReactElement,
  ReactNode,
  RefAttributes,
} from "react";
import type { Any, Nullable, Option, Props } from "@tntfx/core";

export type MenuType = "static" | "context" | "dropdown";

interface CommonProps<T extends string = string> extends Props {
  horizontal?: boolean;
  selectedItem?: T;
  menuType?: MenuType;
  submenuType?: MenuType;
  onClick?: (id: T, e: MouseEvent) => void;
  //
  isOpen?: boolean;
  onClose?: () => void;
}

export interface MenuItemProps<T extends string = string> extends CommonProps<T> {
  item: Option<T>;

  render?: (item: Option<T>, selectedItem?: T) => ReactNode;
}

export interface MenuProps<T extends string = string> extends CommonProps<T> {
  isSubmenu?: boolean;
  items?: Option<T>[];
  target?: Nullable<HTMLElement>;
  switchSlotsBasedOnMenuPosition?: boolean;
  // render?: (items?: Option<T>[], selectedItem?: T) => ReactNode;
  renderItem?: (item: Option<T>, selectedItem?: T) => ReactElement;

  slots?: {
    trigger?: ReactElement<PropsWithRef<Any>>;
    header?: ReactElement;
    footer?: ReactElement;
  };
}
