// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
  },
  modules: [
    '@privyid/persona',
    '@privyid/persona-icon'
  ],
  css    : ['~/assets/css/tailwind.css'], 
  postcss: {
    plugins: {
      'postcss-hexrgba'       : {}, 
      'tailwindcss/nesting'   : {}, 
      'tailwindcss'           : {}, 
      'postcss-lighten-darken': {}, 
      'autoprefixer'          : {}, 
    },
  },
  plugins: ['~/plugins/socket.io.ts'],
  watchers: {
    webpack: {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Delay before rebuilding
      ignored: /node_modules/, // Ignore node_modules to reduce the number of watched files
    },
    chokidar: {
      usePolling: true,
      interval: 1000, // Check for changes every second
    }
  }
})
