import { NextFunction, Request, Response } from "express";
import { systemConfig } from "../../config/system";

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập họ tên!");
    res.redirect(`/${systemConfig.prefixAdmin}/accounts/create`);
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập Email!");
    res.redirect(`/${systemConfig.prefixAdmin}/accounts/create`);
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect(`/${systemConfig.prefixAdmin}/accounts/create`);
  }

  next();
};