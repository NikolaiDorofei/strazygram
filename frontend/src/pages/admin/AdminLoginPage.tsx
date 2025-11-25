// Страница входа в админку
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (!res.ok) return setError('Неверный пароль');
    // сохраняем токен в sessionStorage или cookie
    const { token } = await res.json();
    sessionStorage.setItem('adminToken', token);
    navigate('/admin/products');
  }

  return (
    <div>
      <h2>Вход в админ-панель</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
        <button type="submit" className="accent">Войти</button>
        {error && <div style={{color:"red"}}>{error}</div>}
      </form>
    </div>
  );
};
export default AdminLoginPage;
