"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const sort = (query) => {
    let objectSort = {};
    if (query.title) {
        objectSort.title = query.title;
    }
    if (query.fullName) {
        objectSort.fullName = query.fullName;
    }
    return objectSort;
};
exports.sort = sort;
