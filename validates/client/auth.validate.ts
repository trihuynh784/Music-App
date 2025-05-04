import { NextFunction, Request, Response } from "express";

export const requireAuthJson = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) {
    res.json({
      code: 400,
      message: "not login",
    });
    return;
  }

  next();
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) {
    req.flash("error", "Vui lòng đăng nhập!");
    res.redirect("/user/login");
    return;
  }

  next();
};
