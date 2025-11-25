// backend/src/routes/admin.ts — эндпоинты админ-панели магазина
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { adminAuthMiddleware } from "../middlewares/adminAuth";

// Импортируем middleware для валидации и схему товара (см. ниже куда положить productSchema)
import { validateBody } from '../middlewares/validateBody';
import { productSchema } from '../models/validation/productSchema';

const prisma = new PrismaClient();
const router = Router();

/**
 * Авторизация в админку: POST /api/admin/login
 * Получение токена по паролю из .env
 */
router.post("/login", async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Нет пароля" });
  if (password !== process.env.ADMIN_PASSWORD)
    return res.status(403).json({ error: "Неверный пароль" });

  // Генерируем JWT-токен для доступа к админ-эндпоинтам
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, { expiresIn: "1d" });
  res.json({ token });
});

/**
 * Все эндпоинты ниже защищены авторизацией через JWT-токен
 */
router.use(adminAuthMiddleware);

/**
 * CRUD товары (create, read, update, delete)
 */
router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Пример: добавление товара с валидацией через Joi
router.post("/products", validateBody(productSchema), async (req, res) => {
  try {
    const product = await prisma.product.create({ data: req.body });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Ошибка добавления товара" });
  }
});

router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Ошибка обновления товара" });
  }
});

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Ошибка удаления товара" });
  }
});

/**
 * Заказы: получить все/по статусу, детали, обновить статус или комментарий
 */
router.get("/orders", async (req, res) => {
  const { status } = req.query;
  const where = status ? { status: String(status) } : {};
  const orders = await prisma.order.findMany({
    where,
    include: {
      customer: true,
      orderItems: { include: { product: true } },
      pickup_point: true,
    },
  });
  res.json(orders);
});

router.get("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: {
      customer: true,
      orderItems: { include: { product: true } },
      pickup_point: true,
    },
  });
  if (!order) return res.status(404).json({ error: "Заказ не найден" });
  res.json(order);
});

router.patch("/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: "Ошибка обновления заказа" });
  }
});

/**
 * Пункты самовывоза (ПВЗ): получить все, добавить новый
 */
router.get("/pickup-points", async (req, res) => {
  const points = await prisma.pickupPoint.findMany();
  res.json(points);
});
router.post("/pickup-points", async (req, res) => {
  try {
    const point = await prisma.pickupPoint.create({ data: req.body });
    res.json(point);
  } catch (error) {
    res.status(400).json({ error: "Ошибка добавления ПВЗ" });
  }
});

export default router;
