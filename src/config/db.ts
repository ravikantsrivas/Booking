import mongoose from "mongoose";
import { config } from "./appConfig";

export const connectDB = async () => {
  try {
    if (!config.mongoUri) throw new Error("MONGO_URI missing");

    await mongoose.connect(config.mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
};