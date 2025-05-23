import { NextFunction, Request, Response } from "express";
import { systemConfig } from "../../config/system";

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề!");
    res.redirect(`/${systemConfig.prefixAdmin}/create`);
  }
  if (!req.body.avatar) {
    req.flash("error", "Vui lòng gắn hình ảnh!");
    res.redirect(`/${systemConfig.prefixAdmin}/create`);
  }
  if (!req.body.audio) {
    req.flash("error", "Vui lòng gắn âm thanh!");
    res.redirect(`/${systemConfig.prefixAdmin}/create`);
  }
  if (!req.body.topicId) {
    req.flash("error", "Vui lòng chọn chủ đề!");
    res.redirect(`/${systemConfig.prefixAdmin}/create`);
  }
  if (!req.body.singerId) {
    req.flash("error", "Vui lòng chọn ca sĩ!");
    res.redirect(`/${systemConfig.prefixAdmin}/create`);
  }
  if (!req.body.lyrics) {
    req.flash("error", "Vui lòng nhập lời bài hát!");
    res.redirect(`/${systemConfig.prefixAdmin}/create`);
  }

  next();
}