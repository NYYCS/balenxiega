<script setup lang="ts">
import { ref } from "vue";

import VModal from "./VModal.vue";
import VTab from "./VTab.vue";

import LoginForm from "./auth/LoginForm.vue";
import RegisterForm from "./auth/RegisterForm.vue";

interface Props {
  open: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["close", "success"]);

const TABS = [
  { label: "Login", key: "login" },
  { label: "Register", key: "register" },
];

const tab = ref("login");
</script>

<template>
  <VModal :open="props.open">
    <div class="auth-form-container">
      <h2 v-if="tab === 'login'">Welcome Back!</h2>
      <p v-if="tab === 'login'">We are pleased to see you again.</p>
      <h2 v-if="tab === 'register'">Come on in.</h2>
      <p v-if="tab === 'register'">
        Join a community with over 100,000+ members!
      </p>
      <VTab v-model="tab" :tabs="TABS" />
      <KeepAlive>
        <LoginForm v-if="tab === 'login'" @success="emits('success')" />
      </KeepAlive>
      <KeepAlive>
        <RegisterForm v-if="tab === 'register'" @success="tab = 'login'" />
      </KeepAlive>
    </div>
  </VModal>
</template>

<style scoped>
h2,
p {
  margin: 0.5rem 0;
}
.auth-form-container {
  width: 300px;
}
</style>
