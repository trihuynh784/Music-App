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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.deleteRecord = exports.changeStatus = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const pagination_1 = require("../../helpers/pagination");
const sort_1 = require("../../helpers/sort");
const convertToSlug_1 = require("../../helpers/convertToSlug");
const system_1 = require("../../config/system");
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let find = {
        deleted: false,
    };
    if (req.query.keyword) {
        const slug = (0, convertToSlug_1.convertToSlug)(req.query.keyword.toString());
        find["slug"] = new RegExp(slug, "i");
    }
    let objectPagination = {
        currentPage: 1,
        limitRecords: 5,
    };
    let totalRecords = yield song_model_1.default.countDocuments(find);
    objectPagination = (0, pagination_1.pagination)(req.query, objectPagination, totalRecords);
    const objectSort = (0, sort_1.sort)(req.query);
    const songs = yield song_model_1.default.find(find)
        .sort(objectSort)
        .skip(objectPagination.skip)
        .limit(objectPagination.limitRecords);
    objectPagination.countRecords = songs.length;
    res.render("admin/pages/song/index", {
        titlePage: "Danh sách bài hát",
        songs: songs,
        pagination: objectPagination,
        totalRecords: totalRecords,
        sort: objectSort,
        keyword: req.query.keyword,
    });
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        const slugSong = req.params.slugSong;
        yield song_model_1.default.updateOne({ slug: slugSong }, { status: status, $push: { updatedBy: { updatedAt: Date.now() } } });
        req.flash("success", "Đổi trạng thái cho bài hát thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
    }
    catch (error) {
        req.flash("error", "Đổi trạng thái cho bài hát thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
    }
});
exports.changeStatus = changeStatus;
const deleteRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        yield song_model_1.default.updateOne({ slug: slugSong }, { deleted: true });
        req.flash("success", "Xóa bài hát thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
    }
    catch (error) {
        req.flash("error", "Xóa bài hát thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
    }
});
exports.deleteRecord = deleteRecord;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    const topics = yield topic_model_1.default.find(find);
    const singers = yield singer_model_1.default.find(find);
    res.render("admin/pages/song/create", {
        titlePage: "Tạo mới bài hát!",
        topics: topics,
        singers: singers,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSong = {
        title: req.body.title,
        avatar: req.body.avatar[0],
        description: req.body.description,
        singerId: req.body.singerId,
        topicId: req.body.topicId,
        status: req.body.status,
        lyrics: req.body.lyrics,
        audio: req.body.audio[0],
    };
    const song = new song_model_1.default(dataSong);
    yield song.save();
    req.flash("success", "Tạo mới bài hát thành công!");
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({ slug: slugSong, deleted: false });
    const topics = yield topic_model_1.default.find({ deleted: false });
    const singers = yield singer_model_1.default.find({ deleted: false });
    res.render("admin/pages/song/edit", {
        titlePage: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        let song = yield song_model_1.default.findOne({ slug: slugSong, deleted: false });
        const dataSong = {
            title: req.body.title,
            description: req.body.description,
            singerId: req.body.singerId,
            topicId: req.body.topicId,
            status: req.body.status,
            lyrics: req.body.lyrics,
        };
        if (req.body.avatar) {
            dataSong["avatar"] = req.body.avatar[0];
        }
        if (req.body.audio) {
            dataSong["audio"] = req.body.audio[0];
        }
        yield song_model_1.default.updateOne({ slug: slugSong }, dataSong);
        song = yield song_model_1.default.findById(song.id);
        req.flash("success", "Cập nhật bài hát thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs/edit/${song.slug}`);
    }
    catch (error) {
        const slugSong = req.params.slugSong;
        req.flash("error", "Cập nhật bài hát thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs/edit/${slugSong}`);
    }
});
exports.editPatch = editPatch;
