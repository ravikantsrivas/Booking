import { body } from "express-validator";

export const signupValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone must be 10 digits"),

  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),


  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be user or admin")
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required")
];

export const sendOtpValidator = [
  body("email").isEmail().withMessage("Valid email required")
];

export const verifyOtpValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("otp")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
];