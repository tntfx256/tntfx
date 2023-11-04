import { classNames } from "@tntfx/theme";
import { useCallback } from "react";
import { Icon } from "../../icon";
import { Box } from "../../layout";
import { Link, Text } from "../../typography";
import { MenuItemProps } from "./menu-item";
import "./menu-item-base.scss";

export function MenuItemBase<T extends string = string>(props: MenuItemProps<T>) {
  const { onClick, item, horizontal, selected, className, render } = props;

  const clickHandler = useCallback(() => {
    onClick?.(item.id);
  }, [onClick]);

  return (
    <Box
      className={classNames("menuItemBase", className, {
        "--horizontal": horizontal,
        "--selected": selected,
        "--disabled": item.disabled,
        "--clickable": !item.disabled && onClick,
      })}
      onClick={clickHandler}
    >
      {render ? (
        render(item, selected)
      ) : (
        <>
          {item.icon && <Icon name={item.icon} size="sm" />}
          {item.href ? (
            <Link external={item.external} icon={item.icon} href={item.href} fontSize="sm">
              {item.title}
            </Link>
          ) : (
            <Text fontSize="sm">{item.title}</Text>
          )}
        </>
      )}
    </Box>
  );
}
