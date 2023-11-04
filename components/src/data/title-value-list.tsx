import type { ReactNode } from "react";
import type { ClassName } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Text } from "../typography/text";
import "./title-value-list.scss";

export type TitleValueListItem = {
  title: string;
  value: ReactNode;
};
export type TitleValueListProps = {
  items: TitleValueListItem[];
};

export function TitleValueList(props: ClassName<TitleValueListProps>) {
  const { className, items } = props;

  return (
    <div className={classNames("tvl", className)}>
      {items.map(({ title, value }) => {
        return (
          <div key={title} className="tvl-item">
            <Text className="tvl-item-title" fontSize="lg">
              {title}
            </Text>
            <div className="tvl-item-value">{value}</div>
          </div>
        );
      })}
    </div>
  );
}
