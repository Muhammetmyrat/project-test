export default defineNuxtConfig({
  devtools: { enabled: false },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
  },
  app: {
    head: {
      title: 'Project test',
      meta: [
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large',
        },
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'Project test',
        },
      ],
    },
    pageTransition: { name: 'page-left', mode: 'out-in' },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/global.scss" as *;',
        },
      },
    },
  },
  css: ['@/assets/styles/index.scss'],
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: process.env.BASE_API,
    // Keys within public, will be also exposed to the client-side
    public: {
      baseUrl: process.env.BASE_API,
      imgUrl: process.env.IMAGE_URL,
    },
  },
})
