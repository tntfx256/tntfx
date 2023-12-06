import { type ReactElement, useCallback } from "react";
import type { SelectTabData, SelectTabEvent, TabListProps } from "@fluentui/react-components";
import { TabList } from "@fluentui/react-components";
import type { Option } from "@tntfx/core";
import { memoize } from "@tntfx/core";
import { MenuItem } from "./menu-item";

export interface ListProps<T extends string = string> extends Omit<TabListProps, "onSelect" | "selectedValue"> {
  items?: Option<T>[];
  selectedItem?: T;
  onSelect?: (id: T) => void;
}

export const List = memoize(function List<T extends string = string>(props: ListProps<T>) {
  const { items = [], onSelect, selectedItem, ...libProps } = props;

  const handleSelect = useCallback((_event: SelectTabEvent, data: SelectTabData) => {
    onSelect?.(data.value as T);
  }, []);

  return (
    <TabList
      appearance="subtle"
      className="list-items"
      selectedValue={selectedItem}
      onTabSelect={handleSelect}
      {...libProps}
    >
      {items.map((item) => (
        <MenuItem key={item.id} item={item} selectedItem={selectedItem} value={item.id} />
      ))}
    </TabList>
  );
}) as <T extends string = string>(props: ListProps<T>) => ReactElement;
