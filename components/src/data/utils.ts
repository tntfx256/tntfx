import type { ReactNode } from "react";
import type { Any } from "@tntfx/core";
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
