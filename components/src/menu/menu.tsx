import { forwardRef, type ForwardedRef, type PropsWithChildren } from "react";
import type { Any, Option } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { MenuItem, MenuItemProps } from "./menu-item";
import "./menu.scss";

export type MenubarProps<T extends string = string> = {
  horizontal?: boolean;
  items: Option<T>[];
  className?: string;
  onClick?: (id: T) => void;
  selected?: T;
  render?: MenuItemProps<T>["render"];
};

function MenuWithRef<T extends string = string>(
  props: PropsWithChildren<MenubarProps<T>>,
  ref: ForwardedRef<HTMLUListElement>
) {
  const {
    className,
    items,
    horizontal,
    onClick,
    children,
    selected,
    render,
    ...libProps
  } = props;

  const hasItems = items && items.length > 0;

  return (
    <ul
      ref={ref}
      role="menubar"
      className={classNames("menu", className, { horizontal })}
      {...libProps}
    >
      {hasItems &&
        items.map((item) => (
          <MenuItem<T>
            // layout={horizontal ? "horizontal" : "vertical"}
            render={render}
            key={item.id}
            item={item}
            selected={item.id === selected}
            onClick={onClick}
          />
        ))}

      {children}
    </ul>
  );
}

export const Menu = forwardRef(MenuWithRef) as <T extends string = string>(
  props: PropsWithChildren<MenubarProps<T>> & {
    ref?: ForwardedRef<HTMLUListElement>;
  }
) => JSX.Element;

(Menu as Any).displayName = "Menubar";
