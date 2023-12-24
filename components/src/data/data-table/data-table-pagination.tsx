import type { PaginalData, Props } from "@tntfx/core";
import { memoize, Pagination } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./data-table-pagination.style";
import { Box } from "../../layout/box";
import { Pagination as PaginationComponent } from "../../pagination";

type TablePaginationProps = Props & {
  pagination: PaginalData;
  onPagination?: (page: number, itemsPerPage: number) => void;
};

export const TablePagination = memoize(function TablePagination(props: TablePaginationProps) {
  const { className, pagination, onPagination } = props;

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
