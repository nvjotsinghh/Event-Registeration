import cors from "cors";

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000"];

export const corsConfig = cors({
  // Only allow specific origins, not wildcard
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy: origin ${origin} not allowed`));
  },

  // Only allow necessary HTTP methods
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

  // Allow specific headers only
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],

  // Expose these headers to the client
  exposedHeaders: ["X-Total-Count"],

  // Do not allow credentials for public API
  credentials: false,

  // Cache preflight response for 24 hours
  maxAge: 86400,
});