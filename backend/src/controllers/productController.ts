// productController.ts — бизнес-логика работы с товарами
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** Получить список товаров с фильтрами */
export async function listProducts(filters: any) {
  return prisma.product.findMany({ where: filters });
}

/** Получить товар по ID */
export async function getProduct(id: number) {
  return prisma.product.findUnique({ where: { id } });
}

/** Добавить товар */
export async function createProduct(data) {
  return prisma.product.create({ data });
}

/** Обновить товар */
export async function updateProduct(id: number, update) {
  return prisma.product.update({ where: { id }, data: update });
}

/** Удалить товар */
export async function deleteProduct(id: number) {
  return prisma.product.delete({ where: { id } });
}
