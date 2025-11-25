// routes/categories.ts — отдаёт список категорий товаров
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = Router();

router.get('/', async (req, res) => {
  // Получить категории с типом товаров
  const categories = await prisma.category.findMany();
  res.json(categories);
});

export default router;
