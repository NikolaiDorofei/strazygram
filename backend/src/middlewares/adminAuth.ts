// adminAuth.ts — middleware проверки admin-токена
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Нет токена авторизации' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Токен отсутствует' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === 'object' && payload.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Нет доступа' });
    }
  } catch {
    res.status(401).json({ error: 'Неверный токен' });
  }
}
