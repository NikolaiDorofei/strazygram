// store/cart.ts — простая реализация корзины через Context + localStorage
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({
  cart: [],
  total: 0,
  addItem: (prod, qty) => {},
  changeQty: (id, qty) => {},
  removeItem: (id) => {},
  clear: () => {}
});

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // Загружаем корзину при старте из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  // total
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  function addItem(prod, qty = 1) {
    setCart(c => {
      const ix = c.findIndex(i => i.id === prod.id);
      if (ix >= 0)
        c[ix].qty += qty;
      else
        c.push({ ...prod, qty });
      return [...c];
    });
  }
  function changeQty(id, qty) {
    setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  }
  function removeItem(id) {
    setCart(c => c.filter(i => i.id !== id));
  }
  function clear() {
    setCart([]);
  }
  return (
    <CartContext.Provider value={{ cart, total, addItem, changeQty, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
};
