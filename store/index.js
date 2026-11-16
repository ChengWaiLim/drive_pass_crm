import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
      state: () => ({
        serverUrl: process.env.serverUrl,
        jwtSecret: "Here is a secret",
        tinyApiKey: "6fpy1g8p3rq0q6uukoui5bmzcl8xllopmmzm81qd2qjbsqwm",
    }),
      mutations: {}
    })
}
export default store