// validateBody.ts — middleware для валидации тела запроса через Joi
import { Request, Response, NextFunction } from 'express';

export function validateBody(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // Возвращает ошибку 400 с описанием, какие данные не прошли валидацию
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}
