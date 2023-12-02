import { useCallback, useEffect, useState } from "react";
import type { Nullable } from "@tntfx/core";
import { toBoundingRect } from "@tntfx/core";
import { usePositionObserver, useResizeObserver } from "@tntfx/hooks";
import type { MenuType } from "./types";

const MIN_WIDTH = 128;
const OFFSET = 8;

function adjustMenuPosition(target: HTMLElement, menu: HTMLElement, isDropdown: boolean) {
  const boundingRect = toBoundingRect();
  const targetRect = target.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();

  const spaceAbove = (isDropdown ? targetRect.top : targetRect.bottom) - OFFSET;
  const spaceBelow = boundingRect.bottom - (isDropdown ? targetRect.bottom : targetRect.top) - OFFSET;

  const spaceRight = boundingRect.right - (isDropdown ? targetRect.left : targetRect.right) - OFFSET;
  const spaceLeft = (isDropdown ? targetRect.right : targetRect.left) - OFFSET;

  let menuHeight = menuRect.height;
  let menuWidth = Math.min(Math.max(targetRect.width, menuRect.width, MIN_WIDTH), boundingRect.width - 2 * OFFSET);

  // let position = "below";
  const dimenstion = { position: "below", top: 0, left: 0, width: menuWidth, height: menuHeight };

  if (menuHeight <= spaceBelow || spaceBelow >= spaceAbove) {
    // below
    dimenstion.height = Math.min(menuHeight, spaceBelow);
    dimenstion.top = isDropdown ? targetRect.bottom : targetRect.top;
  } else {
    // above
    dimenstion.position = "above";
    dimenstion.height = Math.min(menuHeight, spaceAbove);
    // dimenstion.bottom = isDropdown ? targetRect.top : targetRect.bottom;
    dimenstion.top = (isDropdown ? targetRect.top : targetRect.bottom) - menuHeight;
  }

  if (targetRect.left + menuWidth <= boundingRect.right || spaceRight >= spaceLeft) {
    dimenstion.width = Math.min(menuWidth, spaceRight);
    dimenstion.left = isDropdown ? targetRect.left : targetRect.right;
  } else {
    dimenstion.width = Math.min(menuWidth, spaceLeft);
    // dimenstion.right = isDropdown ? targetRect.left : targetRect.right;
    dimenstion.left = isDropdown ? targetRect.left : targetRect.right;
  }

  return dimenstion;
}

type MenuPositionConfig = {
  menu: Nullable<HTMLElement>;
  menuType?: MenuType;
  target?: Nullable<HTMLElement>;
  isOpen?: boolean;
};
export function useMenuHandler(config: MenuPositionConfig) {
  const [position, setPosition] = useState("below");
  const { menuType = "static", target, menu, isOpen = false } = config;

  const isDropdown = menuType === "dropdown";
  const needAdjustment = isOpen && target && menu && menuType !== "static";

  const onPositionChange = useCallback(() => {
    if (!needAdjustment) return;

    menu.style.width = "auto";
    menu.style.minWidth = "auto";
    menu.style.height = "auto";
    menu.style.top = "auto";
    menu.style.left = "auto";

    const { top, left, width, height, position } = adjustMenuPosition(target, menu, isDropdown);

    menu.style.width = `${width}px`;
    menu.style.minWidth = `${width}px`;
    menu.style.height = `${height}px`;
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;

    setPosition(position);
  }, [needAdjustment, isDropdown, menu, target]);

  const [observer] = useState(() => new MutationObserver(onPositionChange));
  usePositionObserver(onPositionChange, target, !needAdjustment);
  // useScrollObserver(onPositionChange, document.body, !needAdjustment);
  useResizeObserver(onPositionChange, document.body, !needAdjustment);

  useEffect(() => {
    if (needAdjustment) {
      observer.observe(menu, { childList: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [menu, needAdjustment, observer]);

  return position;
}

export function getSubmenuType(menuType: MenuType, submenuType?: MenuType, isHorizontal = false): MenuType {
  switch (menuType) {
    case "static":
      return isHorizontal ? "dropdown" : submenuType || "dropdown";
    case "context":
      return "context";
    case "dropdown":
      return "context";
  }
}
