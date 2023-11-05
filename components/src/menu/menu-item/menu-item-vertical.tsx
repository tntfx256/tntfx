import { useToggle } from "@tntfx/hooks";
import type { MenuItemProps } from "./menu-item";
import { MenuItemBase } from "./menu-item-base";
import { Menu } from "../menu";
import "./menu-item-vertical.scss";

export function MenuItemVertical<T extends string = string>(props: MenuItemProps<T>) {
  const { item } = props;
  const [visible, , , toggle] = useToggle();

  return (
    <>
      <MenuItemBase {...props} onClick={toggle} />
      {visible && <Menu className="menuItemVertical__submenu" items={item.children!} />}
    </>
  );
}
