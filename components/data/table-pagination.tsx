import type { ClassName } from "@tntfx/core";
import { Pagination } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useTable } from "./table-provider";
import { Box } from "../layout/box";
import { Pagination as PaginationComponent } from "../pagination";

export function TablePagination(props: ClassName) {
  const { className } = props;
  const { pagination, onPagination } = useTable();

  const pager = new Pagination(pagination);

  function handlePageChange(page: number, itemsPerPage: number) {
    onPagination?.(page, itemsPerPage);
  }

  if (!pager.hasPagination) return null;

  return (
    <Box horizontal className={classNames("table-pagination", className)}>
      <PaginationComponent limit={pager.limit} page={pager.page} total={pager.total} onPageChange={handlePageChange} />
    </Box>
  );
}
