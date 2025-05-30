import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../../controllers/admin/auth.controller";
import * as validate from "../../validates/admin/auth.validate";

router.get("/", validate.checkLogin, controller.login);

router.post("/", validate.loginPost, controller.loginPost);

router.get("/logout", controller.logout);

export default router;
