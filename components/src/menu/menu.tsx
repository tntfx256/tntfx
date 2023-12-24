import type { ForwardedRef, FunctionComponent, PropsWithChildren, PropsWithRef, ReactElement, ReactNode } from "react";
import { forwardRef } from "react";
import type { MenuProps as LibMenuProps } from "@fluentui/react-components";
import { Menu as LibMenu, MenuPopover, MenuTrigger } from "@fluentui/react-components";
import type { Option } from "@tntfx/core";
import { memoize } from "@tntfx/core";
import { List } from "./list";

export interface MenuProps<T extends string = string> extends Partial<LibMenuProps> {
  horizontal?: boolean;
  selectedItem?: T;
  onSelect?: (id: T) => void;
  items?: Option<T>[];

  slots?: {
    trigger?: ReactElement<PropsWithRef<HTMLElement>>;
    header?: ReactElement;
    footer?: ReactElement;
  };
}

function MenuWithRef<T extends string = string>(props: MenuProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { slots = {}, items, selectedItem, onSelect, ...libProps } = props;

  return (
    <LibMenu {...libProps}>
      <MenuTrigger disableButtonEnhancement>{slots.trigger}</MenuTrigger>

      <MenuPopover ref={ref}>
        {slots.header}

        <List vertical items={items} selectedItem={selectedItem} onSelect={onSelect} />

        {slots.footer}
      </MenuPopover>
    </LibMenu>
  );
}

export const Menu = memoize(forwardRef(MenuWithRef)) as <T extends string = string>(
  props: PropsWithChildren<MenuProps<T>> & { ref?: ForwardedRef<HTMLUListElement> }
) => ReactNode;

(Menu as FunctionComponent).displayName = "Menu";
