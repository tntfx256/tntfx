import type { ReactElement } from "react";
import type { TabProps } from "@fluentui/react-components";
import { Tab } from "@fluentui/react-components";
import type { Option } from "@tntfx/core";
import { memoize } from "@tntfx/core";
import { Icon } from "@tntfx/icons";

export type MenuItemProps<T extends string = string> = Omit<TabProps, "onSelect"> & {
  item: Option<T>;
  selectedItem?: T;
};

export const MenuItem = memoize(function MenuItem<T extends string = string>(props: MenuItemProps<T>) {
  const { item, selectedItem, ...libProps } = props;

  const { id, hidden, disabled, icon, title } = item;

  return (
    <Tab
      aria-selected={selectedItem === id}
      content={title}
      disabled={disabled}
      hidden={hidden}
      icon={icon && <Icon name={icon} />}
      {...libProps}
    />
  );
}) as <T extends string = string>(props: MenuItemProps<T>) => ReactElement;
