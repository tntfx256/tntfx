import type { ForwardedRef, FunctionComponent, PropsWithChildren, ReactNode } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { memoize } from "@tntfx/core";
import { useBlurObserver, useRefState } from "@tntfx/hooks";
import { classNames, useParseProps } from "@tntfx/theme";
import { MenuItem } from "./menu-item";
import type { MenuProps } from "./types";
import { useMenuHandler } from "./utils";
import { Portal } from "../portal";
import "./menu.scss";

/**
 *
 * no type        : static  : isOpen will be ignored
 * not horizontal : vertical
 *
 *
 * static
 *    subtype
 *    no subtype  : horizontal ? dropdown : contextmenu
 *
 * dropdown
 *    subtype
 *    no subtype  : context
 *
 * context
 *    subtype
 *    no subtype  : context
 */

function MenuWithRef<T extends string = string>(props: MenuProps<T>, ref: ForwardedRef<HTMLUListElement>) {
  const {
    isSubmenu,
    items,
    selectedItem,
    renderItem,
    role,
    slots = {},
    onClick,
    menuType,
    submenuType,
    target,
    isOpen = true,
    onClose,
    horizontal,
    switchSlotsBasedOnMenuPosition,
    ...styleProps
  } = props;
  const { className, style } = useParseProps(styleProps);

  const [menu, menuRefHandler] = useRefState<HTMLUListElement>();

  useImperativeHandle(ref, () => menu!, [menu]);

  useBlurObserver(menu, onClose, !isOpen);
  const position = useMenuHandler({ menuType, target, menu, isOpen });
  const isGlobal = menuType !== "static" || isSubmenu;

  const isOnTop = position === "above";
  let headerSlot = switchSlotsBasedOnMenuPosition ? (isOnTop ? slots.footer : slots.header) : slots.header;
  let footerSlot = switchSlotsBasedOnMenuPosition ? (isOnTop ? slots.header : slots.footer) : slots.footer;

  return isOpen ? (
    <Portal disable={!isGlobal}>
      <ul
        ref={menuRefHandler}
        role={role || "menubar"}
        style={style}
        className={classNames(`menu menu--${menuType}`, className, {
          ["--horizontal"]: horizontal,
          ["menu--submenu"]: isSubmenu,
        })}
      >
        {headerSlot && <li className="menu__headerItem">{headerSlot}</li>}

        {items?.map((item) => (
          <MenuItem<T>
            key={item.id}
            className="menu__item"
            item={item}
            menuType={menuType}
            render={renderItem}
            role={role === "combobox" ? "option" : "menuitem"}
            selectedItem={selectedItem}
            submenuType={submenuType}
            onClick={onClick}
          />
        ))}

        {footerSlot && <li className="menu__footerItem">{footerSlot}</li>}
      </ul>
    </Portal>
  ) : null;
}

export const Menu = memoize(forwardRef(MenuWithRef)) as <T extends string = string>(
  props: PropsWithChildren<MenuProps<T>> & { ref?: ForwardedRef<HTMLUListElement> }
) => ReactNode;

(Menu as FunctionComponent).displayName = "Menu";
