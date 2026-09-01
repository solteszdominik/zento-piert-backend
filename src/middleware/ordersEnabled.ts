import type { NextFunction, Request, Response } from "express";

export const requireOrdersEnabled = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.ORDERS_ENABLED !== "true") {
    return res.status(503).json({
      message: "A rendelés jelenleg nem elérhető.",
    });
  }

  next();
};
