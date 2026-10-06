import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token não informado",
    });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({
      error: "Token inválido",
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