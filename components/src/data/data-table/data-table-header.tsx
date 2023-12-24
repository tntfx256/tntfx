import { useMemo } from "react";
import { TableHeader, TableHeaderCell, type TableHeaderProps, TableRow } from "@fluentui/react-components";
import { memoize } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { DataTableCell } from "./data-table-cell";
import type { Column } from "./data-table-column";
import { useStyle } from "./data-table-header.style";
import { getParentMap } from "./utils";

export type DataTableHeaderProps<T extends object> = TableHeaderProps & {
  columns: Column<T>[];
};

export function DataTableHeader<T extends object>(props: DataTableHeaderProps<T>) {
  const { columns, className } = props;

  const classes = useStyle();
  // const cellRenderer = useMemo(() => getCellRenderer(true), []);

  const mergedParents = useMemo(() => getParentMap(columns), [columns]);
  let parentIndex = 0;
  let parentCounter = mergedParents ? mergedParents[parentIndex].count : -1;

  return (
    <TableHeader className={classNames(classes.root, className)}>
      <HeaderTableParent mergedParents={mergedParents} />
      <TableRow className={classNames("tableRow")}>
        {columns.map((column, i) => {
          const isDivider = i === parentCounter;

          if (isDivider) {
            ++parentIndex;
            if (mergedParents && mergedParents[parentIndex]) {
              parentCounter += mergedParents[parentIndex].count;
            } else {
              parentCounter = -1;
            }
          }

          return column.renderHeaderCell ? (
            column.renderHeaderCell(column)
          ) : (
            <DataTableCell key={column.columnId} align={column.align} className={classes.cell}>
              {column.title || ""}
            </DataTableCell>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}

type HeaderTableParentProps = { mergedParents: ReturnType<typeof getParentMap> };
const HeaderTableParent = memoize(function HeaderTableParent({ mergedParents }: HeaderTableParentProps) {
  if (!mergedParents) return null;

  return (
    <TableRow>
      {mergedParents.map(({ title }) => {
        return <TableHeaderCell key={title}>{title}</TableHeaderCell>;
      })}
    </TableRow>
  );
});
