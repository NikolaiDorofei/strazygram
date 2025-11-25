// store/user.ts — пользователь, привязанный к Telegram
import React, { createContext, useContext } from 'react';
import { getInitDataUnsafe } from '../tg';

// user из Telegram.WebApp initDataUnsafe
const UserContext = createContext({
  user: {
    telegram_user_id: '',
    username: '',
    fullName: '',
    phone: '',
    email: ''
  }
});
export function useUser() {
  return useContext(UserContext);
}
export const UserProvider = ({ children }) => {
  // Получаем данные пользователя из Telegram при инициализации
  const tg = getInitDataUnsafe();
  const user = tg?.user || {};
  return (
    <UserContext.Provider value={{
      user: {
        telegram_user_id: user.id,
        username: user.username,
        fullName: (user.first_name || '') + ' ' + (user.last_name || ''),
        phone: '', // при необходимости можно хранить в localStorage или запросить
        email: ''
      }
    }}>
      {children}
    </UserContext.Provider>
  );
};
