import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../../controllers/admin/account.controller";
import * as validate from "../../validates/admin/account.validate";

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", validate.createPost, controller.createPost);

router.get("/:slugAccount", controller.detail);

export default router;
