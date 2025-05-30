import { Request, Response } from "express";
import Role from "../../models/role.model";
import { pagination } from "../../helpers/pagination";
import { sort } from "../../helpers/sort";
import { systemConfig } from "../../config/system";

interface Pagination {
  currentPage: number;
  limitRecords: number;
  countRecords?: number;
  skip?: number;
  totalPage?: number;
}

// [GET] /admin/roles/
export const index = async (req: Request, res: Response) => {
  let find = {
    deleted: false,
  };

  // Sort
  const objectSort = sort(req.query);
  // End Sort

  // Pagination
  let objectPagination: Pagination = {
    currentPage: 1,
    limitRecords: 5,
  };
  const totalRecords = await Role.countDocuments(find);
  objectPagination = pagination(req.query, objectPagination, totalRecords);
  // End Pagination

  const roles = await Role.find(find)
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
};

// [GET] /admin/roles/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/role/create", {
    titlePage: "Tạo mới quyền",
  });
};

// [GET] /admin/roles/create
export const createPost = async (req: Request, res: Response) => {
  try {
    const dataRole = {
      title: req.body.title,
      description: req.body.description,
    };

    const role = new Role(dataRole);
    await role.save();

    req.flash("success", "Tạo mới quyền thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    req.flash("error", "Tạo mới quyền thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH] /admin/delete/:slugRole
export const deleteItem = async (req: Request, res: Response) => {
  try {
    await Role.updateOne({ slug: req.params.slugRole }, { deleted: true });

    req.flash("success", "Xóa nhóm quyền thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    req.flash("error", "Xóa nhóm quyền thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
};

// [GET] /admin/roles/permission
export const permissions = async (req: Request, res: Response) => {
  const roles = await Role.find({ deleted: false }).select("id title permissions");

  res.render("admin/pages/role/permission", {
    titlePage: "Phân quyền",
    records: roles,
  });
};

// [PATCH] /admin/roles/permission
export const permissionsPatch = async (req: Request, res: Response) => {
  try {
    const permissions = JSON.parse(req.body.permissions);

    permissions.forEach(
      async (permission: Record<string, any>): Promise<any> => {
        await Role.updateOne(
          { _id: permission.id },
          { permissions: permission.permissions }
        );
      }
    );

    req.flash("success", "Cập nhật phân quyền thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles/permissions`);
  } catch (error) {
    req.flash("success", "Cập nhật phân quyền thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles/permissions`);
  }
};

// [GET] /admin/roles/:slugRole
export const detail = async (req: Request, res: Response) => {
  const slugRole = req.params.slugRole;

  const role = await Role.findOne({ slug: slugRole });

  res.render("admin/pages/role/detail", {
    titlePage: role.title,
    role: role,
  });
};
