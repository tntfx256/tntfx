import { useId, useRef } from "react";
import type { ClassName, Nullable, StringKeys } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { TableHeader } from "./table-header";
import { TablePagination } from "./table-pagination";
import { TableProvider } from "./table-provider";
import { TableRow } from "./table-row";
import type { TableProps } from "./types";
import { Box } from "../layout/box";
import { Loader } from "../loader";
import { Text } from "../typography";
import "./table.scss";

export function Table<T>(props: ClassName<TableProps<T>>) {
  const { className, title, caption, data = [], idKey = "id", renderRow, render, ...values } = props;

  // const [ref, refHandler] = useRefState<HTMLDivElement>();
  // const scrollbar = useScrollbarDimension(ref);

  const tableRef = useRef<Nullable<HTMLTableElement>>(null);
  const tableId = `table-${useId()}`;

  return (
    <TableProvider {...values} data={data} idKey={idKey as StringKeys<T>}>
      <Box className={classNames("table", className)}>
        {title && (
          <Text as="h1" className="table__title" color="primary" fontSize="lg">
            {title}
          </Text>
        )}

        <Box className="table__container">
          <table className="table__element" id={tableId} ref={tableRef}>
            <TableHeader />
            <tbody className="table__element__body">
              {render
                ? render(data)
                : data.map((record) =>
                    renderRow ? (
                      renderRow(record)
                    ) : (
                      <TableRow key={record[idKey as StringKeys<T>] as string} record={record} />
                    )
                  )}
            </tbody>
          </table>
        </Box>

        <TablePagination />

        {caption && (
          <caption className="table__caption">
            <Text fontSize="xs">{caption}</Text>
          </caption>
        )}
        <Loader background="blur" visible={props.isLoading} />
      </Box>
    </TableProvider>
  );
}
