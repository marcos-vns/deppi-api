import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.accessToken ?? req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Token não encontrado",
    });
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as { sub: string };

  req.user = {
    id: decoded.sub,
  };

  next();
}