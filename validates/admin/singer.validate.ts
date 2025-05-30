import { NextFunction, Request, Response } from "express";
import { systemConfig } from "../../config/system";

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập tên ca sĩ!");
    res.redirect(`/${systemConfig.prefixAdmin}/singers/create`);
    return;
  }
  if (!req.body.avatar) {
    req.flash("error", "Vui lòng gắn hình ảnh!");
    res.redirect(`/${systemConfig.prefixAdmin}/singers/create`);
    return;
  }

  next();
};