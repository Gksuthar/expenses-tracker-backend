import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";
import { verifyToken } from "../utils/jwt";
import User from "../models/user.model";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Unauthorized. Please log in.");
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    const user = await User.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedException("User not found.");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new UnauthorizedException("Invalid or expired token.");
  }
};

export default isAuthenticated;
