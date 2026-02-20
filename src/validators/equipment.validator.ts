import { body } from "express-validator";

export const equipmentValidator = [
  body("name").notEmpty().withMessage("Equipment name is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("category")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),

  body("pricePerHour")
    .notEmpty()
    .withMessage("Price per hour is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("vestSizes")
    .isArray({ min: 1 })
    .withMessage("Vest sizes must be an array"),

  body("vestSizes.*")
    .isIn(["S", "M", "L", "XL"])
    .withMessage("Vest size must be S, M, L, XL"),

  body("availability")
    .isArray({ min: 1 })
    .withMessage("Availability must be an array"),

  body("availability.*.date")
    .isISO8601()
    .withMessage("Date must be valid YYYY-MM-DD"),

  body("availability.*.startTime")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Start time must be HH:mm"),

  body("availability.*.endTime")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("End time must be HH:mm")
];