// routes/orders.ts — создание заказа, список заказов пользователя
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = Router();

// Оформление нового заказа
router.post('/', async (req, res) => {
  // Валидация примитивная — лучше сделать через Joi/Zod
  try {
    const {
      customer,
      city,
      address,
      pickup_point_id,
      comment,
      delivery_type,
      payment_type,
      items
    } = req.body;

    // Находим/создаём покупателя по telegram_user_id
    let dbCustomer = await prisma.customer.findUnique({
      where: { telegram_user_id: customer.telegram_user_id }
    });
    if (!dbCustomer) {
      dbCustomer = await prisma.customer.create({
        data: {
          telegram_user_id: customer.telegram_user_id,
          username: customer.username,
          first_name: customer.fullName?.split(' ')[0] ?? '',
          last_name: customer.fullName?.split(' ')[1] ?? '',
          phone: customer.phone,
          email: customer.email
        }
      });
    }

    // Считаем сумму заказа
    let total_price = 0;
    const orderItemsData = [];
    for (const item of items) {
      const prod = await prisma.product.findUnique({ where: { id: item.product_id } });
      if (!prod) continue;
      const subtotal = prod.price * item.quantity;
      total_price += subtotal;
      orderItemsData.push({
        productId: prod.id,
        quantity: item.quantity,
        price: prod.price,
        subtotal
      });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerId: dbCustomer.id,
        total_price,
        delivery_type,
        payment_type,
        city,
        address,
        pickup_pointId: pickup_point_id || null,
        comment,
        orderItems: {
          create: orderItemsData
        }
      },
      include: {
        orderItems: true
      }
    });

    res.json(newOrder);
  } catch (error) {
    res.status(400).json({ error: "Ошибка оформления заказа" });
  }
});

// Список заказов текущего пользователя (по telegram_user_id)
router.get('/my', async (req, res) => {
  const { telegram_user_id } = req.query;
  if (!telegram_user_id) return res.status(400).json({ error: "Нет telegram_user_id" });
  const customer = await prisma.customer.findUnique({ where: { telegram_user_id: String(telegram_user_id) } });
  if (!customer) return res.json([]);
  const orders = await prisma.order.findMany({
    where: { customerId: customer.id },
    include: {
      orderItems: {
        include: { product: true }
      },
      pickup_point: true
    }
  });
  res.json(orders);
});

export default router;
