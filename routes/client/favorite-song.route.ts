import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../../controllers/client/favorite-song.controller";
import * as authValidate from "../../validates/client/auth.validate";

router.get("/", authValidate.requireAuth, controller.index);

export default router;
