import type { Props } from "@tntfx/core";
import { memoize, Pagination } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./table-pagination.style";
import { useTable } from "./table-provider";
import { Box } from "../layout/box";
import { Pagination as PaginationComponent } from "../pagination";

export const TablePagination = memoize(function TablePagination(props: Props) {
  const { className } = props;
  const { pagination, onPagination } = useTable();

  const classes = useStyle();
  const pager = new Pagination(pagination);

  function handlePageChange(page: number, itemsPerPage: number) {
    onPagination?.(page, itemsPerPage);
  }

  if (!pager.hasPagination) return null;

  return (
    <Box horizontal className={classNames(classes.root, className)}>
      <PaginationComponent limit={pager.limit} page={pager.page} total={pager.total} onPageChange={handlePageChange} />
    </Box>
  );
});
