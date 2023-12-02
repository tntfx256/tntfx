import type { MouseEvent, ReactElement } from "react";
import { useCallback } from "react";
import { memoize } from "@tntfx/core";
import { useRefState, useToggle } from "@tntfx/hooks";
import { Icon } from "@tntfx/icons";
import { classNames, useParseProps } from "@tntfx/theme";
import { Menu } from "./menu";
import type { MenuItemProps } from "./types";
import { getSubmenuType } from "./utils";
import { Box } from "../layout";
import { Link, Text } from "../typography";
import "./menu-item.scss";

export const MenuItem = memoize(function MenuItem<T extends string = string>(props: MenuItemProps<T>) {
  const {
    item,
    role = "menuitem",
    selectedItem,
    menuType = "static",
    submenuType,
    horizontal,
    onClick,
    render,
    ...styleProps
  } = props;

  const { id, hidden, disabled, children, icon, href, title, external } = item;
  const isSelected = selectedItem === id || children?.some((child) => child.id === selectedItem);
  const { className, style } = useParseProps(styleProps);

  const [menuItem, refHandler] = useRefState<HTMLLIElement>();
  const [isSubmenuOpen, , setSubmenuClose, toggleSubmenu] = useToggle();

  const hasSubmenu = Boolean(children && children.length > 0);

  const clickHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (hasSubmenu) {
        toggleSubmenu();
      } else {
        onClick?.(id, e);
      }
    },
    [hasSubmenu, id, onClick, toggleSubmenu]
  );

  const finalSubmenuType = getSubmenuType(menuType, submenuType, horizontal);
  const isInline = finalSubmenuType === "static";

  return hidden ? null : (
    <li
      aria-disabled={disabled}
      ref={refHandler}
      role={role}
      style={style}
      value={id}
      className={classNames(`menuItem menuItem--${finalSubmenuType}`, className, {
        [`--selected`]: isSelected,
        [`--hover`]: onClick,
        [`--disabled`]: disabled,
        [`menuItem--isSubmenuOpen`]: isSubmenuOpen,
      })}
      onClick={clickHandler}
    >
      {render ? (
        render(item, selectedItem)
      ) : (
        <Box horizontal className="menuItem__body">
          {typeof icon === "string" ? <Icon className="menuItem__icon" name={icon} /> : icon}

          {href ? (
            <Link className="menuItem__title menuItemBody__title--link" external={external} href={href}>
              {title}
            </Link>
          ) : (
            <Text className="menuItem__title">{title}</Text>
          )}

          {hasSubmenu && <Icon className="menuItem__submenuIndicator" name={isInline ? "down" : "right"} />}
        </Box>
      )}

      {hasSubmenu && (
        <Menu
          isSubmenu
          className="menuItem__submenu"
          isOpen={isSubmenuOpen}
          items={item.children}
          menuType={finalSubmenuType}
          target={menuItem}
          onClick={onClick}
          onClose={setSubmenuClose}
        />
      )}
    </li>
  );
}) as <T extends string = string>(props: MenuItemProps<T>) => ReactElement;
