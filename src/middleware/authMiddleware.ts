import type { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";
import { adminRepository } from "../repositories/adminRepository";
import { AppError } from "../utils/AppError";

export const requireAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new AppError("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return next(new AppError("Invalid or expired token", 401));
    }

    const { data: admin, error: adminError } =
      await adminRepository.findByUserId(user.id);

    if (adminError) {
      return next(new AppError("Failed to verify admin access", 500));
    }

    if (!admin) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  } catch {
    next(new AppError("Unauthorized", 401));
  }
};
