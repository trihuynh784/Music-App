import { Request, Response } from "express";
import Account from "../../models/account.model";
import { pagination } from "../../helpers/pagination";
import md5 from "md5";
import { sort } from "../../helpers/sort";
import { generateToken } from "../../helpers/generate";
import { systemConfig } from "../../config/system";
import Role from "../../models/role.model";

interface Pagination {
  currentPage: number;
  limitRecords: number;
  countRecords?: number;
  skip?: number;
  totalPage?: number;
}

// [GET] /accounts/
export const index = async (req: Request, res: Response) => {
  let find = {
    deleted: false,
  };

  // Pagination
  let objectPagination: Pagination = {
    currentPage: 1,
    limitRecords: 5,
  };
  const totalRecords = await Account.countDocuments(find);
  objectPagination = pagination(req.query, objectPagination, totalRecords);
  // End Pagination

  const accounts = await Account.find(find)
    .skip(objectPagination.skip)
    .limit(objectPagination.limitRecords);

  for (const account of accounts) {
    const role = await Role.findById(account.roleId);
    account["infoRole"] = role;
  }

  objectPagination.countRecords = accounts.length;

  res.render("admin/pages/account/index", {
    titlePage: "Danh sách tài khoản",
    accounts: accounts,
    pagination: objectPagination,
    totalRecords: totalRecords,
  });
};

// [GET] /accounts/create
export const create = async (req: Request, res: Response) => {
  const roles = await Role.find({ deleted: false });

  res.render("admin/pages/account/create", {
    titlePage: "Tạo mới tài khoản",
    roles: roles,
  });
};

// [POST] /accounts/create
export const createPost = async (req: Request, res: Response) => {
  const dataAccount = {
    fullName: req.body.fullName,
    tokenAdmin: generateToken(30),
    email: req.body.email,
    password: md5(req.body.password),
    status: req.body.status,
    roleId: req.body.roleId,
  };

  const account = new Account(dataAccount);
  await account.save();

  req.flash("success", "Tạo mới tài khoản thành công!");
  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
};

// [GET] /accounts/:slugAccount
export const detail = async (req: Request, res: Response) => {
  const slugAccount = req.params.slugAccount;

  const account = await Account.findOne({ slug: slugAccount }).select(
    "-password"
  );

  res.render("admin/pages/account/detail", {
    titlePage: account.fullName,
    account: account,
  });
};
