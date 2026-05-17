import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

const authorizeRoles =
  (...roles: string[]) =>
  (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          "Access denied: insufficient permissions",
      });
    }

    next();
  };

export default authorizeRoles;