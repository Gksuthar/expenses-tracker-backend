import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI", ""),

  JWT_SECRET: getEnv("JWT_SECRET", "your-super-secret-jwt-key-change-in-production"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "7d"),

  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
  // Prefer including protocol for CORS; default to Vite dev URL
  // Note: FRONTEND_ORIGIN env, if set, will override this value.
  // Kept above for backwards compatibility; consider migrating to full URL in envs.
  // Comma-separated list of allowed origins for CORS; takes precedence when provided
  ALLOWED_ORIGINS: getEnv("ALLOWED_ORIGINS", "http://localhost:5173"),
  FRONTEND_GOOGLE_CALLBACK_URL: getEnv("FRONTEND_GOOGLE_CALLBACK_URL"),
});

export const config = appConfig();
