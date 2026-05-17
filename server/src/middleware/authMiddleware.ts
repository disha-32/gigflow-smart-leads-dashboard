import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

const protect = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  const authHeader =
    req.headers.authorization;

  if (
    authHeader &&
    authHeader.startsWith("Bearer")
  ) {
    try {
      token = authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      );

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

export default protect;