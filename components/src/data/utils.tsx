import type { ReactNode } from "react";
import type { TableColumnDefinition, TableColumnSizingOptions } from "@fluentui/react-components";
import { createTableColumn, TableCellLayout } from "@fluentui/react-components";
import type { Any } from "@tntfx/core";
import { classNames, Style } from "@tntfx/theme";
import type { Column } from "./types";

export function getHeaderTitle<T = Any>(column: Column<T>): ReactNode {
  if (column.renderHeaderCell) {
    return column.renderHeaderCell();
  }

  if ("title" in column) {
    return column.title || "";
  }

  return column.name;
}

const useCellStyle = Style.create({
  root: {
    ...Style.mixins.center(),
    height: "100%",
  },
  header: {
    ...Style.mixins.center(),
  },
});

export const adaptors = {
  columns<T>(columns: Column<T>[]): TableColumnDefinition<T>[] {
    return columns.map<TableColumnDefinition<T>>((column) => {
      const { name, compare, renderCell, align = "center" } = column;
      return {
        ...createTableColumn({ columnId: name, compare }),
        renderHeaderCell: function HeaderCell() {
          const classes = useCellStyle();
          return (
            <TableCellLayout className={classNames(classes.root, classes.header)}>{getHeaderTitle(column)}</TableCellLayout>
          );
        },
        renderCell: function DataCell(record: T) {
          const classes = useCellStyle();
          return (
            <TableCellLayout
              className={classes.root}
              style={{ justifyContent: align === "center" ? "center" : `flex-${align}` }}
            >
              {renderCell ? renderCell(record) : (record as Any)[name] ?? ""}
            </TableCellLayout>
          );
        },
      };
    });
  },
  columnsWidths<T>(columns: Column<T>[]): TableColumnSizingOptions {
    return columns.reduce(
      (acc, { name, width }) => ({
        ...acc,
        [name]: width ? { minWidth: width, padding: 4 } : { idealWidth: 128, padding: 4 },
      }),
      {}
    );
  },
};
