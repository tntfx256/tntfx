import { useToggle } from "@tntfx/hooks";
import { Menu } from "../menu";
import { MenuItemProps } from "./menu-item";
import { MenuItemBase } from "./menu-item-base";
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
