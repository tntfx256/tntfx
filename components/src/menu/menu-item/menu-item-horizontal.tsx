import type { MenuItemProps } from "./menu-item";
import { MenuItemBase } from "./menu-item-base";
import { memoize } from "../../memoize";
import { ContextMenu } from "../context-menu";
import "./menu-item-horizontal.scss";

export const MenuItemHorizontal = memoize(function MenuItemHorizontal<T extends string = string>(props: MenuItemProps<T>) {
  const { item } = props;

  return item.children ? (
    <ContextMenu items={item.children}>
      <MenuItemBase horizontal {...props} />
    </ContextMenu>
  ) : (
    <MenuItemBase horizontal {...props} />
  );
}) as <T extends string = string>(props: MenuItemProps<T>) => JSX.Element;
