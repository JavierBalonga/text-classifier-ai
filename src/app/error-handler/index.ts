import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ServerError from "../utils/ServerError";

export default function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ServerError) {
    return res.status(err.status).json({
      status: "error",
      message: err.message,
      data: err.data,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      data: err.issues,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      status: "error",
      message: err.message,
      data: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
    data: String(err),
  });
}
