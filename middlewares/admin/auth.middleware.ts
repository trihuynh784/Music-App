import { NextFunction, Request, Response } from "express";
import { systemConfig } from "../../config/system";
import Account from "../../models/account.model";
import Role from "../../models/role.model";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.tokenAdmin;
  if (token) {
    const user = await Account.findOne({ tokenAdmin: token }).select(
      "-password"
    );
    const role = await Role.findById(user.roleId);
    if (user) {
      res.locals.user = user;
      res.locals.role = role;
    } else {
      res.redirect(`/${systemConfig.prefixAdmin}`);
      return;
    }
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}`);
    return;
  }

  next();
};
