import { ContextMenu } from "../context-menu";
import { MenuItemProps } from "./menu-item";
import { MenuItemBase } from "./menu-item-base";
import "./menu-item-horizontal.scss";

export function MenuItemHorizontal<T extends string = string>(props: MenuItemProps<T>) {
  const { item } = props;

  return item.children ? (
    <ContextMenu items={item.children}>
      <MenuItemBase horizontal {...props} />
    </ContextMenu>
  ) : (
    <MenuItemBase horizontal {...props} />
  );
}
