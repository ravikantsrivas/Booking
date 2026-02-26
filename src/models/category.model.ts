import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/category.types";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", categorySchema);