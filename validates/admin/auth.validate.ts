import { NextFunction, Request, Response } from "express";
import { systemConfig } from "../../config/system";

export const loginPost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập Email!");
    res.redirect(`/${systemConfig.prefixAdmin}`);
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect(`/${systemConfig.prefixAdmin}`);
    return;
  }

  next();
};

export const checkLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.tokenAdmin;
  if (token) {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    return;
  }

  next();
};
