import type { MouseEvent, PropsWithChildren } from "react";
import { useCallback } from "react";
import type { TableRowProps } from "@fluentui/react-components";
import { TableRow } from "@fluentui/react-components";
import type { DataTableCellProps } from "./data-table-cell";
import { DataTableCell } from "./data-table-cell";
import type { Column } from "./data-table-column";

type CommonProps = Omit<TableRowProps, "onClick" | "children"> & {
  id: string;
  selected?: boolean;
  onClick?: (e: MouseEvent<HTMLTableRowElement>, id?: string) => void;
};
type WithChildren = PropsWithChildren<CommonProps>;
type WithoutChildren<T extends object> = CommonProps & {
  row: T;
  columns: Column<T>[];
  renderCell?(props: DataTableCellProps<T>): React.ReactNode;
};

export type DataTableRowProps<T extends object> = WithChildren | WithoutChildren<T>;

export function DataTableRow<T extends object>(props: DataTableRowProps<T>) {
  const { id, onClick, selected, ...commonProps } = props;

  const handleSelect = useCallback(
    (e: MouseEvent<HTMLTableRowElement>) => {
      onClick?.(e, id);
    },
    [onClick, id]
  );

  const baseProps: TableRowProps = {
    appearance: selected ? "neutral" : "none",
    "aria-selected": selected,
    onClick: handleSelect,
  };

  if (isWithChildren(props)) {
    return <TableRow {...baseProps} {...commonProps} />;
  }

  const { row, columns, renderCell, ...libProps } = commonProps as WithoutChildren<T>;
  return (
    <TableRow {...baseProps} {...libProps}>
      {columns.map((column) => {
        return renderCell ? renderCell({ row, column }) : <DataTableCell key={column.columnId} column={column} row={row} />;
      })}
    </TableRow>
  );
}

function isWithChildren<T extends object>(props: DataTableRowProps<T>): props is WithChildren {
  return "children" in props;
}
