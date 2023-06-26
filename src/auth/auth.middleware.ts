import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token is invalid",
    });
  }

  const tokenValue = token.split(" ")[1];

  const secret = process.env.JWT_SECRET || "ristek";
  try {
    const payload = jwt.verify(tokenValue, secret);

    req.body.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
export { authenticated };
