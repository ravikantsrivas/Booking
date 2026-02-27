import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import OTP from "../models/otp.model";
import { sendEmail } from "../lib/mailtrap";
import { UserRole } from "../constants/enums";
import { SALT_ROUNDS } from "../constants/constants";
import { generateOTP } from "../utils/sendOtp";
import { OTP_EXPIRY } from "../constants/constants";

// generate OTP
const otp = generateOTP();

//  SIGNUP 
export const signup = async (data: any) => {
  const { name, email, password, phone, role } = data;

  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");
  
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashed,
    phone,
    role: UserRole.User, // Default to user role
  });

  return { message: "Signup successful", user };
};

//  LOGIN 
export const login = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return { message: "Login successful", token };
};

//  SEND OTP 
export const sendOtp = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const otp = generateOTP();

  await OTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + OTP_EXPIRY),
  });

  await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);

  return { message: "OTP sent to email" };
};

//  VERIFY OTP 
export const verifyOtp = async (email: string, otp: string) => {
  const record = await OTP.findOne({ email, otp });

  if (!record) throw new Error("Invalid OTP");

  if (record.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  return { message: "OTP verified successfully" };
};

//  FORGOT PASSWORD 
export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const otp = generateOTP();

  await OTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + OTP_EXPIRY),
  });

  await sendEmail(email, "Reset Password OTP", `Your OTP is ${otp}`);

  return { message: "OTP sent to email" };
};

//  RESET PASSWORD 
export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const record = await OTP.findOne({ email, otp });

  if (!record) {
    throw new Error("Invalid OTP");
  }

  if (record.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  user.password = hashedPassword;
  await user.save();

  await OTP.deleteOne({ email });

  return { message: "Password reset successful" };
};