<script setup lang="ts">
import { onMounted, ref } from "vue";
const linkActive = ref(false);
const text = "BALENXIEGA";

onMounted(() => {
  setTimeout(() => {
    linkActive.value = true;
  }, 300 * text.length);
  for (const [index, char] of Array.from(text).entries()) {
    const el = document.getElementById(`text-elem-${char}-${index}`);
    setTimeout(() => {
      el!.className += " text-elem-active";
    }, 150 * index);
  }
});
</script>

<template>
  <div class="landing-carousel">
    <div class="landing-text">
      <span
        v-for="(char, index) in text"
        class="text-elem"
        :id="`text-elem-${char}-${index}`"
        >{{ char }}</span
      >
    </div>
    <RouterLink to="/shoe">
      <Transition>
        <span v-if="linkActive" class="link">CLICK </span>
      </Transition>
    </RouterLink>
  </div>
</template>

<style scoped>
.landing-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/landing-image.jpg") center center no-repeat;
  background-size: cover;
}

.landing-text {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 1rem;
}

.text-elem {
  position: relative;
  font-size: 5rem;
  font-weight: bold;
  transform: scaleY(0.85);
  opacity: 0;
  color: #ffffff;
}

.text-elem-active {
  animation-name: text-fade-in;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  opacity: 1;
}

.link {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 1s ease;
  animation: link-blink 2.5s infinite ease-in-out 1.5s;
}

@keyframes text-fade-in {
  0% {
    transform: scale(1.5);
    filter: blur(5px);
    opacity: 0;
  }
  100% {
    filter: blur(0px);
    opacity: 1;
  }
}

@keyframes blur-landing {
  0% {
    filter: blur(8px);
  }
  100% {
    filter: blur(2px);
  }
}

@keyframes link-blink {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.v-enter-active,
.v-leave-active {
  opacity: 0.5;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
