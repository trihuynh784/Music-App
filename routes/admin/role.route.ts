import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../../controllers/admin/role.controller";
import * as validate from "../../validates/admin/role.validate";

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", validate.createPost, controller.createPost);

router.patch("/delete/:slugRole", controller.deleteItem);

router.get("/permissions", controller.permissions);

router.patch("/permissions", controller.permissionsPatch);

router.get("/:slugRole", controller.detail);

export default router;
