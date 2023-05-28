import { ref } from "vue";

interface User {
  email: string;
  name: string;
}

const user = ref<User | undefined>();

export function useUser() {
  return user;
}
