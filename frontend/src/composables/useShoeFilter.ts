import { ref } from "vue";

const filter = {
  brand: ref<string | undefined>(),
  name: ref<string | undefined>(),
};

export function useShoeFilter() {
  return filter;
}
