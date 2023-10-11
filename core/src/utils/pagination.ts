export type PaginalData = {
  page: number;
  limit: number;
  total: number;
};

export type PaginalResponse<T> = {
  page: number;
  limit: number;
  total: number;
  data: T[];
};

export type PaginalRequest = {
  page: number;
  limit?: number;
};

export class Pagination {
  #hasPagination: boolean;
  #data: PaginalData;

  constructor(data?: PaginalData) {
    this.#data = data || { limit: 10, page: 1, total: 0 };
    this.#hasPagination = Boolean(data && data.total > data.limit);
  }

  get data() {
    return { ...this.#data };
  }

  set data(data: PaginalData) {
    this.#data = data;
    this.#hasPagination = Boolean(data && data.total > data.limit);
  }

  get page() {
    return this.#data.page;
  }

  get limit() {
    return this.#data.limit;
  }

  get total() {
    return this.#data.total;
  }
  set total(count: number) {
    this.data = { ...this.#data, total: count };
  }

  get hasPagination() {
    return this.#hasPagination;
  }

  get nextPage() {
    return Math.min(this.#data.page + 1, this.lastPage);
  }

  get hasNextPage() {
    return this.#data.page < this.lastPage;
  }

  get lastPage() {
    return Math.ceil(this.#data.total / this.#data.limit);
  }

  get prevPage() {
    return Math.max(1, this.#data.page - 1);
  }

  get hasPrevPage() {
    return this.#data.page > 1;
  }

  get range(): [startIndex: number, endIndex: number] {
    const { page, limit, total } = this.#data;
    if (this.#hasPagination) return [(page - 1) * limit, Math.min(page * limit, total) - 1];

    return [0, total - 1];
  }

  onChange(page: number, limit?: number) {
    if (limit && 1 <= limit && limit <= this.#data.total) {
      this.#data.limit = limit;
    }
    if (1 <= page && page <= this.lastPage) {
      this.#data.page = page;
    }
  }
}
