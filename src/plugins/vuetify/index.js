// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import colors from 'vuetify/util/colors'
import '@mdi/font/css/materialdesignicons.css'
const myCustomTheme = {
  dark: false,
  colors: {
    primary: "#091638",
    secondary: "#0138b6",
    accent: "#ccd8f0",
    error: "#FF5252",
    background: "#ccd8f0",
    aside: "#062F63",
    info: "#88AC2E",
  },
}

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: colors.grey.darken3,
    primary: "#062F63",
    secondary: "#BB9C0D",
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
      myCustomDarkTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
