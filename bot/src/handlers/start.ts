// Обработчик /start — приветствие и кнопка открытия Mini App магазина
import { Context } from "telegraf";

export function handleStart(ctx: Context, webAppUrl: string) {
  ctx.reply(
    "Добро пожаловать в магазин StrazyGram!\n" + 
    "Чтобы начать покупки, откройте мини-приложение:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Открыть магазин",
              web_app: { url: webAppUrl }
            }
          ]
        ]
      }
    }
  );
}
