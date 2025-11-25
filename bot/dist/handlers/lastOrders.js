import fetch from "node-fetch";
export async function handleLastOrders(ctx, adminChatId) {
    if (String(ctx.chat?.id) !== adminChatId)
        return; // Только для админ-чата!
    try {
        const resp = await fetch(`${process.env.BACKEND_API_URL}/api/admin/orders`, {
            headers: { Authorization: "Bearer admin-token" } // можно вставить фейковый токен для теста
        });
        const orders = await resp.json();
        if (!orders || orders.length === 0)
            return ctx.reply("Заказы не найдены.");
        let msg = "Последние заказы:\n\n";
        orders.slice(0, 5).forEach(order => {
            msg += `#${order.id} — сумма: ${order.total_price} (${order.status})\n`;
        });
        ctx.reply(msg);
    }
    catch (e) {
        ctx.reply("Ошибка при загрузке заказов.");
    }
}
