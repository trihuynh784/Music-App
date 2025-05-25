import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";

export const checkTokenUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.token) {
    const user = await User.findOne({ token: req.cookies.token }).select(
      "-password"
    );

    if (user) res.locals.user = user;
  }

  next();
};
