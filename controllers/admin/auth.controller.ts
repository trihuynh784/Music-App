import { Request, Response } from "express";
import md5 from "md5";
import Account from "../../models/account.model";
import { systemConfig } from "../../config/system";

// [GET] /admin/login
export const login = (req: Request, res: Response) => {
  res.render("admin/pages/auth/login", {
    titlePage: "Đăng nhập",
  });
};

// [POST] /admin/login
export const loginPost = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = md5(req.body.password);

    const account = await Account.findOne({ email: email });
    if (!account) {
      req.flash("error", "Tài khoản không chính xác!");
      res.redirect(`/${systemConfig.prefixAdmin}`);
    }
    if (account.password != password) {
      req.flash("error", "Mật khẩu không chính xác!");
      res.redirect(`/${systemConfig.prefixAdmin}`);
    }
    if (account.status == "inactive") {
      req.flash("error", "Tài khoản đang bị khóa!");
      res.redirect(`/${systemConfig.prefixAdmin}`);
    }

    res.cookie("tokenAdmin", account.tokenAdmin, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    req.flash("success", "Đăng nhập thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  } catch (error) {
    req.flash("error", "Lỗi đăng nhập!");
    res.redirect(`/${systemConfig.prefixAdmin}`);
  }
};

// [GET] /admin/logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("tokenAdmin");
  req.flash("success", "Đăng xuất thành công!");
  res.redirect(`/${systemConfig.prefixAdmin}`);
};
