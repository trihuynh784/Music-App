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
exports.detail = exports.createPost = exports.create = exports.deleteItem = exports.changeStatus = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const system_1 = require("../../config/system");
const pagination_1 = require("../../helpers/pagination");
const convertToSlug_1 = require("../../helpers/convertToSlug");
const sort_1 = require("../../helpers/sort");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let find = {
            deleted: false,
        };
        if (req.query.keyword) {
            const slugFind = (0, convertToSlug_1.convertToSlug)(req.query.keyword.toString().trim());
            find.slug = new RegExp(slugFind, "i");
        }
        let objectPagination = {
            currentPage: 1,
            limitRecords: 5,
        };
        const totalRecords = yield topic_model_1.default.countDocuments(find);
        objectPagination = (0, pagination_1.pagination)(req.query, objectPagination, totalRecords);
        let objectSort = { title: "asc" };
        objectSort = (0, sort_1.sort)(req.query);
        const objectSorted = {};
        objectSorted["title"] = objectSort.title ? objectSort.title : "asc";
        objectSorted["status"] = objectSort.status ? objectSort.status : "asc";
        const topics = yield topic_model_1.default.find(find)
            .limit(objectPagination.limitRecords)
            .skip(objectPagination.skip)
            .sort(objectSort);
        objectPagination.countRecords = topics.length;
        res.render("admin/pages/topic/index", {
            titlePage: "Danh sách chủ đề bài hát",
            topics: topics,
            pagination: objectPagination,
            totalRecords: totalRecords,
            keyword: req.query.keyword,
            sort: objectSorted,
        });
    }
    catch (error) {
        req.flash("error", "Thay đổi trạng thái thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/topics`);
    }
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        const slugTopic = req.params.slugTopic;
        yield topic_model_1.default.updateOne({ slug: slugTopic }, { status: status });
        req.flash("success", "Thay đổi trạng thái thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        req.flash("error", "Thay đổi trạng thái thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/topics`);
    }
});
exports.changeStatus = changeStatus;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugTopic = req.params.slugTopic;
        yield topic_model_1.default.updateOne({ slug: slugTopic }, { deleted: true });
        req.flash("success", "Xóa chủ đề thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        req.flash("error", "Xóa chủ đề thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/topics`);
    }
});
exports.deleteItem = deleteItem;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/topic/create", {
        titlePage: "Tạo mới bài hát",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataTopic = {
            title: req.body.title,
            description: req.body.description,
            avatar: req.body.avatar,
            status: req.body.status,
        };
        const topic = new topic_model_1.default(dataTopic);
        yield topic.save();
        req.flash("success", "Tạo mới chủ đề thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        res.render("client/pages/errors/404");
    }
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopic;
    const topic = yield topic_model_1.default.findOne({ slug: slugTopic });
    res.render("admin/pages/topic/detail", {
        titlePage: "Tạo mới bài hát",
        topic: topic,
    });
});
exports.detail = detail;
