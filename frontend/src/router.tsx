// router.tsx — маршрутизация между страницами приложения
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import ProductCardPage from './pages/ProductCardPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';

const Router = () => (
  <Routes>
    <Route path="/" element={<CategoriesPage />} />
    <Route path="/category/:id" element={<ProductsPage />} />
    <Route path="/product/:id" element={<ProductCardPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    {/* admin routes */}
    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route path="/admin/products" element={<AdminProductsPage />} />
    <Route path="/admin/orders" element={<AdminOrdersPage />} />
  </Routes>
);

export default Router;
