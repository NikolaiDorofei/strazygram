export function handleStart(ctx, webAppUrl) {
    ctx.reply("Добро пожаловать в магазин StrazyGram!\n" +
        "Чтобы начать покупки, откройте мини-приложение:", {
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
    });
}
