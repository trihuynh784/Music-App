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
const account_model_1 = __importDefault(require("../../models/account.model"));
const pagination_1 = require("../../helpers/pagination");
const md5_1 = __importDefault(require("md5"));
const generate_1 = require("../../helpers/generate");
const system_1 = require("../../config/system");
const role_model_1 = __importDefault(require("../../models/role.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let find = {
        deleted: false,
    };
    let objectPagination = {
        currentPage: 1,
        limitRecords: 5,
    };
    const totalRecords = yield account_model_1.default.countDocuments(find);
    objectPagination = (0, pagination_1.pagination)(req.query, objectPagination, totalRecords);
    const accounts = yield account_model_1.default.find(find)
        .skip(objectPagination.skip)
        .limit(objectPagination.limitRecords);
    for (const account of accounts) {
        const role = yield role_model_1.default.findById(account.roleId);
        account["infoRole"] = role;
    }
    objectPagination.countRecords = accounts.length;
    res.render("admin/pages/account/index", {
        titlePage: "Danh sách tài khoản",
        accounts: accounts,
        pagination: objectPagination,
        totalRecords: totalRecords,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.find({ deleted: false });
    res.render("admin/pages/account/create", {
        titlePage: "Tạo mới tài khoản",
        roles: roles,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataAccount = {
        fullName: req.body.fullName,
        tokenAdmin: (0, generate_1.generateToken)(30),
        email: req.body.email,
        password: (0, md5_1.default)(req.body.password),
        status: req.body.status,
        roleId: req.body.roleId,
    };
    const account = new account_model_1.default(dataAccount);
    yield account.save();
    req.flash("success", "Tạo mới tài khoản thành công!");
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/accounts`);
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugAccount = req.params.slugAccount;
    const account = yield account_model_1.default.findOne({ slug: slugAccount }).select("-password");
    res.render("admin/pages/account/detail", {
        titlePage: account.fullName,
        account: account,
    });
});
exports.detail = detail;
