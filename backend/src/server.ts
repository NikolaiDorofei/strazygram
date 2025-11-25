// Главная точка входа backend: Express, middleware, роуты
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем все основные роуты API:
app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend сервер запущен на порту ${PORT}`);
});
import { errorHandler } from './utils/errorHandler';
// ...
app.use(errorHandler);
