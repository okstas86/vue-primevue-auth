<template>
  <div class="menu">
    <div class="menu__link_wrap">
      <router-link class="menu__link" to="/">Eclipse Motors</router-link>
      <router-link class="menu__link" v-if="token" to="/cars">Cars</router-link>
    </div>
    <div class="menu__link_wrap">
      <router-link class="menu__link" v-if="!token" to="/signin">{{ $t('login') }}</router-link>
      <router-link class="menu__link" to="#" @click="handleLang">{{ $t('lanquage') }}</router-link>
      <router-link class="menu__link" v-if="token" to="/signin" @click.prevent="logout">{{
        $t('logout')
      }}</router-link>
    </div>
  </div>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import router from './router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const { t, locale } = useI18n({ useScope: 'global' })

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
    authStore.userInfo.expiresIn = tokens.expiresIn
  }
}

const handleLang = () => {
  if (locale.value === 'en' ? (locale.value = 'ru') : (locale.value = 'en'))
    localStorage.setItem('lang', locale.value)
}

const logout = () => {
  authStore.logout()
  localStorage.removeItem('userTokens')
  router.push('/signin')
}
checkUser()
</script>

<style>
html {
  font-size: 62.5%;
}
* {
  margin: 0;
}
.container {
  max-width: 80rem;
  font-family: Arial, sans-serif;
  margin: 8rem auto;
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
  color: #8e959d;

  font-weight: 700;
  border-radius: 1rem;

  text-decoration: none;
  padding: 1rem;
}
.menu__link {
  font-size: 2rem;
  font-weight: 600;
}

.menu__link:hover {
  color: #7c8085;
}

@media (max-width: 63em) {
  html {
    font-size: 55%;
  }
}
@media (max-width: 56em) {
  html {
    font-size: 50%;
  }
}
@media (max-width: 51em) {
  .content__text {
    margin-bottom: 25rem;
  }
  .image {
    top: 27rem;
    left: 0;
  }
  .content__title {
    color: #00cd4f;
  }
}

@media (max-width: 33em) {
  html {
    font-size: 45%;
  }
}
@media (max-width: 30em) {
  .image {
    top: 33rem;
    left: 0;
  }
  html {
    font-size: 45%;
  }
}
@media (max-width: 21em) {
  html {
    font-size: 35%;
  }
}
</style>
