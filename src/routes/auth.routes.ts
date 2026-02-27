import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller";

import { validateRequest } from "../middleware/validate.middleware";
import {
  signupValidator,
  loginValidator,
  sendOtpValidator,
  resetPasswordValidator
} from "../validators/auth.validator";

const router = express.Router();

router.post("/signup", signupValidator, validateRequest, signup);
router.post("/login", loginValidator, validateRequest, login);
router.post("/forgot-password", sendOtpValidator, validateRequest, forgotPassword);
router.post("/reset-password", resetPasswordValidator, validateRequest, resetPassword);

export default router;