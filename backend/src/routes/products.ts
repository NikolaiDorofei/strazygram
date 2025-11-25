// routes/products.ts — каталог товаров с фильтрами/поиском
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = Router();

// Получить список товаров с фильтрацией по query-параметрам
router.get('/', async (req, res) => {
  const {
    category,
    search
  } = req.query;

  // Примитивный фильтр/поиск
  const where: any = {};
  if (category) where.category = { name: String(category) };
  if (search) where.OR = [
    { name: { contains: String(search), mode: "insensitive" } },
    { vendorCode: { contains: String(search), mode: "insensitive" } }
  ];
  const products = await prisma.product.findMany({ where });
  res.json(products);
});

// Карточка товара по id
router.get('/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!product) return res.status(404).json({ error: "Товар не найден" });
  res.json(product);
});

export default router;
