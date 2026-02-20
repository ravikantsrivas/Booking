import mongoose, { Schema, Document } from "mongoose";

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
  }[];
}

const EquipmentSchema = new Schema<IEquipment>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  pricePerHour: { type: Number, required: true, min: 0 },
  vestSizes: {
    type: [String],
    enum: ["S", "M", "L", "XL"],
    required: true
  },
  availability: [
    {
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true }
    }
  ]
});

export default mongoose.model<IEquipment>("Equipment", EquipmentSchema);