import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { config } from "../config/app.config";
import { registerSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { registerUserService } from "../services/auth.service";
import { generateToken } from "../utils/jwt";
import passport from "passport";

export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    
    if (!user || !user._id) {
      return res.redirect(
        `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
      );
    }

    // Generate JWT token for Google OAuth user
    const token = generateToken(user._id.toString());
    const currentWorkspace = user.currentWorkspace;

    // Redirect with token in URL (frontend will extract and store it)
    return res.redirect(
      `${config.FRONTEND_GOOGLE_CALLBACK_URL}?token=${token}&workspace=${currentWorkspace}&status=success`
    );
  }
);

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });
    console.log("Registering user with data:", body);
    
    // Register user and get userId
    const { userId } = await registerUserService(body as any);

    // Generate JWT token
    const token = generateToken(userId.toString());

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
      token,
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Use existing verifyUserService from auth.service
    const user = await require("../services/auth.service").verifyUserService({
      email,
      password,
    });

    // Generate JWT token
    const token = generateToken(user._id.toString());

    return res.status(HTTPSTATUS.OK).json({
      message: "Logged in successfully",
      token,
      user,
    });
  }
);

export const logOutController = asyncHandler(
  async (req: Request, res: Response) => {
    // With JWT, logout is handled client-side by removing the token
    // No server-side session to destroy
    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "Logged out successfully" });
  }
);
