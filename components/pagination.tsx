import type { PaginalData } from "@tntfx/core";
import { Pagination as PaginationClass } from "@tntfx/core";
import { Icon } from "./icon";
import { Box } from "./layout/box";
import { Text } from "./typography/text";
import "./pagination.scss";

type PaginationProps = PaginalData & {
  onPageChange: (page: number, itemsPerPage: number) => void;
};

export function Pagination(props: PaginationProps) {
  const pagination = new PaginationClass(props);

  function getPageHandler(offset: number) {
    return function handlePageChange() {
      props.onPageChange(pagination.page + offset, pagination.limit);
    };
  }

  if (!pagination.hasPagination) return null;

  return (
    <Box horizontal className="pagination">
      <Icon disabled={!pagination.hasPrevPage} name="left" onClick={getPageHandler(-1)} />
      <Text>
        {pagination.page}/{pagination.lastPage}
      </Text>
      <Icon disabled={!pagination.hasNextPage} name="right" onClick={getPageHandler(1)} />
    </Box>
  );
}
