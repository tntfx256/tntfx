import type { ReactNode } from "react";
import type { Any, Nullable, Option, PaginalData, StringKeys } from "@tntfx/core";

export type Column<T> = {
  // StringKeys<T> | a unique name for that column
  name: string;
  title?: string;
  parent?: string;
  align?: "start" | "center" | "end";
  vAlign?: "top" | "middle" | "bottom";
  colSpan?: number;
  renderHeaderCell?: () => ReactNode;
  renderDataCell?: (record: T, isSelected: boolean) => ReactNode;
};

export type TableContext<T = Any> = {
  data: T[];
  tableId: string;
  id: StringKeys<T>;
  columns: Column<T>[];

  isLoading?: boolean;
  selectedRow?: Nullable<string>;
  rowOperation?: Option[];
  pagination?: PaginalData;

  onRowSelect?: (record?: T) => void;
  onRowOperation?: (record: Nullable<T>, operation: string) => void;
  onPagination?: (page: number, limit?: number) => void;
};

export type TableProps<T> = Omit<TableContext<T>, "tableId"> & {
  title?: string;
  caption?: string;
  columnWidths?: Nullable<number[]>;
};

export type TableBodyProps<T> = {
  render?: (record: T, rowIndex: number) => ReactNode;
};

export type TableRowProps<T> = {
  record?: T;
  selected?: boolean;
  render?: (record?: T) => ReactNode;
  index?: number;
};

export type TableCellProps = {
  align?: Column<unknown>["align"];
  vAlign?: Column<unknown>["vAlign"];
  header?: boolean;
  selected?: boolean;
  colSpan?: number;
};
