import type { MouseEvent } from "react";
import { useCallback, useLayoutEffect, useRef } from "react";
import type { ClassAndChildren, Nullable, Option } from "@tntfx/core";
import { useToggle } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { Menu } from "./menu";
import { Backdrop } from "../backdrop";
import { memoize } from "../memoize";
import { Portal } from "../portal";
import "./context-menu.scss";

const OFFSET = 2;
interface MenuAlignment {
  horizontal: "left" | "center" | "right";
  vertical: "top" | "middle" | "bottom";
}

type ContextMenuProps<T extends string = string> = {
  items?: Option<T>[];
  onClose?: () => void;
  onItemSelect?: (id: T) => void;
};

export const ContextMenu = memoize(function ContextMenu<T extends string = string>(
  props: ClassAndChildren<ContextMenuProps<T>>
) {
  const { children, className, items, onItemSelect, onClose, ...libProps } = props;

  const alignment = useRef<MenuAlignment>({
    horizontal: "left",
    vertical: "bottom",
  });
  const [visible, showMenu, hideMenu] = useToggle();

  const context = useRef<Nullable<HTMLDivElement>>(null);
  const list = useRef<Nullable<HTMLUListElement>>(null);

  const handleMenuItemClick = useCallback(
    (id: T) => {
      onItemSelect?.(id);
      hideMenu();
    },
    [hideMenu, onItemSelect]
  );

  const handleMenuOpen = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      showMenu();
    },
    [showMenu]
  );

  const handleMenuClose = useCallback(() => {
    hideMenu();
    onClose?.();
  }, [hideMenu, onClose]);

  useLayoutEffect(() => {
    if (visible && context.current && list.current) {
      const ddMenu = list.current.getBoundingClientRect();
      const container = context.current.getBoundingClientRect();

      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;

      const maxMenuWidth = Math.min(ddMenu.width, maxWidth - 10);
      const maxMenuHeight = Math.min(ddMenu.height, maxHeight - 10);

      // checking the vertical positioning
      if (container.bottom + ddMenu.height < maxHeight) {
        alignment.current.vertical = "bottom";
      } else if (container.top - ddMenu.height > 0) {
        alignment.current.vertical = "top";
      } else {
        alignment.current.vertical = "middle";
      }

      // horizontal placement
      if (ddMenu.width <= maxWidth - container.left) {
        alignment.current.horizontal = "left";
      } else if (ddMenu.width < container.right) {
        alignment.current.horizontal = "right";
      } else {
        alignment.current.horizontal = "center";
      }

      // update position
      const { horizontal, vertical } = alignment.current;
      if (horizontal === "left") {
        list.current.style.left = `${container.left}px`;
      } else if (horizontal === "right") {
        list.current.style.left = `${container.right}px`;
      } else {
        list.current.style.left = `${(maxWidth - maxMenuWidth) / 2}px`;
      }

      if (vertical === "bottom") {
        list.current.style.top = `${container.bottom - OFFSET}px`;
      } else if (vertical === "top") {
        list.current.style.top = `${container.top - maxMenuHeight + OFFSET}px`;
      } else {
        list.current.style.top = `${(maxHeight - maxMenuHeight) / 2}px`;
      }

      list.current.style.maxWidth = `${maxMenuWidth}px`;
      list.current.style.maxHeight = `${maxMenuHeight}px`;
    }
  }, [visible]);

  return (
    <div
      className={classNames("context-menu", className, { visible })}
      ref={context}
      tabIndex={-1}
      {...libProps}
      onClick={handleMenuOpen}
    >
      {children}
      {visible && items && (
        <Portal id="context-menu-portal">
          <Backdrop
            persistent
            background="transparent"
            className="context-menu-backdrop"
            isOpen={visible}
            onClick={handleMenuClose}
          >
            <Menu
              className={classNames(`--align-${alignment.current.vertical}`, `--align-${alignment.current.horizontal}`)}
              items={items}
              ref={list}
              onClick={handleMenuItemClick}
            />
          </Backdrop>
        </Portal>
      )}
    </div>
  );
}) as <T extends string = string>(props: ClassAndChildren<ContextMenuProps<T>>) => JSX.Element;
