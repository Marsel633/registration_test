import { createApp } from 'vue'
import App from './App.vue'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import './style.css'

createApp(App)
  .use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-right',
    theme: 'dark',
  })
  .mount('#app')