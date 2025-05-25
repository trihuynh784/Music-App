import express, { Router } from "express";
const router: Router = express.Router();

import multer from "multer";
const upload = multer();

import * as controller from "../../controllers/admin/song.controller";
import * as validate from "../../validates/admin/song.validate";
import { uploadFields } from "../../middlewares/admin/uploadCloud.middleware";

router.get("/", controller.index);

router.patch("/change-status/:status/:slugSong", controller.changeStatus);

router.patch("/delete/:slugSong", controller.deleteRecord);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadFields,
  validate.createPost,
  controller.createPost
);

router.get("/edit/:slugSong", controller.edit);

router.patch(
  "/edit/:slugSong",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadFields,
  validate.editPatch,
  controller.editPatch
);

export default router;
