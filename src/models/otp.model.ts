import mongoose, { Schema } from "mongoose";
import { IOTP } from "../types/otp.types";

const otpSchema = new Schema<IOTP>(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOTP>("OTP", otpSchema);