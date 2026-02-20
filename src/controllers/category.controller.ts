import { Request, Response } from "express";
import Category from "../models/category.model";

export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const category = await Category.create({ name, description });

  res.json(category);
};