<template>
  <div class="menu">
    <div class="menu__link_wrap">
      <router-link class="menu__link" to="/">Home</router-link>
      <router-link class="menu__link" v-if="token" to="/cars">Cars</router-link>
    </div>
    <div class="menu__link_wrap">
      <router-link class="menu__link" v-if="!token" to="/signin">Login</router-link>
      <router-link class="menu__link" v-if="token" to="/signin" @click.prevent="logout"
        >Logout</router-link
      >
    </div>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import router from './router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
    authStore.userInfo.expiresIn = tokens.expiresIn
  }
}

const logout = () => {
  authStore.logout()
  localStorage.removeItem('userTokens')
  router.push('/signin')
}
checkUser()
</script>

<style>
* {
  margin: 0;
}
.container {
  max-width: 700px;
  font-family: Arial, sans-serif;
  margin: 6rem auto;
}

.menu {
  display: flex;
  margin: 0 5rem;
  align-items: center;
  justify-content: space-between;
}
.title {
  color: #059669;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.menu__link_wrap {
  padding: 1rem;
}
.link,
.menu__link {
  color: #059669;
  text-decoration: none;
  padding: 1rem;
}
.menu__link {
  font-size: 1.2rem;
  font-weight: 600;
}

.menu__link:hover {
  color: #7c8085;
}
</style>
