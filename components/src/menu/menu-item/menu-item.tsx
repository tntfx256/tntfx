import type { ClassName, Option } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { MouseEvent, ReactNode } from "react";
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
  const { item, selected, onClick, className, render, horizontal } = props;

  function clickHandler(e: MouseEvent) {
    e.stopPropagation();
    onClick?.(item.id);
  }

  const { disabled, children, icon, href } = item;
  const hasChildren = children && children.length > 0;

  return item.hidden ? null : (
    <li
      role="menuitem"
      aria-disabled={item.disabled}
      value={item.id}
      className={classNames("menuItem", className)}
      onClick={item.disabled || hasChildren ? undefined : clickHandler}
    >
      {horizontal ? <MenuItemHorizontal {...props} /> : <MenuItemVertical item={item} />}
    </li>
  );
}
