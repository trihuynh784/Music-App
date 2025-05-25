import express, { Router } from "express";
const router: Router = express.Router();

import multer from "multer";
const upload = multer();

import * as controller from "../../controllers/admin/topic.controller";
import * as validate from "../../validates/admin/topic.validate";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";

router.get("/", controller.index);

router.patch("/change-status/:status/:slugTopic", controller.changeStatus);

router.patch("/delete/:slugTopic", controller.deleteItem);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadSingle,
  validate.createPost,
  controller.createPost
);

export default router;
