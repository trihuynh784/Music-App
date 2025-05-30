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
exports.logout = exports.loginPost = exports.login = void 0;
const md5_1 = __importDefault(require("md5"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const system_1 = require("../../config/system");
const login = (req, res) => {
    res.render("admin/pages/auth/login", {
        titlePage: "Đăng nhập",
    });
};
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = (0, md5_1.default)(req.body.password);
        const account = yield account_model_1.default.findOne({ email: email });
        if (!account) {
            req.flash("error", "Tài khoản không chính xác!");
            res.redirect(`/${system_1.systemConfig.prefixAdmin}`);
        }
        if (account.password != password) {
            req.flash("error", "Mật khẩu không chính xác!");
            res.redirect(`/${system_1.systemConfig.prefixAdmin}`);
        }
        if (account.status == "inactive") {
            req.flash("error", "Tài khoản đang bị khóa!");
            res.redirect(`/${system_1.systemConfig.prefixAdmin}`);
        }
        res.cookie("tokenAdmin", account.tokenAdmin, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        });
        req.flash("success", "Đăng nhập thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/dashboard`);
    }
    catch (error) {
        req.flash("error", "Lỗi đăng nhập!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}`);
    }
});
exports.loginPost = loginPost;
const logout = (req, res) => {
    res.clearCookie("tokenAdmin");
    req.flash("success", "Đăng xuất thành công!");
    res.redirect(`/${system_1.systemConfig.prefixAdmin}`);
};
exports.logout = logout;
