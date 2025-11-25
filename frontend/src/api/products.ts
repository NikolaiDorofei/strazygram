// API-запросы к backend для получения товаров
export async function getProducts({ category, search = '' }) {
  const res = await fetch(
    `/api/products?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}`
  );
  if (!res.ok) throw new Error('Ошибка загрузки товаров');
  return await res.json();
}
