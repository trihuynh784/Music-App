"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (query, objectPagination, countRecords) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objectPagination.limitRecords = parseInt(query.limit);
    }
    objectPagination.skip =
        (objectPagination.currentPage - 1) * objectPagination.limitRecords;
    objectPagination.totalPage = Math.ceil(countRecords / objectPagination.limitRecords);
    return objectPagination;
};
exports.pagination = pagination;
