import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import { SortOrder } from "mongoose";
import { sort } from "../../helpers/sort";
import { pagination } from "../../helpers/pagination";
import { convertToSlug } from "../../helpers/convertToSlug";
import { systemConfig } from "../../config/system";

interface Pagination {
  currentPage: number;
  limitRecords: number;
  countRecords?: number;
  skip?: number;
  totalPage?: number;
}

// [GET] /singers/
export const index = async (req: Request, res: Response) => {
  let find = {
    deleted: false,
  };

  // Sort
  const objectSort: { [key: string]: SortOrder } = sort(req.query);
  // End Sort

  // Search
  if (req.query.keyword) {
    const slug = convertToSlug(req.query.keyword.toString());
    find["slug"] = new RegExp(slug, "i");
  }
  // End Search

  // Pagination
  let objectPagination: Pagination = {
    currentPage: 1,
    limitRecords: 5,
  };
  const totalRecords = await Singer.countDocuments(find);
  objectPagination = pagination(req.query, objectPagination, totalRecords);
  // End Pagination

  const singers = await Singer.find(find)
    .sort(objectSort)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitRecords);

  objectPagination.countRecords = singers.length;

  res.render("admin/pages/singers/index", {
    titlePage: "Danh sách ca sĩ",
    singers: singers,
    sort: objectSort,
    pagination: objectPagination,
    totalRecords: totalRecords,
    keyword: req.query.keyword,
  });
};

// [GET] /singers/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/singers/create", {
    titlePage: "Tạo mới ca sĩ",
  });
};

// [POST] /singers/create
export const createPost = async (req: Request, res: Response) => {
  try {
    const dataSinger = {
      fullName: req.body.fullName,
      avatar: req.body.avatar,
      status: req.body.status,
      description: req.body.description,
    };

    const singer = new Singer(dataSinger);
    await singer.save();

    req.flash("success", "Tạo mới ca sĩ thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/singers`);
  } catch (error) {
    req.flash("error", "Tạo mới ca sĩ thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/singers`);
  }
};

// [GET] /singers/:slugSinger
export const detail = async (req: Request, res: Response) => {
  const slugSinger = req.params.slugSinger;

  const singer = await Singer.findOne({ slug: slugSinger });

  res.render("admin/pages/singers/detail", {
    titlePage: singer.fullName,
    singer: singer,
  });
};
