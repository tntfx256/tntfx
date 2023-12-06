import type { PaginalData } from "@tntfx/core";
import { Pagination as PaginationClass } from "@tntfx/core";
import { Icon } from "@tntfx/icons";
import { Box } from "./layout/box";
import { useStyle } from "./pagination.style";
import { Text } from "./text";

type PaginationProps = PaginalData & {
  onPageChange: (page: number, itemsPerPage: number) => void;
};

export function Pagination(props: PaginationProps) {
  const pagination = new PaginationClass(props);
  const classes = useStyle();

  function getPageHandler(offset: number) {
    return function handlePageChange() {
      props.onPageChange(pagination.page + offset, pagination.limit);
    };
  }

  if (!pagination.hasPagination) return null;

  return (
    <Box horizontal className={classes.root}>
      <Icon disabled={!pagination.hasPrevPage} name="ChevronLeft" onClick={getPageHandler(-1)} />
      <Text>
        {pagination.page}/{pagination.lastPage}
      </Text>
      <Icon disabled={!pagination.hasNextPage} name="ChevronRight" onClick={getPageHandler(1)} />
    </Box>
  );
}
