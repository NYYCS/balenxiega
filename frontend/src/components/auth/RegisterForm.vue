<script setup lang="ts">
import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import VButton from "../VButton.vue";

import { register } from "../../api";

const emit = defineEmits(["success"]);

const formData = ref({
  name: "",
  email: "",
  password: "",
});

const mutation = useMutation({
  mutationFn: async () => await register(formData.value),
  onSuccess: () => {
    emit("success");
  },
});
</script>

<template>
  <form @submit.prevent="mutation.mutate">
    <div class="fields">
      <label for="register-name">Name</label>
      <input v-model="formData.name" type="text" id="register-name" />
      <label for="register-email">Email Address</label>
      <input v-model="formData.email" type="email" id="register-email" />
      <label for="register-password">Password</label>
      <input
        v-model="formData.password"
        type="password"
        id="register-password"
      />
    </div>
    <div>
      <VButton
        type="submit"
        class="primary"
        :loading="mutation.isLoading.value"
        @submit.prevent="mutation.mutate"
        @click.prevent="mutation.mutate"
      >
        Sign Up
      </VButton>
    </div>
  </form>
</template>

<style scoped>
input {
  margin-bottom: 1rem;
  border: 2px solid #1a1a1a;
}

.fields {
  margin-bottom: 2rem;
}
</style>
