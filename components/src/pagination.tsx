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

  const [startIndex, endIndex] = pagination.range;

  return (
    <Box horizontal className={classes.root}>
      <Box horizontal className={classes.pager}>
        <Icon disabled={!pagination.hasPrevPage} name="ChevronLeft" onClick={getPageHandler(-1)} />
        <Text>
          {pagination.page}/{pagination.lastPage}
        </Text>
        <Icon disabled={!pagination.hasNextPage} name="ChevronRight" onClick={getPageHandler(1)} />
      </Box>

      <Box horizontal className={classes.stat}>
        {startIndex + 1} - {endIndex + 1} / {pagination.total}
      </Box>
    </Box>
  );
}
