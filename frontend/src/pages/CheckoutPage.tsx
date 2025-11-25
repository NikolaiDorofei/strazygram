// Оформление заказа: форма с контактами, адресом, ПВЗ, доставкой и оплатой
import React, { useState } from 'react';
// Допустим useCart и useUser реализованы в store
import { useCart } from '../store/cart';
import { useUser } from '../store/user';
import { useNavigate } from 'react-router-dom';

const pickupPoints = [
  { id: 'pvz1', name: 'ПВЗ Центральный', city: 'Москва', address: 'ул. Примерная, 1', working_hours: '10:00-20:00' },
  { id: 'pvz2', name: 'ПВЗ Южный', city: 'Мытищи', address: 'ул. Южная, 24', working_hours: '9:00-18:00' }
];
// Пример выбора доставки/оплаты
const deliveryTypes = [
  { id: 'courier', name: 'Курьерская доставка' },
  { id: 'pickup', name: 'ПВЗ (например, СДЭК)' },
  { id: 'self', name: 'Самовывоз' }
];
const paymentTypes = [
  { id: 'online_yookassa', name: 'Онлайн (YooKassa)' },
  { id: 'online_stripe', name: 'Онлайн (Stripe)' },
  { id: 'cod', name: 'Оплата при получении' }
];

const CheckoutPage = () => {
  const { cart, total } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  // Форма заказа
  const [form, setForm] = useState({
    fullName: user.fullName || '',
    phone: user.phone || '',
    email: user.email || '',
    city: '',
    address: '',
    pickup_point_id: '',
    comment: '',
    delivery_type: 'courier',
    payment_type: 'cod'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Обновление полей формы
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  // Отправка заказа
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            telegram_user_id: user.telegram_user_id,
            fullName: form.fullName,
            phone: form.phone,
            email: form.email
          },
          city: form.city,
          address: form.address,
          pickup_point_id: form.pickup_point_id,
          comment: form.comment,
          delivery_type: form.delivery_type,
          payment_type: form.payment_type,
          items: cart.map(item => ({ product_id: item.id, quantity: item.qty }))
        })
      });
      if (!res.ok) throw new Error('Ошибка создания заказа');
      navigate('/profile'); // успех — перейти в профиль
    } catch (err) {
      setError('Ошибка оформления заказа. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Оформление заказа</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ФИО:</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>Телефон:</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>E-mail:</label>
          <input name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Город:</label>
          <input name="city" value={form.city} onChange={handleChange} required />
        </div>
        <div>
          <label>Адрес доставки:</label>
          <input name="address" value={form.address} onChange={handleChange} />
        </div>
        <div>
          <label>Пункт самовывоза (ПВЗ):</label>
          <select name="pickup_point_id" value={form.pickup_point_id} onChange={handleChange}>
            <option value="">-Не выбран-</option>
            {pickupPoints.map(p => (
              <option value={p.id} key={p.id}>{p.name} ({p.city}) — {p.address} ({p.working_hours})</option>
            ))}
          </select>
        </div>
        <div>
          <label>Комментарий:</label>
          <textarea name="comment" value={form.comment} onChange={handleChange} />
        </div>
        <div>
          <label>Способ доставки:</label>
          <select name="delivery_type" value={form.delivery_type} onChange={handleChange}>
            {deliveryTypes.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Способ оплаты:</label>
          <select name="payment_type" value={form.payment_type} onChange={handleChange}>
            {paymentTypes.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <b>Итого к оплате:</b> {total}
        </div>
        {error && <div style={{color:"red"}}>{error}</div>}
        <button type="submit" disabled={loading} className="accent">
          {loading ? "Отправка…" : "Подтвердить заказ"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
