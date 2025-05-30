import { NextFunction, Request, Response } from "express";
import { systemConfig } from "../../config/system";

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs/create`);
    return;
  }
  if (!req.body.avatar) {
    req.flash("error", "Vui lòng gắn hình ảnh!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs/create`);
    return;
  }
  if (!req.body.audio) {
    req.flash("error", "Vui lòng gắn âm thanh!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs/create`);
    return;
  }
  if (!req.body.topicId) {
    req.flash("error", "Vui lòng chọn chủ đề!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs/create`);
    return;
  }
  if (!req.body.singerId) {
    req.flash("error", "Vui lòng chọn ca sĩ!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs/create`);
    return;
  }
  if (!req.body.lyrics) {
    req.flash("error", "Vui lòng nhập lời bài hát!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs/create`);
    return;
  }

  next();
};

export const editPatch = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề!");
    res.redirect(
      `/${systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`
    );
    return;
  }
  switch (req.body.changeAvatar) {
    case "delete":
    case "noChange":
      break;

    default:
      if (!req.body.avatar) {
        req.flash("error", "Vui lòng gắn hình ảnh!");
        res.redirect(
          `/${systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`
        );
        return;
      }
      break;
  }
  if (!req.body.topicId) {
    req.flash("error", "Vui lòng chọn chủ đề!");
    res.redirect(
      `/${systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`
    );
    return;
  }
  if (!req.body.singerId) {
    req.flash("error", "Vui lòng chọn ca sĩ!");
    res.redirect(
      `/${systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`
    );
    return;
  }
  if (!req.body.lyrics) {
    req.flash("error", "Vui lòng nhập lời bài hát!");
    res.redirect(
      `/${systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`
    );
    return;
  }

  next();
};
