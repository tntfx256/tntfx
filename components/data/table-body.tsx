import type { ClassAndChildren } from "@tntfx/core";
import { useTable } from "./table-provider";
import { TableRow } from "./table-row";
import type { TableBodyProps } from "./types";

export function TableBody<T>(props: ClassAndChildren<TableBodyProps<T>>) {
  const { className, render, children } = props;

  const { data, id } = useTable<T>();

  return (
    <tbody className={className}>
      {children ||
        data.map((record, index) => {
          return render ? render(record, index) : <TableRow key={record[id] as string} index={index} record={record} />;
        })}
    </tbody>
  );
}
