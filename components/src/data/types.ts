import type { CSSProperties, ReactNode } from "react";
import type { Any, Nullable, Option, PaginalData, Size, StringKeys } from "@tntfx/core";

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
export type TableProps<T> = Omit<TableContext<T>, OptionalsProps> & {
  idKey?: StringKeys<T>;
  title?: string;
  caption?: string;
  renderRow?: (record: T) => ReactNode;
  render?: (records: T[]) => ReactNode;
};
export type TableProviderProps<T> = TableProps<T>;

export type TableRowProps<T> = {
  record: T;
  selected?: boolean;
  render?: (record: T) => ReactNode;
};

export type TableCellProps = {
  align?: Column<unknown>["align"];
  vAlign?: Column<unknown>["vAlign"];
  header?: boolean;
  selected?: boolean;
  colSpan?: number;
};
