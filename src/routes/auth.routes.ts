import express from "express";
import {
  signup,
  login,
  sendOtp,
  verifyOtp
} from "../controllers/auth.controller";

import { validateRequest } from "../middleware/validate.middleware";
import {
  signupValidator,
  loginValidator,
  sendOtpValidator,
  verifyOtpValidator
} from "../validators/auth.validator";

const router = express.Router();

router.post("/signup", signupValidator, validateRequest, signup);
router.post("/login", loginValidator, validateRequest, login);
router.post("/send-otp", sendOtpValidator, validateRequest, sendOtp);
router.post("/verify-otp", verifyOtpValidator, validateRequest, verifyOtp);

export default router;