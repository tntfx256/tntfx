import { memoize, type Props } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { TableCell } from "./table-cell";
import { useTable } from "./table-provider";
import type { Column } from "./types";
import { getHeaderTitle } from "./utils";
import "./table-header.scss";

export const TableHeader = memoize(function TableHeader<T>(props: Props) {
  const { className } = props;

  const { columns } = useTable<T>();

  const mergedParents = getParentMap(columns);
  let parentIndex = 0;
  let parentCounter = mergedParents ? mergedParents[parentIndex].count : -1;

  return (
    <thead className={classNames("tableHeader", className)}>
      <HeaderTableParent mergedParents={mergedParents} />
      <tr className={classNames("tableRow", { "tableHeader--nested": mergedParents })}>
        {columns.map((column, i) => {
          const { name } = column;

          const isDivider = i === parentCounter;

          if (isDivider) {
            ++parentIndex;
            if (mergedParents && mergedParents[parentIndex]) {
              parentCounter += mergedParents[parentIndex].count;
            } else {
              parentCounter = -1;
            }
          }

          return (
            <TableCell
              key={name}
              header
              className={classNames({ "tableHeader--divider": isDivider })}
              colSpan={column.colSpan}
            >
              {getHeaderTitle<T>(column)}
            </TableCell>
          );
        })}
      </tr>
    </thead>
  );
});

type HeaderTableParentProps = { mergedParents: ReturnType<typeof getParentMap> };
const HeaderTableParent = memoize(function HeaderTableParent({ mergedParents }: HeaderTableParentProps) {
  if (!mergedParents) return null;

  return (
    <tr className="tableRow tableHeader--parentRow">
      {mergedParents.map(({ title, count }, i) => {
        return (
          <TableCell key={i} header className={classNames({ "tableHeader--divider": title })} colSpan={count}>
            {title}
          </TableCell>
        );
      })}
    </tr>
  );
});

function getParentMap<T>(columns: Column<T>[]) {
  const parents = columns.map(({ parent }) => parent || "");
  const mergedParents: Array<{ count: number; title: string }> = [];

  let prev = { count: 1, title: parents[0] };
  for (let i = 1, il = parents.length; i < il; ++i) {
    const current = parents[i];
    if (current === prev.title) {
      prev.count += 1;
    } else {
      mergedParents.push(prev);
      prev = { count: 1, title: current };
    }
  }
  mergedParents.push(prev);

  return mergedParents.length == 1 && !mergedParents[0].title ? null : mergedParents;
}
