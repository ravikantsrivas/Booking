import express from "express";
import { createEquipment } from "../controllers/equipment.controller";
import { isAdmin } from "../middleware/auth.middleware";
import { equipmentValidator } from "../validators/equipment.validator";
import { validateRequest } from "../middleware/validate.middleware";

const router = express.Router();

router.post(
  "/",
  isAdmin,
  equipmentValidator,
  validateRequest,
  createEquipment
);

export default router;