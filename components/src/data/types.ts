import type { CSSProperties, ReactNode } from "react";
import type { Any, Nullable, Option, PaginalData, Props, PropsAndChildren, Size, StringKeys } from "@tntfx/core";

export type Column<T> = {
  // StringKeys<T> | a unique name for that column
  name: string;
  title?: string;
  parent?: string;
  align?: "start" | "center" | "end";
  vAlign?: "top" | "middle" | "bottom";
  colSpan?: number;
  widths?: Array<CSSProperties["width"] | Size>;
  renderHeaderCell?: () => ReactNode;
  renderDataCell?: (record: T, columnIndex: number) => ReactNode;
};

export type TableContext<T = Any> = {
  data: T[];
  tableId: string;
  idKey: StringKeys<T>;
  columns: Column<T>[];

  isLoading?: boolean;
  selectedRow?: Nullable<string>;
  rowOperations?: Option[];
  pagination?: PaginalData;

  onRowSelect?: (record: T) => void;
  onRowOperation?: (record: T, operation: string) => void;
  onPagination?: (page: number, limit?: number) => void;
};

type OptionalsProps = "tableId" | "rowIdRef" | "idKey";
export interface TableProps<T> extends Props, Omit<TableContext<T>, OptionalsProps> {
  idKey?: StringKeys<T>;
  title?: string;
  caption?: string;
  renderRow?: (record: T) => ReactNode;
  render?: (records: T[]) => ReactNode;
}
export type TableProviderProps<T> = TableProps<T>;

export interface TableRowProps<T> extends Props {
  record: T;
  selected?: boolean;
  render?: (record: T) => ReactNode;
}

export interface TableCellProps extends PropsAndChildren {
  align?: Column<unknown>["align"];
  vAlign?: Column<unknown>["vAlign"];
  header?: boolean;
  selected?: boolean;
  colSpan?: number;
}
