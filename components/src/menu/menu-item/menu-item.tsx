import type { MouseEvent, ReactNode } from "react";
import type { ClassName, Option } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import { MenuItemHorizontal } from "./menu-item-horizontal";
import { MenuItemVertical } from "./menu-item-vertical";
import "./menu-item.scss";

export type MenuItemProps<T extends string = string> = ClassName & {
  item: Option<T>;
  selected?: boolean;
  horizontal?: boolean;
  onClick?: (id: T) => void;
  render?: (item: Option<T>, selected?: boolean) => ReactNode;
};

export function MenuItem<T extends string = string>(props: MenuItemProps<T>) {
  const [className, { item, onClick, horizontal }] = parseProps(props);

  function clickHandler(e: MouseEvent) {
    e.stopPropagation();
    onClick?.(item.id);
  }

  const { disabled, children } = item;
  const hasChildren = children && children.length > 0;

  return item.hidden ? null : (
    <li
      aria-disabled={item.disabled}
      className={classNames("menuItem --hover", { "--disabled": disabled }, className)}
      role="menuitem"
      value={item.id}
      onClick={item.disabled || hasChildren ? undefined : clickHandler}
    >
      {horizontal ? <MenuItemHorizontal {...props} /> : <MenuItemVertical item={item} />}
    </li>
  );
}
