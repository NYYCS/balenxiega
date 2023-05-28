<script setup lang="ts">
import { ref } from "vue";
import { useQueryClient, useMutation } from "@tanstack/vue-query";
import VButton from "../VButton.vue";

import { login } from "../../api";

const emit = defineEmits(["success"]);

const queryClient = useQueryClient();

const formData = ref({
  email: "",
  password: "",
});

const mutation = useMutation({
  mutationFn: async () => await login(formData.value),
  onSuccess: (data) => {
    localStorage.setItem("token", data.token);
    queryClient.invalidateQueries();
    emit("success");
  },
});
</script>

<template>
  <form @submit.prevent="mutation.mutate">
    <div class="fields">
      <label for="login-email">Email Address</label>
      <input v-model="formData.email" />
      <label for="login-password">Password</label>
      <input v-model="formData.password" type="password" id="login-password" />
    </div>
    <div>
      <VButton
        type="submit"
        class="primary"
        :loading="mutation.isLoading.value"
        @submit.prevent="mutation.mutate"
        @click.prevent="mutation.mutate"
      >
        Login
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
