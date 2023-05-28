<script setup lang="ts">
import { Icon } from "@iconify/vue";
interface Props {
  icon: string;
  loading?: boolean;
  size?: "default" | "small" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  size: "default",
});
</script>

<template>
  <button>
    <Icon v-if="!loading" :icon="props.icon" height="1.2rem" />
    <Icon v-else="loading" icon="mdi:loading" height="1.2rem" />
  </button>
</template>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
}
</style>
