import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const api = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
const apiKey = 'AIzaSyA3uAI3chHdNxEAJ7kpbzJA5BX-8jlhkp0'

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

  const signup = async (payload) => {
    errorText.value = ''
    loader.value = true
    try {
      let response = await axios.post(api + apiKey, { ...payload, returnSecureToken: true })

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
      loader.value = false
    } catch (error) {
      loader.value = false
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
        default:
          error.value = 'error'
          break
      }
    }
  }

  return { signup, userInfo, errorText, loader }
})
