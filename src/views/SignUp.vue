<template>
  <form class="flex flex-column gap-3">
    <h2>Sign Up</h2>
    <Message v-if="authStore.errorText" severity="error">{{ authStore.errorText }}</Message>

    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText type="email" v-model="email" placeholder="Your Email" />
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-at"></i>
      </span>
      <InputText type="password" v-model="password" placeholder="Password" />
    </div>
    <Loader v-if="authStore.loader" />
    <div v-else class="flex flex-column gap-3">
      <Button @click="signup" label="Signup" />
      <span>Are you alredy registered?<router-link to="/singin">Sign in</router-link></span>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { useAuthStore } from '../stores/auth.js'
import Loader from '../components/Loader.vue'

const authStore = useAuthStore()

const email = ref()
const password = ref()
const signup = async () => {
  await authStore.signup({ email: email.value, password: password.value })
}
</script>

<style lang="scss" scoped></style>
