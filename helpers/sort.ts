import { SortOrder } from "mongoose";

export const sort = (query: Record<string, any>) => {
  let objectSort: { [key: string]: SortOrder } = {};
  if (query.topic) {
    objectSort.title = query.topic;
  }
  if (query.status) {
    objectSort.status = query.status;
  }
  // if (query.addedDate) {
  //   objectSort.createdAt = query.addedDate;
  // }

  return objectSort;
};
