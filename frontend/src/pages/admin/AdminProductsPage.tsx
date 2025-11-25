// Управление товарами — список, добавление, редактирование
import React, { useEffect, useState } from 'react';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  // ...стейт для формы добавления/редактирования
  useEffect(() => {
    fetch('/api/admin/products', {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('adminToken') }
    })
      .then(r => r.json())
      .then(setProducts);
  }, []);

  // формы добавления/редактирования — по желанию полноценно реализовать
  return (
    <div>
      <h2>Управление товарами</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Наличие</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{prod.price}</td>
                <td>{prod.inStock}</td>
                <td>
                  <button>Редактировать</button>
                  <button>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Реализовать форму добавления/редактирования товара здесь */}
      </div>
    </div>
  );
};

export default AdminProductsPage;
