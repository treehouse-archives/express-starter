import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "./config/cors-options";
import connectDB from "./config/connect-db";

const app = express();
const PORT = process.env.PORT || 5000;

import { errorHandler } from "./middlewares/error-handler.middleware";
import { logEvents, logger } from "./middlewares/logger.middleware";
import path from "node:path";

// routes
import indexRoutes from "./routes/index.route";

// connect to MongoDB
connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// views & static files
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "..", "public", "views"));
app.use("/", express.static(path.join(__dirname, "..", "public")));

// routes
app.use("/", indexRoutes);

// catch 404 and forward to error handler
app.all("/*splat", (request: Request, response: Response) => {
  response.status(404);
  if (request.accepts("html")) {
    return response.render("404");
  } else if (request.accepts("json")) {
    response.json({ message: "Resource not found" });
    return;
  } else {
    response.type("text").send("Resource not found. Please check the URL.");
    return;
  }
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

// connect to mongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB.");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});

// if any connection error occurs
mongoose.connection.on("error", (err) => {
  console.error(err.message);
  logEvents(err.message, "mongo-error.log");
});
