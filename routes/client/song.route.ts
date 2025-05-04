import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../../controllers/client/song.controller";
import * as authValidate from "../../validates/client/auth.validate";

router.get("/:slug", controller.list);

router.get("/detail/:slug", controller.songDetail);

router.patch(
  "/:type/:status/:slugSong",
  authValidate.requireAuthJson,
  controller.like
);

router.patch("/listen/:songSlug", controller.listen);

export default router;
