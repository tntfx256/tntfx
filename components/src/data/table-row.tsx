import type { MouseEvent } from "react";
import { useCallback } from "react";
import type { StringKeys } from "@tntfx/core";
import { Icon } from "@tntfx/icons";
import { classNames } from "@tntfx/theme";
import { TableCell } from "./table-cell";
import { useTable } from "./table-provider";
import type { TableRowProps } from "./types";

export function TableRow<T>(props: TableRowProps<T>) {
  const { record, className, selected, render } = props;

  const { onRowSelect, selectedRow, idKey, columns, rowOperations, onRowOperation } = useTable<T>();

  const handleRowClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRowSelect?.(record);
    },
    [onRowSelect, record]
  );

  const isSelected = selected || (record && selectedRow === record?.[idKey]);

  return (
    <tr
      role="row"
      className={classNames("tableRow", className, {
        "--hover": onRowSelect,
        "--selected": isSelected,
      })}
      onClick={handleRowClick}
    >
      {render ? (
        render(record)
      ) : (
        <>
          {columns.map((column, columnIndex) => {
            const { name, renderDataCell, ...cellProps } = column;
            return (
              <TableCell key={name} className="tableRow__cell" {...cellProps}>
                {renderDataCell ? renderDataCell(record, columnIndex) : (record[name as StringKeys<T>] as string) || "-"}
              </TableCell>
            );
          })}
          {rowOperations && (
            <TableCell key="operations" className="tableRow__cell tableRow__cell--operations">
              {rowOperations.map((operation) => (
                <Icon key={operation.id} name={operation.icon!} onClick={() => onRowOperation?.(record!, operation.id)} />
              ))}
            </TableCell>
          )}
        </>
      )}
    </tr>
  );
}
