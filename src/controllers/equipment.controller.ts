import { Request, Response } from "express";
import Equipment from "../models/equipment.model";

export const createEquipment = async (req: Request, res: Response) => {
  const data = req.body;

  if (!data.name || !data.category || !data.pricePerHour) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const equipment = await Equipment.create(data);

  res.json(equipment);
};