import type { CSSProperties } from "react";
import type { TableColumnDefinition } from "@fluentui/react-components";

type LibProps<T extends object> = Omit<TableColumnDefinition<T>, "renderCell" | "renderHeaderCell">;

export type Column<T extends object = object> = Partial<LibProps<T>> & {
  title?: string;
  parent?: string;
  align?: "left" | "center" | "right";
  colSpan?: number;
  width?: CSSProperties["width"];
  renderCell?: (row: T) => React.ReactNode;
  renderHeaderCell?: (column: Column<T>) => React.ReactNode;
};
