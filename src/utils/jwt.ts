import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

export interface JWTPayload {
  userId: string;
}

export const generateToken = (userId: string): string => {
  const payload: JWTPayload = { userId };
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.JWT_SECRET) as JWTPayload;
};
