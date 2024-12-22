// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({

  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error - vite-plugin-vuetify is not typed
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxt/eslint',
  ], ssr: false,
  devtools: { enabled: true },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  runtimeConfig: {
    public: {
      MAPBOX_ACCESS_TOKEN: process.env.NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      BASE_API_URL: process.env.NUXT_PUBLIC_BASE_API_URL,
      CLOUDFRONT_URL: process.env.NUXT_PUBLIC_CLOUDFRONT_URL,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
