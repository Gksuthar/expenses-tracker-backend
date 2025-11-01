import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { BadRequestException } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/error-code.enum";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import workspaceRoutes from "./routes/workspace.route";
import memberRoutes from "./routes/member.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";
import expenseRoutes from "./routes/expense.route";
import chatRoutes from "./routes/chat.route";
import siteUpdateRoutes from "./routes/site-update.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

// Build allowed origins list from env (supports comma-separated list)
const allowedOrigins = [
  config.ALLOWED_ORIGINS, // comma-separated list
  config.FRONTEND_ORIGIN || "http://localhost:5173",
]
  .join(",")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// CORS must be first to handle preflight requests
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // allow REST tools or same-origin requests with no Origin header
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // JWT only; no cookies/sessions
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Explicitly handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(HTTPSTATUS.OK).json({
      message: "Backend API is running",
      environment: config.NODE_ENV,
      corsOrigins: allowedOrigins,
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/project`, isAuthenticated, projectRoutes);
app.use(`${BASE_PATH}/task`, isAuthenticated, taskRoutes);
app.use(`${BASE_PATH}/expense`, isAuthenticated, expenseRoutes);
app.use(`${BASE_PATH}/chat`, isAuthenticated, chatRoutes);
app.use(`${BASE_PATH}/site-update`, isAuthenticated, siteUpdateRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
