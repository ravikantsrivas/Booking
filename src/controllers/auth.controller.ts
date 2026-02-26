import { Request, Response } from "express";
import * as AuthService from "../service/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const data = await AuthService.signup(req.body);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await AuthService.login(req.body);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.sendOtp(req.body.email);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.verifyOtp(req.body.email, req.body.otp);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.forgotPassword(req.body.email);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.resetPassword(
      req.body.email,
      req.body.otp,
      req.body.newPassword
    );
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};