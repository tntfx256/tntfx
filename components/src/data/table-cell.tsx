import type { ReactNode } from "react";
import type { Any, ClassAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { Column, TableCellProps } from "./types";
import "./table-cell.scss";

export function TableCell(props: ClassAndChildren<TableCellProps>) {
  const { header, selected, children, className, align = "start", vAlign = "middle", colSpan } = props;

  const attributes = {
    className: classNames("tableCell", className, { "tableCell--header": header, "--selected": selected }),
    style: { verticalAlign: vAlign, textAlign: align },
    colSpan,
  };

  return header ? <th {...attributes}>{children}</th> : <td {...attributes}>{children}</td>;
}

TableCell.getHeaderTitle = function getHeaderTitle<T = Any>(column: Column<T>): ReactNode {
  if (column.renderHeaderCell) {
    return column.renderHeaderCell();
  }

  if ("title" in column) {
    return column.title || "";
  }

  return column.name;
};
