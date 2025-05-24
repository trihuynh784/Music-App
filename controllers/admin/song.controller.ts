import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";

import { pagination } from "../../helpers/pagination";
import { SortOrder } from "mongoose";
import { sort } from "../../helpers/sort";
import { convertToSlug } from "../../helpers/convertToSlug";
import { systemConfig } from "../../config/system";
import Singer from "../../models/singer.model";

interface Pagination {
  currentPage: number;
  limitRecords: number;
  countRecords?: number;
  skip?: number;
  totalPage?: number;
}

// [GET] /songs/create
export const index = async (req: Request, res: Response) => {
  let find = {
    deleted: false,
  };

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
  let totalRecords = await Song.countDocuments(find);
  objectPagination = pagination(req.query, objectPagination, totalRecords);

  // Sort
  const objectSort: { [key: string]: SortOrder } = sort(req.query);
  // End Sort

  const songs = await Song.find(find)
    .sort(objectSort)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitRecords);

  objectPagination.countRecords = songs.length;

  res.render("admin/pages/song/index", {
    titlePage: "Danh sách bài hát",
    songs: songs,
    pagination: objectPagination,
    totalRecords: totalRecords,
    sort: objectSort,
    keyword: req.query.keyword,
  });
};

// [PATCH] /songs/change-status/:status/:slugSong
export const changeStatus = async (req: Request, res: Response) => {
  try {
    const status = req.params.status;
    const slugSong = req.params.slugSong;

    await Song.updateOne(
      { slug: slugSong },
      { status: status, $push: { updatedBy: { updatedAt: Date.now() } } }
    );

    req.flash("success", "Đổi trạng thái cho bài hát thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  } catch (error) {
    req.flash("error", "Đổi trạng thái cho bài hát thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  }
};

// [PATCH] /songs/delete/:slugSong
export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const slugSong = req.params.slugSong;

    await Song.updateOne({ slug: slugSong }, { deleted: true });

    req.flash("success", "Xóa bài hát thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  } catch (error) {
    req.flash("error", "Xóa bài hát thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  }
};

// [GET] /songs/create
export const create = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
  };
  const topics = await Topic.find(find);
  const singers = await Singer.find(find);

  res.render("admin/pages/song/create", {
    titlePage: "Tạo mới bài hát!",
    topics: topics,
    singers: singers,
  });
};

// [POST] /songs/create
export const createPost = async (req: Request, res: Response) => {
  const dataSong = {
    title: req.body.title,
    avatar: req.body.avatar[0],
    description: req.body.description,
    singerId: req.body.singerId,
    topicId: req.body.topicId,
    status: req.body.status,
    lyrics: req.body.lyrics,
    audio: req.body.audio[0],
  };

  const song = new Song(dataSong);
  await song.save();

  req.flash("success", "Tạo mới bài hát thành công!");
  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};
