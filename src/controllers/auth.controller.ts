import { Request, Response } from "express";
import User from "../models/user.model";
import OTP from "../models/otp.model";
import { generateOTP } from "../utils/sendOtp";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail";

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Send OTP

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const otp = generateOTP();

    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    //  Send OTP via email
    await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP for login is: ${otp}`
    );

    res.json({ message: "OTP sent to your email" });

  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const otpRecord = await OTP.findOne({ email, otp });

  if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

  if (otpRecord.expiresAt < new Date()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const user = await User.findOneAndUpdate(
    { email },
    { isVerified: true },
    { new: true }
  );

  res.json({ message: "Login successful", user });
};