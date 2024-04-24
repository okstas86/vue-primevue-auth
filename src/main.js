import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { initializeApp } from 'firebase/app'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Card from 'primevue/card'
import './api'
import { createI18n } from 'vue-i18n'
import { languages, defaultLocale } from './i18n'

initializeApp(import.meta.env.VITE_FIRE_BASE)

const localStorageLang = localStorage.getItem('lang')
const messages = Object.assign(languages)
const i18n = createI18n({
  legacy: false, //composition api
  locale: localStorageLang || defaultLocale,
  fallbackLocale: 'en',
  messages
})
const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Message', Message)
app.component('Card', Card)

app.mount('#app')
