// Управление заказами — список и детали
import React, { useEffect, useState } from 'react';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch('/api/admin/orders', {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('adminToken') }
    })
      .then(r => r.json())
      .then(setOrders);
  }, []);
  return (
    <div>
      <h2>Управление заказами</h2>
      {orders.map(order => (
        <div key={order.id} style={{marginBottom:12, border:"1px solid #FFD700", borderRadius:8, padding:8}}>
          <div>Заказ № {order.id}</div>
          <div>Статус: {order.status}</div>
          <div>Клиент: {order.customer.fullName}, {order.customer.phone}, {order.customer.email}</div>
          <div>Доставка: {order.delivery_type}, {order.city} {order.address}</div>
          <div>ПВЗ: {order.pickup_point?.name}</div>
          <div>Комментарий: {order.comment}</div>
          <div>Состав:
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.product.name} — {item.quantity} × {item.price} = {item.subtotal}</li>
              ))}
            </ul>
          </div>
          {/* Форма смены статуса, комментария */}
        </div>
      ))}
    </div>
  );
};

export default AdminOrdersPage;
