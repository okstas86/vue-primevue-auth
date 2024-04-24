<template>
  <div class="container">
    <form class="flex flex-column gap-3">
      <h2 class="title text-4xl">{{ $t('signin') }}</h2>
      <Message v-if="authStore.errorText" severity="error">{{ authStore.errorText }}</Message>

      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user text-2xl"></i>
        </span>
        <InputText
          class="input-text"
          type="email"
          v-model="email"
          :placeholder="$t('placeholders.username')"
        />
      </div>
      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-at text-2xl"></i>
        </span>
        <InputText
          class="input-text"
          type="password"
          v-model="password"
          :placeholder="$t('placeholders.password')"
        />
      </div>
      <Loader v-if="authStore.loader" />
      <div v-else class="flex flex-column gap-3">
        <Button class="py-3 font-size" @click="signup" :label="$t('signup')" />
        <span class="font-size"
          >{{ $t('registered')
          }}<router-link class="link font-size" to="/signin">{{ $t('signin') }}</router-link></span
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useAuthStore } from '../stores/auth.js'
import Loader from '../components/Loader.vue'

const authStore = useAuthStore()

const email = ref()
const password = ref()
const signup = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signup')
}
</script>

<style scoped></style>
