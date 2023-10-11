import type { ForwardedRef } from "react";
import { forwardRef, useCallback } from "react";
import type { Any, ClassAndChildren, MaybePromise, Option } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { MenuItemProps } from "./menu-item";
import { MenuItem } from "./menu-item";
import "./menu-list.scss";

export type MenuListProps<T extends string = string> = {
  items?: Option<T>[];
  selected?: T;
  onClick?: (id: T) => MaybePromise<void>;
  render?: MenuItemProps<T>["render"];
};

function MenuListWithRef<T extends string = string>(
  props: ClassAndChildren<MenuListProps<T>>,
  ref: ForwardedRef<HTMLUListElement>
) {
  const { className, items, selected, onClick, children, render, ...libProps } = props;

  const handleMenuClick = useCallback(
    (id: T) => {
      return onClick?.(id);
    },
    [onClick]
  );

  return (
    <ul className={classNames("menu-list", className)} ref={ref} {...libProps}>
      {children ||
        items?.map((item) => (
          <MenuItem<T>
            key={item.id}
            item={item}
            render={render}
            selected={selected === item.id}
            onClick={onClick ? handleMenuClick : undefined}
          />
        ))}
    </ul>
  );
}

export const MenuList = forwardRef(MenuListWithRef) as <T extends string = string>(
  props: ClassAndChildren<MenuListProps<T>> & { ref?: ForwardedRef<HTMLUListElement> }
) => ReturnType<typeof MenuListWithRef>;

(MenuList as Any).Item = MenuItem;
