"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const sort = (query) => {
    let objectSort = {};
    if (query.topic) {
        objectSort.title = query.topic;
    }
    if (query.status) {
        objectSort.status = query.status;
    }
    return objectSort;
};
exports.sort = sort;
