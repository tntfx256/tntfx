import type { PropsWithChildren, ReactElement } from "react";
import { memo } from "react";
import type { Any, Option } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { MenuItem } from "./menu-item";
import "./menubar.scss";

export type MenubarProps<T extends string = string> = {
  items: Option<T>[];
  className?: string;
  onClick?: (id: T) => void;
  selected?: T;
};

export const Menubar = memo(function Menubar<T extends string = string>(props: PropsWithChildren<MenubarProps<T>>) {
  const { className, items, onClick, children, selected, ...libProps } = props;

  const hasItems = items && items.length > 0;

  return (
    <ul className={classNames("menubar", className)} {...libProps}>
      {hasItems &&
        items.map((item) => (
          <MenuItem<T> key={item.id} item={item} layout="horizontal" selected={item.id === selected} onClick={onClick} />
        ))}

      {children}
    </ul>
  );
}) as <T extends string = string>(
  props: PropsWithChildren<MenubarProps<T>>
) => ReactElement<PropsWithChildren<MenubarProps<T>>>;

(Menubar as Any).Item = MenuItem;
