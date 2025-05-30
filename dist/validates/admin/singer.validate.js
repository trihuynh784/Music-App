"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const system_1 = require("../../config/system");
const createPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập tên ca sĩ!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/singers/create`);
        return;
    }
    if (!req.body.avatar) {
        req.flash("error", "Vui lòng gắn hình ảnh!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/singers/create`);
        return;
    }
    next();
};
exports.createPost = createPost;
