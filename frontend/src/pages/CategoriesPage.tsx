// Выводит список категорий товаров магазина
import React from 'react';
import { Link } from 'react-router-dom';
const categories = [
  { id: 'cold_fix', name: 'Стразы холодной фиксации' },
  { id: 'hot_fix', name: 'Стразы горячей фиксации' },
  { id: 'sew_on', name: 'Пришивные стразы' },
  { id: 'biflex', name: 'Бифлекс' },
  { id: 'velvet', name: 'Бархат' },
  { id: 'eurotulle', name: 'Еврофатин' },
];

const CategoriesPage = () => (
  <div className="categories">
    <h1>Категории</h1>
    <div className="grid">
      {categories.map(cat => (
        <Link
          to={`/category/${cat.id}`}
          key={cat.id}
          className="categoryTile"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  </div>
);

export default CategoriesPage;
