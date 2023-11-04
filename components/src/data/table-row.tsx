import type { ClassName, StringKeys } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { MouseEvent } from "react";
import { useCallback } from "react";
import { Icon } from "../icon";
import { TableCell } from "./table-cell";
import { useTable } from "./table-provider";
import type { TableRowProps } from "./types";

export function TableRow<T>(props: ClassName<TableRowProps<T>>) {
  const { record, className, selected, index } = props;

  const { onRowSelect, selectedRow, id, columns, rowOperation, onRowOperation } = useTable<T>();

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
    <tr className={classNames("table-row", className, stripeClass, { selected: isSelected })} onClick={handleRowClick}>
      {columns.map(({ name, renderDataCell, renderHeaderCell, ...props }) => {
        return record ? (
          <TableCell key={name}>
            {renderDataCell ? renderDataCell(record, !!selected) : (record[name as StringKeys<T>] as string) || "-"}
          </TableCell>
        ) : null;
      })}

      {rowOperation && (
        <TableCell key="operations">
          {rowOperation.map((operation) => (
            <Icon key={operation.id} name={operation.icon!} onClick={() => onRowOperation?.(record!, operation.id)} />
          ))}
        </TableCell>
      )}
    </tr>
  );
}
