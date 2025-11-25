// Страница "Профиль / Мои заказы"
import React, { useEffect, useState } from 'react';
import { useUser } from '../store/user';

const ProfilePage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Получаем заказы пользователя по telegram_user_id
    fetch(`/api/orders/my?telegram_user_id=${user.telegram_user_id}`)
      .then(r => r.json())
      .then(setOrders);
  }, [user]);

  return (
    <div>
      <h2>Мои заказы</h2>
      {orders.length === 0
        ? <div>У вас пока нет заказов.</div>
        : orders.map(order => (
          <div key={order.id} style={{marginBottom:16, border:"1px solid #FFD700", borderRadius:8, padding:8}}>
            <div>Заказ № {order.id}</div>
            <div>Статус: {order.status}</div>
            <div>Сумма: {order.total_price} {order.currency}</div>
            <div>Доставка: {order.delivery_type}, {order.city} {order.address}</div>
            <div>ПВЗ: {order.pickup_point?.name}</div>
            <div>Комментарий: {order.comment}</div>
            <div>Создан: {order.created_at}</div>
            <div>
              Состав заказа:
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.product.name} — {item.quantity} × {item.price} = {item.subtotal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfilePage;
