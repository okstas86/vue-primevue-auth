<template>
  <div>
    <h2 class="title">Cars</h2>
    <Loader v-if="showLoader" />
    <div v-else class="flex flex-column gap-3"></div>
    <Card v-for="(car, i) in cars" :key="i">
      <template #title>{{ car.name }}</template>
      <template #subtitle>{{ car.type }}</template>
      <template #content>{{ car.quantity }}</template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

import Loader from '../components/Loader.vue'
import axiosApiInstans from '../api.js'

const authStore = useAuthStore()
const cars = ref()
const showLoader = ref(false)

const getAllCars = async () => {
  showLoader.value = true
  try {
    const response = await axiosApiInstans.get(
      `https://jwt-vue-bfe5b-default-rtdb.europe-west1.firebasedatabase.app/cars.json`
    )
    cars.value = response.data
  } catch (error) {
    console.log('error:', error)
  } finally {
    showLoader.value = false
  }
}

onMounted(() => {
  getAllCars()
})
</script>

<style scoped></style>
