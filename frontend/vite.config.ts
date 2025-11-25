// Vite config — можно добавить настройки сервера, алиасы путей и т.п.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
  // Можно добавить base для деплоя на GitHub Pages
});
