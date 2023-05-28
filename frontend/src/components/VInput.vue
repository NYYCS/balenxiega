<script setup lang="ts">
interface Props {
  error?: boolean;
}

const props = defineProps<Props>();
</script>
<template>
  <input :class="[props.error && 'error']" />
</template>

<style scoped>
.error {
  border: 2px solid #dc3545 !important;
}
</style>
