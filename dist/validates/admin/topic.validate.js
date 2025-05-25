"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const system_1 = require("../../config/system");
const createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề!");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/topics/create`);
    }
    next();
};
exports.createPost = createPost;
