import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
} from "@fluentui/react-components";
import { pick, type StringKeys } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./table.style";
import { TablePagination } from "./table-pagination";
import { TableProvider } from "./table-provider";
import type { TableProps } from "./types";
import { adaptors } from "./utils";
import { Box } from "../layout/box";
import { Loader } from "../loader";
import { Text } from "../text";

export function Table<T>(props: TableProps<T>) {
  const { className, title, caption, data = [], idKey = "id", columns, ...context } = props;

  const classes = useStyle();
  const dtColumns = adaptors.columns(columns);
  const columnWidths = adaptors.columnsWidths(columns);

  return (
    <TableProvider {...context} columns={columns} data={data} idKey={idKey as StringKeys<T>}>
      <Box className={classNames(classes.root, className)}>
        {title && <Text className={classes.title}>{title}</Text>}

        <Box className={classes.container}>
          <DataGrid
            resizableColumns
            className={classes.table}
            columnSizingOptions={columnWidths}
            columns={dtColumns}
            getRowId={pick(idKey)}
            items={data}
          >
            <DataGridHeader>
              <DataGridRow>
                {({ renderHeaderCell }) => (
                  <DataGridHeaderCell className={classNames(classes.cell, classes.headerCell)}>
                    {renderHeaderCell()}
                  </DataGridHeaderCell>
                )}
              </DataGridRow>
            </DataGridHeader>

            <DataGridBody<T>>
              {({ item, rowId }) => (
                <DataGridRow<T> key={rowId}>
                  {({ renderCell }) => (
                    <DataGridCell className={classNames(classes.cell, classes.dataCell)}>{renderCell(item)}</DataGridCell>
                  )}
                </DataGridRow>
              )}
            </DataGridBody>
          </DataGrid>
        </Box>

        <TablePagination />

        {caption && (
          <caption className={classes.caption}>
            <Text>{caption}</Text>
          </caption>
        )}
        <Loader visible={props.isLoading} />
      </Box>
    </TableProvider>
  );
}
