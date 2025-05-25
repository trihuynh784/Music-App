interface Pagination {
  currentPage: number;
  limitRecords: number;
  skip?: number;
  totalPage?: number;
}

export const pagination = (
  query: Record<string, any>,
  objectPagination: Pagination,
  countRecords: number
) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  if (query.limit) {
    objectPagination.limitRecords = parseInt(query.limit);
  }
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitRecords;

  objectPagination.totalPage = Math.ceil(
    countRecords / objectPagination.limitRecords
  );
  
  return objectPagination;
};
