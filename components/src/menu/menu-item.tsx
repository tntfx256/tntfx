import type { MouseEvent, ReactNode } from "react";
import type { ClassName, Layout, Option } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Icon } from "../icon";
import { Link } from "../typography/link";
import { Text } from "../typography/text";
import "./menu-item.scss";
import { Menu } from "./menu";

export type MenuItemProps<T extends string = string> = {
  item: Option<T>;
  selected?: boolean;
  onClick?: (id: T) => void;
  // layout?: Layout;
  render?: (item: Option<T>, selected?: boolean) => ReactNode;
};

export function MenuItem<T extends string = string>(
  props: ClassName<MenuItemProps<T>>
) {
  const {
    item,
    selected,
    onClick,
    className,
    render,
    // layout = "vertical",
  } = props;

  function clickHandler(e: MouseEvent) {
    e.stopPropagation();
    onClick?.(item.id);
  }

  const hasChildren = item.children && item.children.length > 0;

  return item.hidden ? null : (
    <li
      role="menuitem"
      aria-disabled={item.disabled}
      value={item.id}
      className={classNames("menu-item", className)}
      onClick={item.disabled || hasChildren ? undefined : clickHandler}
    >
      <div
        className={classNames("menu-item__item", {
          clickable: onClick || item.href,
          selected,
          disabled: item.disabled,
          "_has-icon": item.icon,
        })}
      >
        {render ? (
          render(item, selected)
        ) : (
          <>
            {item.icon && <Icon name={item.icon} />}

            {item.href ? (
              <Link
                external={item.external}
                href={item.href}
                size="sm"
                whiteSpace="nowrap"
              >
                {item.title}
              </Link>
            ) : (
              <Text size="sm" whiteSpace="nowrap">
                {item.title}
              </Text>
            )}
          </>
        )}
      </div>

      {hasChildren && (
        <div className="menu-item__children">
          <Menu<T> items={item.children!} onClick={onClick} />
        </div>
      )}
    </li>
  );
}
