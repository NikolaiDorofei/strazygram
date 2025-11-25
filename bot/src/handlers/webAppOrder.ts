// Обрабатывает WEB_APP_DATA — заказ из Mini App, уведомляет администратора
import { Context } from "telegraf";

export async function handleWebAppOrder(ctx: Context, adminChatId) {
  try {
    // ctx.webAppData.data — JSON строки, присланные из фронта (это заказ)
    const order = JSON.parse(ctx.webAppData.data);

    // Формируем сообщение админу: детали заказа
    const adminMsg =
      `🛒 Новый заказ!\n\n` +
      `Номер: ${order.id || '(новый)'}\n` +
      `Сумма: ${order.total_price}\n` +
      `Доставка: ${order.delivery_type}\n` +
      `Оплата: ${order.payment_type}\n` +
      `Клиент: ${order.customer?.fullName} (${order.customer?.phone})\n` +
      `Город: ${order.city}\n` +
      (order.address ? `Адрес: ${order.address}\n` : '') +
      (order.pickup_point_id ? `ПВЗ: ${order.pickup_point_id}\n` : '') +
      (order.comment ? `Комментарий: ${order.comment}\n` : '') +
      `Товаров: ${order.items?.length || 0}`;

    // Отправляем сообщение в ADMIN_CHAT_ID (ID админского чата)
    await ctx.telegram.sendMessage(adminChatId, adminMsg);

    // Оповещаем пользователя
    ctx.reply("Ваш заказ отправлен! Менеджер свяжется с вами для подтверждения.");
  } catch (error) {
    ctx.reply("Ошибка при обработке заказа. Попробуйте ещё раз.");
  }
}
