"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.requireAuthJson = void 0;
const requireAuthJson = (req, res, next) => {
    if (!res.locals.user) {
        res.json({
            code: 400,
            message: "not login",
        });
        return;
    }
    next();
};
exports.requireAuthJson = requireAuthJson;
const requireAuth = (req, res, next) => {
    if (!res.locals.user) {
        req.flash("error", "Vui lòng đăng nhập!");
        res.redirect("/user/login");
        return;
    }
    next();
};
exports.requireAuth = requireAuth;
