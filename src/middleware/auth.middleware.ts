import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../constants/enums";

// Extend Request type
export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ADMIN MIDDLEWARE
export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== UserRole.Admin) {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};