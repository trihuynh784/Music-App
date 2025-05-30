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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = exports.loginPost = void 0;
const system_1 = require("../../config/system");
const loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập Email!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}`);
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}`);
        return;
    }
    next();
};
exports.loginPost = loginPost;
const checkLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.tokenAdmin;
    if (token) {
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/dashboard`);
        return;
    }
    next();
});
exports.checkLogin = checkLogin;
