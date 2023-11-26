import { memoize } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { TableCellProps } from "./types";
import "./table-cell.scss";

export const TableCell = memoize(function TableCell(props: TableCellProps) {
  const { header, selected, children, className, align = "start", vAlign = "middle", colSpan } = props;

  const attributes = {
    className: classNames("tableCell", className, { "tableCell--header": header, "--selected": selected }),
    style: { verticalAlign: vAlign, textAlign: align },
    colSpan,
  };

  return header ? (
    <th role="cell" {...attributes}>
      {children}
    </th>
  ) : (
    <td role="cell" {...attributes}>
      {children}
    </td>
  );
});
