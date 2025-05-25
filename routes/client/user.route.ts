import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/user.controller";
import * as validate from "../../validates/client/user.validate";

router.get("/login", controller.login);

router.post("/login", validate.loginPost, controller.loginPost);

router.get("/signup", controller.signup);

router.post("/signup", validate.signupPost, controller.signupPost);

router.get("/signup/otp/:id", controller.signupOtp);

router.post("/signup/otp/:id", validate.signupOtpPost, controller.signupOtpPost);

export default router;
