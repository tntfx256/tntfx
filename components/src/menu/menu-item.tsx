import type { MouseEvent, ReactNode } from "react";
import type { ClassName, Layout, Option } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Icon } from "../icon";
import { Link } from "../typography/link";
import { Text } from "../typography/text";
import "./menu-item.scss";

export type MenuItemProps<T extends string = string> = {
  item: Option<T>;
  selected?: boolean;
  onClick?: (id: T) => void;
  layout?: Layout;
  render?: (item: Option<T>, selected?: boolean) => ReactNode;
};

export function MenuItem<T extends string = string>(props: ClassName<MenuItemProps<T>>) {
  const { item, selected, onClick, className, render, layout = "vertical" } = props;

  function clickHandler(e: MouseEvent) {
    e.stopPropagation();
    onClick?.(item.id);
  }

  return item.hidden ? null : (
    <li
      value={item.id}
      className={classNames("menu-item", className, `layout-${layout}`, {
        clickable: onClick || item.href,
        selected,
      })}
      onClick={item.disabled ? undefined : clickHandler}
    >
      {render ? (
        render(item, selected)
      ) : (
        <>
          {item.icon && <Icon name={item.icon} />}

          {item.href ? (
            <Link external={item.external} href={item.href} size="small" whiteSpace="nowrap">
              {item.title}
            </Link>
          ) : (
            <Text size="small" whiteSpace="nowrap">
              {item.title}
            </Text>
          )}
        </>
      )}
    </li>
  );
}
