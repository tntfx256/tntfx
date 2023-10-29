import type { MouseEvent } from "react";
import { useCallback } from "react";
import type { ClassAndChildren, StringKeys } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { TableCell } from "./table-cell";
import { useTable } from "./table-provider";
import type { TableRowProps } from "./types";
import { Icon } from "../icon";

export function TableRow<T>(props: ClassAndChildren<TableRowProps<T>>) {
  const { record, children, className, selected, index } = props;

  const {
    onRowSelect,
    selectedRow,
    id,
    columns,
    rowOperation,
    onRowOperation,
  } = useTable<T>();

  const handleRowClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRowSelect?.(record);
    },
    [onRowSelect, record]
  );

  const isSelected = selected || (record && selectedRow === record?.[id]);
  let stripeClass = "";
  if (index != undefined) {
    stripeClass = index % 2 ? "_even-row" : "_odd-row";
  }

  return (
    <tr
      className={classNames("table-row", className, stripeClass, {
        selected: isSelected,
      })}
      onClick={handleRowClick}
    >
      {children}

      {!children && record && columns
        ? columns.map(
            ({ name, renderDataCell, renderHeaderCell, ...props }) => {
              return (
                <TableCell key={name} {...props}>
                  {renderDataCell
                    ? renderDataCell(record, !!selected)
                    : (record[name as StringKeys<T>] as string) || ""}
                </TableCell>
              );
            }
          )
        : null}

      {rowOperation && (
        <TableCell>
          {rowOperation.map((operation) => (
            <Icon
              name={operation.icon!}
              onClick={() => onRowOperation?.(record!, operation.id)}
            />
          ))}
        </TableCell>
      )}
    </tr>
  );
}
