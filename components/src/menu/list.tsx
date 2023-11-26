import type { ReactElement, ReactNode } from "react";
import { memoize, type Option, type PropsAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { MenuItem } from "./menu-item";
import { Text } from "../typography/text";

export interface ListProps<T> extends PropsAndChildren {
  title?: string;
  items?: T[];
  render?: (item: T, index: number) => ReactNode;
}

export const List = memoize(function List<T = Option>(props: ListProps<T>) {
  const { title, className, render, items, children } = props;

  return (
    <section className={classNames("list", className)}>
      {title && (
        <header className="list-header">
          <Text className="list-header-title" fontSize="xl">
            {title}
          </Text>
        </header>
      )}
      <main className="list-body">
        <ul className="list-items">
          {items && render && items.map((item, index) => render(item, index))}
          {items && !render && (items as Option[]).map((item) => <MenuItem key={item.id} item={item} />)}
          {children}
        </ul>
      </main>
    </section>
  );
}) as <T = Option>(props: ListProps<T>) => ReactElement;
