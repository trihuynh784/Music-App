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
exports.changeStatus = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const system_1 = require("../../config/system");
const pagination_1 = require("../../helpers/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let find = {};
        let objectPagination = {
            currentPage: 1,
            limitRecords: 5,
        };
        const countRecords = yield topic_model_1.default.countDocuments();
        objectPagination = (0, pagination_1.pagination)(req.query, objectPagination, countRecords);
        const topics = yield topic_model_1.default.find(find)
            .limit(objectPagination.limitRecords)
            .skip(objectPagination.skip);
        res.render("admin/pages/topic/index", {
            titlePage: "Danh sách chủ đề bài hát",
            topics: topics,
            pagination: objectPagination,
            countRecords: countRecords,
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
