import mongoose, { Schema } from "mongoose";
import { IEquipment } from "../types/equipment.types";
import { VestSize } from "../constants/enums";

const equipmentSchema = new Schema<IEquipment>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  pricePerHour: { type: Number, required: true, min: 0 },
   vestSizes: {
      type: [String],
      enum: Object.values(VestSize),   
      required: true
    },
  availability: [
    {
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true }
    }
  ]
}, 
{ timestamps: true }
);

export default mongoose.model<IEquipment>("Equipment", equipmentSchema);