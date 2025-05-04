import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/system";
import { pagination } from "../../helpers/pagination";

interface Pagination {
  currentPage: number;
  limitRecords: number;
  skip?: number;
  totalPage?: number;
}

// [GET] /topics
export const index = async (req: Request, res: Response) => {
  try {
    let find = {};

    //Pagination
    let objectPagination: Pagination = {
      currentPage: 1,
      limitRecords: 5,
    };
    const countRecords = await Topic.countDocuments();
    objectPagination = pagination(req.query, objectPagination, countRecords);

    const topics = await Topic.find(find)
      .limit(objectPagination.limitRecords)
      .skip(objectPagination.skip);

    res.render("admin/pages/topic/index", {
      titlePage: "Danh sách chủ đề bài hát",
      topics: topics,
      pagination: objectPagination,
      countRecords: countRecords,
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
