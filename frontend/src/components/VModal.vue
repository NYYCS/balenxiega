<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { onClickOutside, useScrollLock } from "@vueuse/core";
import VIconButton from "./VIconButton.vue";

interface Props {
  open: boolean;
}

interface Emits {
  (e: "close"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const el = ref<HTMLDivElement>();
const body = ref<HTMLBodyElement>();
const isScrollLocked = useScrollLock(body);

onClickOutside(el, () => emit("close"));

watch(
  () => props.open,
  () => (isScrollLocked.value = props.open)
);

onMounted(() => {
  body.value = document.body as HTMLBodyElement;
});
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-if="props.open" class="overlay">
        <div v-if="props.open" ref="el" class="modal">
          <VIconButton
            class="close-btn secondary"
            icon="mdi:close"
            @click="emit('close')"
          />
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: absolute;
  width: max-content;
  height: max-content;
  background: #ffffff;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2000;
}

.close-btn {
  position: absolute;
  padding: 0;
  right: 1rem;
  top: 1rem;
}

.close-btn:hover,
.close-btn:focus {
  opacity: 1;
  border: none;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
