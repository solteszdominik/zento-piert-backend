import type { Request, Response, NextFunction } from "express";

export const asyncHandler =
  <
    P = {},
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = unknown
  >(
    handler: (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response,
      next: NextFunction,
    ) => Promise<void>,
  ) =>
  (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };