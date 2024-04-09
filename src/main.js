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

const firebaseConfig = {
  apiKey: 'AIzaSyA3uAI3chHdNxEAJ7kpbzJA5BX-8jlhkp0',
  authDomain: 'jwt-vue-bfe5b.firebaseapp.com',
  projectId: 'jwt-vue-bfe5b',
  storageBucket: 'jwt-vue-bfe5b.appspot.com',
  messagingSenderId: '77874838445',
  appId: '1:77874838445:web:9911e7ef43ca9433b1ff24'
}

console.log(import.meta.env)
initializeApp(firebaseConfig)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Message', Message)

app.mount('#app')
