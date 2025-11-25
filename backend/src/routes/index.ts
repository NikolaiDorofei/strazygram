// routes/index.ts — собирает роутеры
import { Router } from 'express';
import productsRouter from './products';
import categoriesRouter from './categories';
import ordersRouter from './orders';
import adminRouter from './admin';

const router = Router();
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/orders', ordersRouter);
router.use('/admin', adminRouter);

export default router;
