import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Request Blood',
        short_name: 'Reblood',
        description: 'Blood Donor Apps',
        theme_color: '#efeae6',
        display:"standalone",
        icons: [
          {
            src: '/icon/mipmap-hdpi/maskable_icon.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon/mipmap-mdpi/maskable_icon.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon/mipmap-xhdpi/maskable_icon.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon/mipmap-xxhdpi/maskable_icon.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon/mipmap-xxxhdpi/maskable_icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon/maskable_icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon/mas-icon/maskable_icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/rajaongkir': {
        target: 'https://api.rajaongkir.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rajaongkir/, ''),
      },
      '/v1': {
        target: 'http://203.194.112.121:9569/v1/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ''),
      },
    },
  },
})
