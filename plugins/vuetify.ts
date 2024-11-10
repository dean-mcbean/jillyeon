// plugins/vuetify.js
import { createVuetify, type ThemeDefinition } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

const defaultUITheme: ThemeDefinition = {
  dark: false,
  colors: {
    'background': '#FFFFFF',
    'dark': '#0b2948',
    'light': '#04497C',
    'surface': '#FFFFFF',
    'primary': '#0b2948',
    'secondary': '#03DAC6',
    'error': '#B00020',
    'info': '#2196F3',
    'success': '#4CAF50',
    'warning': '#FB8C00',
    'light-grey': '#F0EFEF',
    'grey': '#999999',
  },
  variables: {
    'high-emphasis-opacity': 1,
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'defaultUITheme',
      variations: {
        colors: ['primary', 'secondary', 'background'],
        lighten: 1,
        darken: 2,
      },
      themes: {
        defaultUITheme,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
