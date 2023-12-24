import type { MouseEvent } from "react";
import { useCallback, useState } from "react";
import type { TableProps } from "@fluentui/react-components";
import { Table, TableBody } from "@fluentui/react-components";
import type { Keys, PaginalData, PaginationHandler } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./data-table.style";
import type { Column } from "./data-table-column";
import { DataTableHeader } from "./data-table-header";
import { TablePagination } from "./data-table-pagination";
import type { DataTableRowProps } from "./data-table-row";
import { DataTableRow } from "./data-table-row";
import { Box } from "../../layout";
import { Title } from "../../text";

type SelectionMode = "single" | "multi";

export type DataTableProps<T extends object> = Omit<TableProps, "columns"> & {
  idKey: Keys<T>;
  rows: T[];
  columns: Column<T>[];
  title?: string;
  isLoading?: boolean;
  pagination?: PaginalData;
  selectionMode?: SelectionMode;
  onPagination?: PaginationHandler;
  renderHeader?: (columns: Column<T>[]) => React.ReactNode;
  renderRow?: (props: DataTableRowProps<T>) => React.ReactNode;
  onRowSelect?: (selected: string[]) => void;
};

export function DataTable<T extends object>(props: DataTableProps<T>) {
  const {
    idKey,
    className,
    title,
    rows,
    columns,
    pagination,
    onPagination,
    renderHeader,
    renderRow,
    onRowSelect,
    selectionMode = "single",
    ...libProps
  } = props;

  const classes = useStyle();
  const [selected, setSelected] = useState<string[]>([]);

  const handleRowSelect = useCallback(
    (e: MouseEvent<HTMLTableRowElement>, value?: string) => {
      if (onRowSelect && value) {
        let selection = selected;
        if (selection.includes(value)) {
          selection = selection.filter((item) => item !== value);
        } else {
          selection = selectionMode === "multi" ? [...selection, value] : [value];
        }

        setSelected(selection);
        onRowSelect(selection);
      }
    },
    [onRowSelect, selected, selectionMode]
  );

  return (
    <Box className={classNames(classes.root, className)}>
      {title && (
        <Box horizontal className={classes.title}>
          <Title>{title}</Title>
        </Box>
      )}
      <Box className={classes.container}>
        <Table aria-label={title} className={classes.table} {...libProps}>
          {renderHeader ? renderHeader(columns) : <DataTableHeader columns={columns} />}
          <TableBody>
            {rows.map((row) => {
              const key = row[idKey] as string;
              const isSelected = selected.includes(key);
              const props: DataTableRowProps<T> = {
                id: key,
                row,
                columns,
                selected: isSelected,
                onClick: handleRowSelect,
              };
              return renderRow ? renderRow(props) : <DataTableRow key={key} {...props} />;
            })}
          </TableBody>
        </Table>
      </Box>
      {pagination && <TablePagination pagination={pagination} onPagination={onPagination} />}
    </Box>
  );
}
