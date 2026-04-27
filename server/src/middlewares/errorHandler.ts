import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

export const notFoundHandler = (req: Request, res: Response) => {
  return res.status(404).json({ message: "Rota não encontrada" });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: "Erro interno do servidor" });
};
