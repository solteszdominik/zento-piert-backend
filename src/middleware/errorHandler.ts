import type { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/AppError";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  // A felhasználónak nem mutatjuk,
  // de a szerver logjában látni akarjuk.
  console.error("Unhandled server error:", error);

  return res.status(500).json({
    message: "Internal server error",
  });
};
