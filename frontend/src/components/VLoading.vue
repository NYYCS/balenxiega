<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="loading-container">
    <Icon class="loading" icon="mdi:loading" height="2rem" />
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
