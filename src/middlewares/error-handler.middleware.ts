import { logEvents } from "./logger.middleware";
import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logEvents(
    `${error.name}: ${error.message}\t${request.method}\t${request.url}\t${request.headers?.origin}`,
    "error.log"
  );
  response.status;
  response.status(request.statusCode || 500);
  response.json({ message: error.message, isError: true });
};

export { errorHandlerMiddleware as errorHandler };
