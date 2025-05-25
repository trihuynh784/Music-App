"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupOtpPost = exports.signupOtp = exports.signupPost = exports.signup = exports.loginPost = exports.login = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const otp_model_1 = __importDefault(require("../../models/otp.model"));
const md5_1 = __importDefault(require("md5"));
const generate_1 = require("../../helpers/generate");
const sendMail_1 = __importDefault(require("../../helpers/sendMail"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/login", {
        titlePage: "Đăng nhập",
    });
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: req.body.email });
    if (!user) {
        req.flash("error", "Tài khoản không tồn tại!");
        res.redirect("/user/login");
        return;
    }
    if ((0, md5_1.default)(req.body.password) != user.password) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("/user/login");
        return;
    }
    if (user.status != "active") {
        const message = user.status == "initial" ? "chưa được xác thực" : "đang bị khóa";
        req.flash("error", `Tài khoản ${message}!`);
        res.redirect("/user/login");
        return;
    }
    let expires = new Date(Date.now());
    if (req.body.remember && req.body.remember == "on") {
        expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30));
    }
    res.locals['user'] = user;
    res.cookie("token", user.token, { expires: expires });
    req.flash("success", "Đăng nhập thành công!");
    res.redirect("/topics");
});
exports.loginPost = loginPost;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/signup", {
        titlePage: "Đăng ký",
    });
});
exports.signup = signup;
const signupPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield user_model_1.default.findOne({ email: req.body.email });
    if (isExistUser) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("/user/signup");
        return;
    }
    req.body.password = (0, md5_1.default)(req.body.password);
    delete req.body.terms;
    delete req.body["confirm-password"];
    const user = new user_model_1.default({
        fullName: req.body.fullName,
        token: (0, generate_1.generateToken)(30),
        email: req.body.email,
        password: req.body.password,
        status: "initial",
        expireAt: Date.now(),
    });
    yield user.save();
    const otp = (0, generate_1.generateNumberOtp)(6);
    const otpRecord = new otp_model_1.default({
        otp: otp,
        userId: user.id,
        status: "initial",
        expireAt: Date.now(),
    });
    yield otpRecord.save();
    yield (0, sendMail_1.default)("signup", user.email, otp);
    res.redirect(`/user/signup/otp/${user.id}`);
});
exports.signupPost = signupPost;
const signupOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("/user/signup");
        return;
    }
    res.render("client/pages/user/signup-otp", {
        titlePage: "Nhập mã OTP",
        id: id,
    });
});
exports.signupOtp = signupOtp;
const signupOtpPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const otp = req.body.otp;
    const isExistUser = yield user_model_1.default.findOne({ _id: id, status: "initial" });
    if (!isExistUser) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("/user/signup");
        return;
    }
    const isExistOtp = yield otp_model_1.default.findOne({ userId: id, status: "initial" });
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
    yield user_model_1.default.updateOne({ _id: id }, {
        status: "active",
        $unset: { expireAt: "" },
    });
    yield otp_model_1.default.deleteOne({ userId: id });
    req.flash("success", "Đăng ký tài khoản thành công!");
    res.redirect("/user/login");
});
exports.signupOtpPost = signupOtpPost;
