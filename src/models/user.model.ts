import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.types";
import { UserRole } from "../constants/enums";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, minlength: 10, maxlength: 10 },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.User },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);