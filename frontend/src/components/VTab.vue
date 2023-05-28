<script setup lang="ts">
import { useVModel } from "@vueuse/core";
type Tab = {
  label: string;
  key: string;
};

interface Props {
  modelValue: string;
  tabs: Tab[];
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const activeTab = useVModel(props, "modelValue", emit, {
  defaultValue: props.tabs[0].key,
});
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in props.tabs"
      :key="tab.key"
      :class="[activeTab == tab.key && 'active']"
      @click.prevent="activeTab = tab.key"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  margin-bottom: 2rem;
}

button {
  width: max(calc(max-content + 2rem), 256px);
  height: 2rem;
  padding: 0 1rem;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid transparent;
}

button.active {
  border-bottom: 2px solid #1a1a1a;
}
</style>
