import type { ForwardedRef, HTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";
import type { Any, Option } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import type { MenuItemProps } from "./menu-item";
import { MenuItem } from "./menu-item";
import "./menu.scss";

type UL = Omit<HTMLAttributes<HTMLUListElement>, "onClick">;

export type MenubarProps<T extends string = string> = UL & {
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
  const [className, { items, onClick, children, selected, render, ...libProps }] = parseProps(props);

  const hasItems = items && items.length > 0;

  return (
    <ul className={classNames("menu", className)} ref={ref} role="menubar" {...libProps}>
      {hasItems &&
        items.map((item: Option<T>) => (
          <MenuItem<T>
            key={item.id}
            horizontal={props.horizontal}
            item={item}
            render={render}
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
