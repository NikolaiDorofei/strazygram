// Страница товара (карточка товара)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductCardPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(`/api/products/${id}`).then(r => r.json()).then(setProduct);
  }, [id]);

  if (!product) return <div>Загрузка…</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <div className="gallery">
        {product.images.map((url, idx) => (
          <img key={idx} src={url} alt={product.name} style={{ maxWidth: 180, margin: 5 }} />
        ))}
      </div>
      <div>
        <b>Цена:</b> {product.price} {product.currency}
      </div>
      <div>
        <b>Описание:</b> {product.description}
      </div>
      <div>
        <b>Характеристики:</b>
        <ul>
          <li>Артикул: {product.vendorCode}</li>
          <li>Материал: {product.material}</li>
          <li>Цвет: {product.color}</li>
          <li>Размер: {product.size}</li>
          {product.shape && <li>Форма: {product.shape}</li>}
        </ul>
      </div>
      <button className="accent">Добавить в корзину</button>
    </div>
  );
};

export default ProductCardPage;
