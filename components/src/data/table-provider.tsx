import type { PropsWithChildren } from "react";
import { createContext, useContext, useId, useMemo } from "react";
import type { TableContext, TableProviderProps } from "./types";

export const tableContext = createContext<TableContext>({} as TableContext);

export function TableProvider<T>(props: PropsWithChildren<TableProviderProps<T>>) {
  const { children, idKey = "id", ...values } = props;

  const tableId = `table-${useId()}`;

  const contextValue = useMemo(() => ({ ...values, tableId, idKey }), [idKey, tableId, values]);

  return <tableContext.Provider value={contextValue}>{children}</tableContext.Provider>;
}

export function useTable<T>() {
  const context = useContext(tableContext);

  return context as TableContext<T>;
}
