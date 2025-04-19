import cors from "cors";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default corsOptions;
