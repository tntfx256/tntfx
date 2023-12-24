import type { PropsWithChildren } from "react";
import type { TableCellProps } from "@fluentui/react-components";
import { TableCell } from "@fluentui/react-components";
import type { Any, Keys } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./data-table-cell.style";
import type { Column } from "./data-table-column";

type CommonProps = Omit<TableCellProps, "children"> & { colSpan?: number; align?: Column["align"] };
type WithChildren = PropsWithChildren<CommonProps>;
type WithoutChildren<T extends object> = CommonProps & { row: T; column: Column<T> };

export type DataTableCellProps<T extends object> = WithChildren | WithoutChildren<T>;

export function DataTableCell<T extends object>(props: DataTableCellProps<T>) {
  const { className, align = "left", ...commonProps } = props;
  const classes = useStyle();

  let baseClassName = classNames(classes.root, classes[align], className);

  if (isWithChildren(props)) {
    return <TableCell className={baseClassName} {...commonProps} />;
  }

  const { column, row, ...libProps } = commonProps as WithoutChildren<T>;
  return (
    <TableCell
      className={classNames(baseClassName, column.align && classes[column.align])}
      {...libProps}
      width={column.width}
    >
      {column.renderCell ? column.renderCell(props as Any) : (row[column.columnId as Keys<T>] as string) || column.title}
    </TableCell>
  );
}

function isWithChildren<T extends object>(props: DataTableCellProps<T>): props is WithChildren {
  return "children" in props;
}
