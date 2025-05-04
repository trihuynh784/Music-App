"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupOtpPost = exports.signupPost = exports.loginPost = void 0;
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("/user/login");
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhật mật khẩu!");
        res.redirect("/user/login");
        return;
    }
    next();
};
exports.loginPost = loginPost;
const signupPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập họ tên!");
        res.redirect("/user/signup");
        return;
    }
    if (!req.body.email || !isValidEmail(req.body.email)) {
        req.flash("error", "Vui lòng nhập đúng định dạng email!");
        res.redirect("/user/signup");
        return;
    }
    if (!req.body.password || req.body.password.length < 6) {
        req.flash("error", "Mật khẩu phải trên 6 kí tự!");
        res.redirect("/user/signup");
        return;
    }
    if (!req.body["confirm-password"] || req.body.password != req.body["confirm-password"]) {
        req.flash("error", "Xác nhận mật khẩu thất bại!");
        res.redirect("/user/signup");
        return;
    }
    if (!req.body.terms || req.body.terms != "on") {
        req.flash("error", "Vui lòng đồng ý tất cả các điều kiện của trang web!");
        res.redirect("/user/signup");
        return;
    }
    next();
};
exports.signupPost = signupPost;
const signupOtpPost = (req, res, next) => {
    if (!req.body.otp || req.body.otp.length != 6) {
        req.flash("error", "Mã OTP phải bằng 6 kí tự!");
        res.redirect("/user/signup/otp");
        return;
    }
    next();
};
exports.signupOtpPost = signupOtpPost;
