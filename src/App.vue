<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>
<style scoped>
.container {
  max-width: 700px;
  font-family: Arial, sans-serif;
  margin: 6rem auto;
}
</style>
