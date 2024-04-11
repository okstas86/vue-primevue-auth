import { ref } from 'vue'
import { defineStore } from 'pinia'

import axiosApiInstans from '../api.js'

const api = 'https://identitytoolkit.googleapis.com/v1/accounts:'
const apiKey = import.meta.env.VITE_API_KEY

export const useAuthStore = defineStore('authStore', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  })

  const errorText = ref('')
  const loader = ref(false)

  const auth = async (payload, type) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'
    errorText.value = ''
    loader.value = true
    try {
      let response = await axiosApiInstans.post(api + stringUrl + '?key=' + apiKey, {
        ...payload,
        returnSecureToken: true
      })

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
          expiresIn: userInfo.value.expiresIn
        })
      )
    } catch (error) {
      console.log(error.response.data.error.message)
      switch (error.response.data.error.message) {
        case 'EMAIL_EXISTS':
          errorText.value = 'The email address is already in use by another account'
          console.log(errorText.value)
          break
        case 'OPERATION_NOT_ALLOWED':
          errorText.value = 'Password sign-in is disabled for this project'
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorText.value =
            'We have blocked all requests from this device due to unusual activity. Try again later'
          break
        case 'EMAIL_NOT_FOUND':
          errorText.value =
            'There is no user record corresponding to this identifier. The user may have been deleted.'
          break
        case 'INVALID_PASSWORD':
          errorText.value = 'The password is invalid or the user does not have a password.'
          break
        case 'MISSING_EMAIL':
          errorText.value = 'The email not be empty.'
          break
        case 'MISSING_PASSWORD':
          errorText.value = 'The password not be empty.'
          break
        case 'INVALID_EMAIL':
          errorText.value = 'The email is invalid.'
          break
        case 'INVALID_LOGIN_CREDENTIALS':
          errorText.value = 'The email or password is invallid.'
          break
      }

      throw errorText.value
    } finally {
      loader.value = false
    }
  }
  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: '',
      expiresIn: ''
    }
  }
  return { auth, userInfo, errorText, loader, logout }
})
