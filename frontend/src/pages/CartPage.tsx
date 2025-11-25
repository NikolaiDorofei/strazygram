// Корзина — текущие товары, редактирование количества, итоговая сумма
import React from 'react';
// Предполагается наличие хука useCart (реализовать в store)

const CartPage = () => {
  // cart: массив товаров, total: общая сумма
  // Реализуй useCart либо через useContext или Redux store
  const { cart, total, changeQty, removeItem } = useCart();

  return (
    <div>
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <div>Ваша корзина пуста.</div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="productCard">
              <div>{item.name}</div>
              <div>Цена: {item.price} x {item.qty} шт = {item.price * item.qty}</div>
              <button onClick={() => changeQty(item.id, item.qty + 1)}>+</button>
              <button onClick={() => changeQty(item.id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
              <button onClick={() => removeItem(item.id)}>Удалить</button>
            </div>
          ))}
          <div>
            <b>Итого:</b> {total}
          </div>
          <a href="/checkout" className="accent">Перейти к оформлению</a>
        </>
      )}
    </div>
  );
};

export default CartPage;
