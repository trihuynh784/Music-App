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
exports.detail = exports.createPost = exports.create = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const sort_1 = require("../../helpers/sort");
const pagination_1 = require("../../helpers/pagination");
const convertToSlug_1 = require("../../helpers/convertToSlug");
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let find = {
        deleted: false,
    };
    const objectSort = (0, sort_1.sort)(req.query);
    if (req.query.keyword) {
        const slug = (0, convertToSlug_1.convertToSlug)(req.query.keyword.toString());
        find["slug"] = new RegExp(slug, "i");
    }
    let objectPagination = {
        currentPage: 1,
        limitRecords: 5,
    };
    const totalRecords = yield singer_model_1.default.countDocuments(find);
    objectPagination = (0, pagination_1.pagination)(req.query, objectPagination, totalRecords);
    const singers = yield singer_model_1.default.find(find)
        .sort(objectSort)
        .skip(objectPagination.skip)
        .limit(objectPagination.limitRecords);
    objectPagination.countRecords = singers.length;
    res.render("admin/pages/singers/index", {
        titlePage: "Danh sách ca sĩ",
        singers: singers,
        sort: objectSort,
        pagination: objectPagination,
        totalRecords: totalRecords,
        keyword: req.query.keyword,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singers/create", {
        titlePage: "Tạo mới ca sĩ",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataSinger = {
            fullName: req.body.fullName,
            avatar: req.body.avatar,
            status: req.body.status,
            description: req.body.description,
        };
        const singer = new singer_model_1.default(dataSinger);
        yield singer.save();
        req.flash("success", "Tạo mới ca sĩ thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/singers`);
    }
    catch (error) {
        req.flash("error", "Tạo mới ca sĩ thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/singers`);
    }
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSinger = req.params.slugSinger;
    const singer = yield singer_model_1.default.findOne({ slug: slugSinger });
    res.render("admin/pages/singers/detail", {
        titlePage: singer.fullName,
        singer: singer,
    });
});
exports.detail = detail;
