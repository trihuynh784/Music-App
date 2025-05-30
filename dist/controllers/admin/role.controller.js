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
exports.detail = exports.permissionsPatch = exports.permissions = exports.deleteItem = exports.createPost = exports.create = exports.index = void 0;
const role_model_1 = __importDefault(require("../../models/role.model"));
const pagination_1 = require("../../helpers/pagination");
const sort_1 = require("../../helpers/sort");
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let find = {
        deleted: false,
    };
    const objectSort = (0, sort_1.sort)(req.query);
    let objectPagination = {
        currentPage: 1,
        limitRecords: 5,
    };
    const totalRecords = yield role_model_1.default.countDocuments(find);
    objectPagination = (0, pagination_1.pagination)(req.query, objectPagination, totalRecords);
    const roles = yield role_model_1.default.find(find)
        .skip(objectPagination.skip)
        .limit(objectPagination.limitRecords)
        .sort(objectSort);
    objectPagination.countRecords = roles.length;
    res.render("admin/pages/role/index", {
        titlePage: "Danh sách các quyền",
        roles: roles,
        pagination: objectPagination,
        totalRecords: totalRecords,
        sort: objectSort,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/role/create", {
        titlePage: "Tạo mới quyền",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataRole = {
            title: req.body.title,
            description: req.body.description,
        };
        const role = new role_model_1.default(dataRole);
        yield role.save();
        req.flash("success", "Tạo mới quyền thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/roles`);
    }
    catch (error) {
        req.flash("error", "Tạo mới quyền thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/roles`);
    }
});
exports.createPost = createPost;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield role_model_1.default.updateOne({ slug: req.params.slugRole }, { deleted: true });
        req.flash("success", "Xóa nhóm quyền thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/roles`);
    }
    catch (error) {
        req.flash("error", "Xóa nhóm quyền thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/roles`);
    }
});
exports.deleteItem = deleteItem;
const permissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.find({ deleted: false }).select("id title permissions");
    res.render("admin/pages/role/permission", {
        titlePage: "Phân quyền",
        records: roles,
    });
});
exports.permissions = permissions;
const permissionsPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permissions = JSON.parse(req.body.permissions);
        permissions.forEach((permission) => __awaiter(void 0, void 0, void 0, function* () {
            yield role_model_1.default.updateOne({ _id: permission.id }, { permissions: permission.permissions });
        }));
        req.flash("success", "Cập nhật phân quyền thành công!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/roles/permissions`);
    }
    catch (error) {
        req.flash("success", "Cập nhật phân quyền thất bại!");
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/roles/permissions`);
    }
});
exports.permissionsPatch = permissionsPatch;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugRole = req.params.slugRole;
    const role = yield role_model_1.default.findOne({ slug: slugRole });
    res.render("admin/pages/role/detail", {
        titlePage: role.title,
        role: role,
    });
});
exports.detail = detail;
