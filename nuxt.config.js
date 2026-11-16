require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
module.exports = {
  mode: "spa",
  loading: '~/components/LoadingComponent.vue',
  head: {
    titleTemplate: 'Driving King CRM',
    title: 'Driving King CRM',
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
    base: "/driving-king-crm",
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
    serverUrl: "https://pd9gjd9lte.execute-api.ap-east-1.amazonaws.com"
  },
}
