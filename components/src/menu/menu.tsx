import type { ForwardedRef, FunctionComponent, MouseEvent, PropsWithChildren, ReactNode } from "react";
import { cloneElement, forwardRef, useCallback, useImperativeHandle } from "react";
import { memoize } from "@tntfx/core";
import { useBlurObserver, useRefState, useToggle } from "@tntfx/hooks";
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
    slots = {},
    isSubmenu = Boolean(slots.trigger),
    items,
    selectedItem,
    renderItem,
    role,
    onClick,
    menuType = slots.trigger ? "context" : "static",
    submenuType,
    target,
    isOpen = slots.trigger ? false : true,
    onClose,
    // horizontal,
    switchSlotsBasedOnMenuPosition,
    ...styleProps
  } = props;
  const { className, style } = useParseProps(styleProps);

  const [isContextMenuOpen, , , toggleContextMenu] = useToggle();
  const [trigger, triggerRefHandler] = useRefState<HTMLElement>();
  const [menu, menuRefHandler] = useRefState<HTMLUListElement>();

  const handleMenuClose = useCallback(() => {
    toggleContextMenu();
    onClose?.();
  }, [onClose, toggleContextMenu]);

  const handleContextMenuTriggerClick = useCallback(
    (e: MouseEvent) => {
      slots.trigger?.props?.onClick?.(e);
      toggleContextMenu();
    },
    [slots.trigger?.props, toggleContextMenu]
  );
  useImperativeHandle(ref, () => menu!, [menu]);

  useBlurObserver(menu, handleMenuClose, !(isOpen || isContextMenuOpen));
  const position = useMenuHandler({ menuType, target: target || trigger, menu, isOpen: isOpen || isContextMenuOpen });
  const isGlobal = Boolean(menuType !== "static" || isSubmenu || slots.trigger);

  const isOnTop = position === "above";
  let headerSlot = switchSlotsBasedOnMenuPosition ? (isOnTop ? slots.footer : slots.header) : slots.header;
  let footerSlot = switchSlotsBasedOnMenuPosition ? (isOnTop ? slots.header : slots.footer) : slots.footer;

  return (
    <>
      {slots.trigger
        ? cloneElement(slots.trigger, { ref: triggerRefHandler, onClick: handleContextMenuTriggerClick })
        : null}

      {isOpen || isContextMenuOpen ? (
        <Portal disable={!isGlobal}>
          <ul
            className={classNames(`menu menu--${menuType}`, className, { ["menu--submenu"]: isSubmenu })}
            ref={menuRefHandler}
            role={role || "menubar"}
            style={style}
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
      ) : null}
    </>
  );
}

export const Menu = memoize(forwardRef(MenuWithRef)) as <T extends string = string>(
  props: PropsWithChildren<MenuProps<T>> & { ref?: ForwardedRef<HTMLUListElement> }
) => ReactNode;

(Menu as FunctionComponent).displayName = "Menu";
