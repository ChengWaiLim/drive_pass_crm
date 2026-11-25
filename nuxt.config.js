require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
module.exports = {
  mode: "spa",
  loading: '~/components/LoadingComponent.vue',
  head: {
    titleTemplate: 'Drive Pass CRM',
    title: 'Drive Pass CRM',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  router: {
    base: "/drive-pass-crm",
  },
  css: [
    "@/static/main.sass",
  ],
  plugins: [{ src: "@/plugins/global.js", mode: "client", ssr:false },],
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [],
  vuetify: {},
  build: {
    
  },
  env: {
    testingTitle: "",
    serverUrl: "https://5zl7ult76h.execute-api.ap-east-1.amazonaws.com/"
  },
}
