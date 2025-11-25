# Backend StrazyGram

Node.js + Express + Prisma (PostgreSQL) — REST API для магазина страз и тканей.

- `/api/categories` — список категорий
- `/api/products` — каталог товаров (фильтры, поиск)
- `/api/orders` — оформление заказа
- `/api/admin/*` — админка (защищено токеном)

## Запуск

- Заполнить .env (пример — .env.example)
- `npm install`
- `npx prisma migrate dev`
- `npm run dev`
