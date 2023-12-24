import type { Column } from "./data-table-column";

export function getParentMap<T extends object>(columns: Column<T>[]) {
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
