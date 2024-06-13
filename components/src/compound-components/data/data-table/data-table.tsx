import { useMemo } from "react";
import type {
  TableCellProps,
  TableColumnDefinition,
  TableColumnSizingOptions,
  TableFeaturesState,
  TableHeaderCellProps,
  TableProps,
  TableRowProps,
} from "@fluentui/react-components";
import {
  createTableColumn,
  ProgressBar,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useTableColumnSizing_unstable,
  useTableFeatures,
} from "@fluentui/react-components";
import type { Any, Keys, PaginalData, PaginationHandler } from "@tntfx/core";
import { createStore, type SetState } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./data-table.style";
import { TablePagination } from "./data-table-pagination";
import { Box } from "../../../base-components";
import { Text } from "../../../base-components/text";

export type { TableBodyProps, TableHeaderProps } from "@fluentui/react-components";
export { TableBody, TableCellLayout, TableHeader } from "@fluentui/react-components";

// COLUMN
export type Column<T extends object = object> = Partial<TableColumnDefinition<T>> & {
  columnId: string | Keys<T>;
  title?: string;
  parent?: string;
  align?: "left" | "center" | "right";
  colSpan?: number;
  minWidth?: number;
  width?: number;
  maxWidth?: number;
  renderHeaderCell?: (column: Column<T>) => React.ReactNode;
};

// PROVIDER
type DataTableState<T extends object = object> = {
  // columns: Column<T>[];
  columnSizing: TableFeaturesState<T>["columnSizing_unstable"];
};
const { StoreProvider, useStore } = createStore<DataTableState>({ name: "DataTableProvider" });
export function useDataTable<T extends object = object>() {
  return useStore() as [DataTableState<T>, SetState<DataTableState<T>>];
}
// TABLE
export type DataTableProps<T extends object> = TableProps & {
  loading?: boolean;
  rows?: T[];
  columns?: Column<T>[];
  pagination?: PaginalData;
  onPagination?: PaginationHandler;
};
export function DataTable<T extends object = object>(props: DataTableProps<T>) {
  const { pagination, onPagination, children, title, className, columns = [], rows = [], loading, ...libProps } = props;
  const classes = useStyle();

  const libColumns = useMemo(() => utils.toColumns<T>(columns), [columns]);
  const columnSizingOptions = useMemo(() => utils.toColumnSizing<T>(columns), [columns]);

  const { columnSizing_unstable } = useTableFeatures({ columns: libColumns, items: rows }, [
    useTableColumnSizing_unstable({ columnSizingOptions }),
  ]);

  return (
    <StoreProvider columnSizing={columnSizing_unstable}>
      <Box className={classNames(classes.root, className)}>
        {title && (
          <Box horizontal className={classes.title}>
            <Text as="h1" size="xl">
              {title}
            </Text>
          </Box>
        )}

        <Box className={classes.container}>
          <Table className={classes.table} {...columnSizing_unstable.getTableProps()} {...libProps}>
            <TableHeader>
              <DataTableRow header columns={columns} />
            </TableHeader>
            <TableBody>{children}</TableBody>
          </Table>
          {loading && <ProgressBar />}
        </Box>

        {pagination && <TablePagination pagination={pagination} onPagination={onPagination} />}
      </Box>
    </StoreProvider>
  );
}

// ROW
export type DataTableRowProps<T extends object = object> = TableRowProps & {
  header?: boolean;
  columns?: Column<T>[];
  row?: T;
  selected?: boolean;
};
export function DataTableRow<T extends object = object>(props: DataTableRowProps<T>) {
  const { columns = [], row = {}, children, header, selected, ...libProps } = props;

  return (
    <TableRow appearance={selected ? "brand" : "none"} aria-selected={selected} {...libProps}>
      {children ??
        columns.map((column) =>
          header ? (
            <DataTableHeaderCell<T> key={column.columnId} column={column} />
          ) : (
            <DataTableCell<T> key={column.columnId} column={column} row={row as T} />
          )
        )}
    </TableRow>
  );
}

// HEADER CELL
export type DataTableHeaderCellProps<T extends object = object> = TableHeaderCellProps & {
  column?: Column<T>;
};
export function DataTableHeaderCell<T extends object = object>(props: DataTableHeaderCellProps<T>) {
  const { column = {} as Column<T>, children, className, ...libProps } = props;

  const [{ columnSizing }] = useDataTable<T>();

  const classes = useStyle();
  if (column.colSpan) {
    (libProps as Any).colSpan = column.colSpan;
  }

  return (
    <TableHeaderCell
      className={classNames(classes.cell, classes.headerCell, `align-${column.align}`, className)}
      {...columnSizing.getTableHeaderCellProps(column.columnId)}
      {...libProps}
    >
      {children ?? (column.renderHeaderCell ? column.renderHeaderCell(column) : column.title)}
    </TableHeaderCell>
  );
}

// DATA CELL
export type DataTableCellProps<T extends object = object> = TableCellProps & {
  column?: Column<T>;
  row?: T;
};
export function DataTableCell<T extends object = object>(props: DataTableCellProps<T>) {
  const { column = {} as Column<T>, row = {} as T, children, className, ...libProps } = props;

  const [{ columnSizing }] = useDataTable<T>();
  const classes = useStyle();
  if (column.colSpan) {
    (libProps as Any).colSpan = column.colSpan;
  }

  return (
    <TableCell
      className={classNames(classes.cell, `align-${column.align}`, className)}
      {...columnSizing.getTableCellProps(column.columnId)}
      {...libProps}
    >
      {children ??
        (column.renderCell ? column.renderCell(row) : column.columnId ? (row[column.columnId as Keys<T>] as string) : "")}
    </TableCell>
  );
}

// UTILS
const utils = {
  toColumns<T extends object = object>(columns: Column<T>[]): TableColumnDefinition<T>[] {
    return columns.map((column) => {
      const { columnId, compare, renderCell, renderHeaderCell } = column;

      return createTableColumn<T>({
        columnId,
        compare: compare || (() => 0),
        renderCell(row: T) {
          return renderCell ? renderCell(row) : <DataTableCell<T> column={column} row={row} />;
        },
        renderHeaderCell(data) {
          return renderHeaderCell ? renderHeaderCell(data) : <DataTableHeaderCell<T> column={column} />;
        },
      });
    });
  },
  toColumnSizing<T extends object = object>(columns: Column<T>[]): TableColumnSizingOptions {
    return Object.fromEntries(
      columns.map(({ columnId, width = 128, minWidth = width, maxWidth = width }) => [
        columnId,
        { minWidth, maxWidth, idealWidth: width },
      ])
    );
  },
};
