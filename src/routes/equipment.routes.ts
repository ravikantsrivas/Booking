import express from "express";
import { createEquipment } from "../controllers/equipment.controller";
import { authenticate, isAdmin } from "../middleware/auth.middleware";
import { equipmentValidator } from "../validators/equipment.validator";
import { validateRequest } from "../middleware/validate.middleware";

const router = express.Router();

router.post(
  "/equipment",
  authenticate,      //  verify token first
  isAdmin,           //  then check role
  equipmentValidator, //  validate body
  validateRequest,    //  return validation errors if any
  createEquipment     //  controller
);

export default router;