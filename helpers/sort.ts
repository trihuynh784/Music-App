import { SortOrder } from "mongoose";

export const sort = (query: Record<string, any>) => {
  let objectSort: { [key: string]: SortOrder } = {};
  if (query.title) {
    objectSort.title = query.title;
  }

  return objectSort;
};
