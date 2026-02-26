import express from "express";
import { createCategory } from "../controllers/category.controller";
import { authenticate, isAdmin } from "../middleware/auth.middleware";
import { categoryValidator } from "../validators/category.validator";
import { validateRequest } from "../middleware/validate.middleware";

const router = express.Router();

router.post(
  "/category",
  authenticate,
  isAdmin,
  categoryValidator,
  validateRequest,
  createCategory
);

export default router;