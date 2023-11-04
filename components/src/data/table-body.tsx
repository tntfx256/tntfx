import type { ClassName } from "@tntfx/core";
import { useTable } from "./table-provider";
import { TableRow } from "./table-row";
import type { TableBodyProps } from "./types";

export function TableBody<T>(props: ClassName<TableBodyProps<T>>) {
  const { className, render } = props;

  const { data, id } = useTable<T>();

  return (
    <tbody className={className}>
      {data.map((record, index) => {
        return render ? render(record, index) : <TableRow key={record[id] as string} index={index} record={record} />;
      })}
    </tbody>
  );
}
