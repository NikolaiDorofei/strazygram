// tg.ts — работа с Telegram.WebApp API (инициализация, mainButton и т.п.)
import React from 'react';

export function getTelegramWebApp() {
  // Проверяем доступность Telegram.WebApp
  return (window as any).Telegram?.WebApp;
}

export function getInitData() {
  const tg = getTelegramWebApp();
  if (!tg) return null;
  return tg.initData;
}

export function getInitDataUnsafe() {
  const tg = getTelegramWebApp();
  if (!tg) return null;
  return tg.initDataUnsafe;
}

// Хук для mainButton Telegram
export function useTelegramMainButton({ text, onClick, visible = true }) {
  const tg = getTelegramWebApp();

  React.useEffect(() => {
    if (!tg) return;
    tg.MainButton.setParams({ text });
    if (visible) tg.MainButton.show();
    else tg.MainButton.hide();
    const handler = () => onClick();
    tg.MainButton.onClick(handler);
    return () => {
      tg.MainButton.offClick(handler);
    };
  }, [text, onClick, visible, tg]);
}
