import { createApp } from 'vue'
import {Notify, Dialog, Quasar} from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from "./router";
import {createPinia} from "pinia";

const myApp = createApp(App)
myApp.use(router);

const pinia = createPinia()
myApp.use(pinia);

myApp.use(Quasar, {
  plugins: {Notify, Dialog}, // import Quasar plugins and add here
  /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
})

myApp.mount('#app')
