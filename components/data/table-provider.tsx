import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { generateId } from "@tntfx/core";
import type { TableContext } from "./types";

export const tableContext = createContext<TableContext>({} as TableContext);

export function TableProvider<T>(props: PropsWithChildren<Omit<TableContext<T>, "tableId">>) {
  const { children, ...values } = props;
  const [tableId] = useState(() => `table-${generateId()}`);

  const contextValue = useMemo(() => ({ ...values, tableId }), [tableId, values]);

  return <tableContext.Provider value={contextValue}>{children}</tableContext.Provider>;
}

export function useTable<T>() {
  const context = useContext(tableContext);

  return context as TableContext<T>;
}
