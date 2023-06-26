import express from "express";
import { Request, Response } from "express";
import { validateDto } from "../common/common.validator";
import { LoginSchema, RegisterSchema } from "./auth.validation";
import { UserLoginDto, UserRegisterDto } from "./auth.dto";
import authService from "./auth.service";

const router = express.Router();

router.post(
  "/register",
  validateDto(RegisterSchema),
  async (req: Request, res: Response) => {
    const { email, full_name, password } = req.body as UserRegisterDto;
    const result = await authService.registerUser({
      email,
      password,
      full_name,
    });

    if (result === "User already exists") {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    return res.json({
      token: result,
    });
  }
);

router.post(
  "/login",
  validateDto(LoginSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body as UserLoginDto;

    const token = await authService.loginUser({ email, password });

    if (!token) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    return res.json({
      token,
    });
  }
);

export { router };
