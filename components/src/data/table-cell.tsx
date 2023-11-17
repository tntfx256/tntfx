import type { ClassAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { TableCellProps } from "./types";
import { memoize } from "../memoize";
import "./table-cell.scss";

export const TableCell = memoize(function TableCell(props: ClassAndChildren<TableCellProps>) {
  const { header, selected, children, className, align = "start", vAlign = "middle", colSpan } = props;

  const attributes = {
    className: classNames("tableCell", className, { "tableCell--header": header, "--selected": selected }),
    style: { verticalAlign: vAlign, textAlign: align },
    colSpan,
  };

  return header ? <th {...attributes}>{children}</th> : <td {...attributes}>{children}</td>;
});
