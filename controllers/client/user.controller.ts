import { Request, Response } from "express";
import User from "../../models/user.model";
import OTP from "../../models/otp.model";
import md5 from "md5";

import { generateNumberOtp, generateToken } from "../../helpers/generate";
import sendMail from "../../helpers/sendMail";

// [GET] /user/login
export const login = async (req: Request, res: Response) => {
  res.render("client/pages/user/login", {
    titlePage: "Đăng nhập",
  });
};

// [POST] /user/login
export const loginPost = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    req.flash("error", "Tài khoản không tồn tại!");
    res.redirect("/user/login");
    return;
  }
  if (md5(req.body.password) != user.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("/user/login");
    return;
  }
  if (user.status != "active") {
    const message: string =
      user.status == "initial" ? "chưa được xác thực" : "đang bị khóa";
    req.flash("error", `Tài khoản ${message}!`);
    res.redirect("/user/login");
    return;
  }

  let expires: Date = new Date(Date.now());
  if (req.body.remember && req.body.remember == "on") {
    expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30));
  }

  res.locals['user'] = user;
  res.cookie("token", user.token, { expires: expires });
  req.flash("success", "Đăng nhập thành công!");
  res.redirect("/topics");
};

// [GET] /user/signup
export const signup = async (req: Request, res: Response) => {
  res.render("client/pages/user/signup", {
    titlePage: "Đăng ký",
  });
};

// [POST] /user/signup
export const signupPost = async (req: Request, res: Response) => {
  const isExistUser = await User.findOne({ email: req.body.email });
  if (isExistUser) {
    req.flash("error", "Email đã tồn tại!");
    res.redirect("/user/signup");
    return;
  }

  req.body.password = md5(req.body.password);
  delete req.body.terms;
  delete req.body["confirm-password"];

  const user = new User({
    fullName: req.body.fullName,
    token: generateToken(30),
    email: req.body.email,
    password: req.body.password,
    status: "initial",
    expireAt: Date.now(),
  });
  await user.save();

  const otp = generateNumberOtp(6);
  const otpRecord = new OTP({
    otp: otp,
    userId: user.id,
    status: "initial",
    expireAt: Date.now(),
  });
  await otpRecord.save();

  // Send OTP
  await sendMail("signup", user.email, otp);

  res.redirect(`/user/signup/otp/${user.id}`);
};

// [GET] /user/signup/otp
export const signupOtp = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("/user/signup");
    return;
  }

  res.render("client/pages/user/signup-otp", {
    titlePage: "Nhập mã OTP",
    id: id,
  });
};

// [GET] /user/signup/otp
export const signupOtpPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const otp = req.body.otp;

  const isExistUser = await User.findOne({ _id: id, status: "initial" });
  if (!isExistUser) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("/user/signup");
    return;
  }
  const isExistOtp = await OTP.findOne({ userId: id, status: "initial" });
  if (!isExistOtp) {
    req.flash("error", "OTP không tồn tại!");
    res.redirect("/user/signup");
    return;
  }
  if (isExistOtp.otp != otp) {
    req.flash("error", "OTP không trùng khớp!");
    res.redirect(`/user/signup/otp/${id}`);
    return;
  }

  await User.updateOne(
    { _id: id },
    {
      status: "active",
      $unset: { expireAt: "" },
    }
  );
  await OTP.deleteOne({ userId: id });

  req.flash("success", "Đăng ký tài khoản thành công!");
  res.redirect("/user/login");
};
