import type { ClassName } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { TableCell } from "./table-cell";
import { useTable } from "./table-provider";
import type { Column } from "./types";

export function TableHeader<T>(props: ClassName) {
  const { className } = props;

  const { columns } = useTable<T>();

  const mergedParents = getParentMap(columns);
  let parentIndex = 0;
  let parentCounter = mergedParents ? mergedParents[parentIndex].count : -1;

  return (
    <thead className={className}>
      <HeaderTableParent mergedParents={mergedParents} />
      <tr className={classNames("table-row", { _nested: mergedParents })}>
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
            <TableCell key={name} header className={classNames({ _divider: isDivider })} colSpan={column.colSpan}>
              {TableCell.getHeaderTitle<T>(column)}
            </TableCell>
          );
        })}
      </tr>
    </thead>
  );
}

function HeaderTableParent({ mergedParents }: { mergedParents: ReturnType<typeof getParentMap> }) {
  if (!mergedParents) return null;

  return (
    <tr className="table-row _parent-row">
      {mergedParents.map(({ title, count }, i) => {
        return (
          <TableCell key={i} header className={classNames({ _divider: title })} colSpan={count}>
            {title}
          </TableCell>
        );
      })}
    </tr>
  );
}

function getParentMap<T>(columns: Column<T>[]) {
  const parents = columns.map(({ parent }) => parent || "");
  const mergedParents = [];

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
