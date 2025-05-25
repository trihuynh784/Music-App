"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.createPost = void 0;
const system_1 = require("../../config/system");
const createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/create`);
    }
    if (!req.body.avatar) {
        req.flash("error", "Vui lòng gắn hình ảnh!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/create`);
    }
    if (!req.body.audio) {
        req.flash("error", "Vui lòng gắn âm thanh!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/create`);
    }
    if (!req.body.topicId) {
        req.flash("error", "Vui lòng chọn chủ đề!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/create`);
    }
    if (!req.body.singerId) {
        req.flash("error", "Vui lòng chọn ca sĩ!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/create`);
    }
    if (!req.body.lyrics) {
        req.flash("error", "Vui lòng nhập lời bài hát!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/create`);
    }
    next();
};
exports.createPost = createPost;
const editPatch = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`);
    }
    switch (req.body.changeAvatar) {
        case "delete":
        case "noChange":
            break;
        default:
            if (!req.body.avatar) {
                req.flash("error", "Vui lòng gắn hình ảnh!");
                res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`);
            }
            break;
    }
    if (!req.body.topicId) {
        req.flash("error", "Vui lòng chọn chủ đề!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`);
    }
    if (!req.body.singerId) {
        req.flash("error", "Vui lòng chọn ca sĩ!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`);
    }
    if (!req.body.lyrics) {
        req.flash("error", "Vui lòng nhập lời bài hát!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs/edit/${req.params.slugSong}`);
    }
    next();
};
exports.editPatch = editPatch;
