import { useCallback } from "react";
import { classNames, parseProps } from "@tntfx/theme";
import type { MenuItemProps } from "./menu-item";
import { Icon } from "../../icon";
import { Box } from "../../layout";
import { memoize } from "../../memoize";
import { Link, Text } from "../../typography";
import "./menu-item-base.scss";

export const MenuItemBase = memoize(function MenuItemBase<T extends string = string>(props: MenuItemProps<T>) {
  const [className, { onClick, item, selectedItem, render }] = parseProps(props);

  const clickHandler = useCallback(() => {
    onClick?.(item.id);
  }, [item.id, onClick]);

  return (
    <Box className={classNames("menuItemBase", className)} onClick={clickHandler}>
      {render ? (
        render(item, item.id === selectedItem)
      ) : (
        <>
          {item.icon && <Icon name={item.icon} size="sm" />}
          {item.href ? (
            <Link external={item.external} fontSize="sm" href={item.href} icon={item.icon}>
              {item.title}
            </Link>
          ) : (
            <Text fontSize="sm">{item.title}</Text>
          )}
        </>
      )}
    </Box>
  );
}) as <T extends string = string>(props: MenuItemProps<T>) => JSX.Element;
