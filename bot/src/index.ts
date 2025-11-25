// Главный файл Telegram-бота StrazyGram
import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { handleWebAppOrder } from "./handlers/webAppOrder.js";
import { handleStart } from "./handlers/start.js";
import { handleLastOrders } from "./handlers/lastOrders.js";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN!;
const WEBAPP_URL = process.env.WEBAPP_URL!;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID!;

const bot = new Telegraf(BOT_TOKEN);

// Обработка команды /start
bot.start(ctx => handleStart(ctx, WEBAPP_URL));

// Обработка события WebAppData — приходит при оформлении заказа из Mini App
bot.on('web_app_data', ctx => handleWebAppOrder(ctx, ADMIN_CHAT_ID));

// (Пример: обработка команды /last_orders только для админа)
bot.command('last_orders', ctx => handleLastOrders(ctx, ADMIN_CHAT_ID));

// Можно добавить обработку других команд (например, /orders для пользователя)
// ...

bot.launch();

console.log("StrazyGram Telegram-бот запущен");
