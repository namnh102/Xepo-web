import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  modules: [],
  // Ensure a stable compatibility date and default dev server port to avoid conflicts with backend
  compatibilityDate: '2025-09-30',
  devServer: {
    // bind only to localhost so the app is reachable via http://localhost:PORT
    // (0.0.0.0 can cause localhost resolution issues on some Windows setups)
    host: 'localhost',
    port: Number(process.env.PORT || 3002)
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://xepo-backend.onrender.com'
    }
  }
})
