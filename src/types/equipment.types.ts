import { Document, Types } from "mongoose";
import mongoose from "mongoose";

export interface IEquipment extends Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  pricePerHour: number;
  vestSizes: string[];
  availability: {
    date: string;
    startTime: string;
    endTime: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}