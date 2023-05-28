<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ButtonHTMLAttributes } from "vue";

interface Props extends ButtonHTMLAttributes {
  icon?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>

<template>
  <button>
    <template v-if="!loading">
      <Icon v-if="props.icon" :icon="props.icon" height="1.5rem" />
      <slot></slot>
    </template>
    <template v-else>
      <Icon class="loading" icon="mdi:loading" height="1.5rem" />
    </template>
  </button>
</template>

<style scoped>
button {
  align-items: center;
  padding: 1rem 2rem;
  gap: 0.5rem;
}
</style>
