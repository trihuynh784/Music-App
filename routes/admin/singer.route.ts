import express, { Router } from "express";
const router: Router = express.Router();

import multer from "multer";
const upload = multer();

import * as controller from "../../controllers/admin/singer.controller";
import * as validate from "../../validates/admin/singer.validate";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadSingle,
  validate.createPost,
  controller.createPost
);

router.get("/:slugSinger", controller.detail);

export default router;
