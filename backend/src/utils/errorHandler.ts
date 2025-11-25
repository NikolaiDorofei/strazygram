// errorHandler — глобальный обработчик ошибок Express
// Добавляет единообразное сообщение об ошибке
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
}
