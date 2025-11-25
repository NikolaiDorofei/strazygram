// App.tsx — главный компонент приложения
// Здесь подключается маршрутизация и обработка темы Telegram
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { getTelegramWebApp } from './tg';

const App = () => {
  useEffect(() => {
    const tg = getTelegramWebApp();
    // Считываем цвета темы Telegram и применяем к документу
    if (tg) {
      document.body.style.setProperty('background', tg.themeParams.bg_color ?? '#fff');
      document.body.style.setProperty('color', tg.themeParams.text_color ?? '#000');
    }
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
