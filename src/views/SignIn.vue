<template>
  <form class="flex flex-column gap-3">
    <h2 class="title">Sign In</h2>
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
      <Button @click="signin" label="Signup" />
      <span
        >Are you not registered yet?<router-link class="link" to="/signup"
          >Sign up</router-link
        ></span
      >
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

import { useAuthStore } from '../stores/auth.js'
import Loader from '../components/Loader.vue'
import router from '@/router/index.js'

const authStore = useAuthStore()

const email = ref()
const password = ref()
const signin = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signin')
  router.push('/cars')
}
</script>

<style lang="scss" scoped></style>
