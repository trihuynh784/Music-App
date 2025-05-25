import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/system";
import { pagination } from "../../helpers/pagination";
import { convertToSlug } from "../../helpers/convertToSlug";
import { sort } from "../../helpers/sort";
import { SortOrder } from "mongoose";

interface Pagination {
  currentPage: number;
  limitRecords: number;
  countRecords?: number;
  skip?: number;
  totalPage?: number;
}

interface Find {
  deleted: boolean;
  slug?: RegExp;
}

// [GET] /topics
export const index = async (req: Request, res: Response) => {
  try {
    let find: Find = {
      deleted: false,
    };

    // Search
    if (req.query.keyword) {
      const slugFind = convertToSlug(req.query.keyword.toString().trim());

      find.slug = new RegExp(slugFind, "i");
    }

    //Pagination
    let objectPagination: Pagination = {
      currentPage: 1,
      limitRecords: 5,
    };
    const totalRecords = await Topic.countDocuments(find);
    objectPagination = pagination(req.query, objectPagination, totalRecords);

    // Sort
    let objectSort: { [key: string]: SortOrder } = { title: "asc"};
    objectSort = sort(req.query);
    const objectSorted = {};
    objectSorted["title"] = objectSort.title ? objectSort.title : "asc";
    objectSorted["status"] = objectSort.status ? objectSort.status : "asc";
    // End Sort

    const topics = await Topic.find(find)
      .limit(objectPagination.limitRecords)
      .skip(objectPagination.skip)
      .sort(objectSort);

    objectPagination.countRecords = topics.length;

    res.render("admin/pages/topic/index", {
      titlePage: "Danh sách chủ đề bài hát",
      topics: topics,
      pagination: objectPagination,
      totalRecords: totalRecords,
      keyword: req.query.keyword,
      sort: objectSorted,
    });
  } catch (error) {
    req.flash("error", "Thay đổi trạng thái thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  }
};

// [GET] /topics/change-status/:status/:slugTopic
export const changeStatus = async (req: Request, res: Response) => {
  try {
    const status = req.params.status;
    const slugTopic = req.params.slugTopic;

    await Topic.updateOne({ slug: slugTopic }, { status: status });

    req.flash("success", "Thay đổi trạng thái thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  } catch (error) {
    req.flash("error", "Thay đổi trạng thái thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  }
};

// [GET] /topics/delete/:slugTopic
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const slugTopic = req.params.slugTopic;

    await Topic.updateOne({ slug: slugTopic }, { deleted: true });

    req.flash("success", "Xóa chủ đề thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  } catch (error) {
    req.flash("error", "Xóa chủ đề thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  }
};

// [GET] /topics/create
export const create = async (req: Request, res: Response) => {
  try {
    res.render("admin/pages/topic/create", {
      titlePage: "Tạo mới bài hát",
    });
  } catch (error) {
    res.render("client/pages/errors/404");
  }
};

// [GET] /topics/create
export const createPost = async (req: Request, res: Response) => {
  try {
    const dataTopic = {
      title: req.body.title,
      description: req.body.description,
      avatar: req.body.avatar,
      status: req.body.status,
    }

    const topic = new Topic(dataTopic);
    await topic.save();

    req.flash("success", "Tạo mới chủ đề thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  } catch (error) {
    res.render("client/pages/errors/404");
  }
};
