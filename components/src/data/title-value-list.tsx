import type { ReactNode } from "react";
import type { Props } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Text } from "../typography/text";
import "./title-value-list.scss";

export type TitleValueListItem = {
  title: string;
  value: ReactNode;
};
export interface TitleValueListProps extends Props {
  items: TitleValueListItem[];
}

export function TitleValueList(props: TitleValueListProps) {
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
