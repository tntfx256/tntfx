import { memoize } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useTable } from "./table-provider";
import type { Column } from "./types";
import { getHeaderTitle } from "./utils";

export const TableHeader = memoize(function TableHeader<T>() {
  const { columns } = useTable<T>();

  const mergedParents = getParentMap(columns);
  let parentIndex = 0;
  let parentCounter = mergedParents ? mergedParents[parentIndex].count : -1;

  return (
    <thead>
      <HeaderTableParent mergedParents={mergedParents} />
      <tr className={classNames("tableRow")}>
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

          return getHeaderTitle<T>(column);
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
      {mergedParents.map(({ title }) => {
        return title;
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
