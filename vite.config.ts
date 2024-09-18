// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Сразу регистрируем Service Worker
      registerType: 'autoUpdate', 

      // Какие файлы включаем в PWA
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],

      // Настраиваем манифест
      manifest: {
        name: 'Мой PWA Приложение', // Как наше приложение будет называться
        short_name: 'PWA', // Короткое название, чтоб на главном экране поместилось
        description: 'Моё суперское прогрессивное веб-приложение!', // Описание, чтоб ясно было
        theme_color: '#ffffff', // Цвет темы, чисто для красоты

        // Добавляем иконки для разных устройств
        icons: [
          {
            src: 'pwa-192x192.png', // Откуда иконку берем
            sizes: '192x192', // Размер иконки
            type: 'image/png' // Формат файла
          },
          {
            src: 'pwa-512x512.png', // Иконка побольше
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Эта еще и для "maskable"
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Эта маскируется, для современности
          }
        ]
      }
    })
  ]
});
