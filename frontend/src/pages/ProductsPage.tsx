// Каталог товаров с фильтрами, поиском и списком мини-карточек
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../api/products';

const ProductsPage = () => {
  const { id: categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  // Добавь дополнительные фильтры по необходимости
  useEffect(() => {
    getProducts({ category: categoryId, search }).then(setProducts);
  }, [categoryId, search]);
  return (
    <div>
      <h2>Товары категории</h2>
      <input
        type="text"
        placeholder="Поиск по названию, артикулу"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <div className="productList">
        {products.map(prod => (
          <div className="productCard" key={prod.id}>
            <img src={prod.images[0]} alt={prod.name} />
            <div>{prod.name}</div>
            <div>{prod.price} {prod.currency}</div>
            <div>{prod.color}, {prod.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
