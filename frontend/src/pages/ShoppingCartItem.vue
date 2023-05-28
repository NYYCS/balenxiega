<script setup lang="ts">
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { CartItem } from "../api";
import VIconButton from "../components/VIconButton.vue";
import { usePriceFormat } from "../composables/usePriceFormat";

const p = usePriceFormat();

const props = defineProps<{
  item: CartItem;
}>();

interface Emits {
  (event: "increment", item: CartItem, quantity: number): void;
  (event: "decrement", item: CartItem, quantity: number): void;
  (event: "remove", item: CartItem): void;
}

const quantity = ref(props.item.quantity);

const increment = useDebounceFn(
  () => emit("increment", props.item, quantity.value),
  2000
);
const decrement = useDebounceFn(
  () => emit("decrement", props.item, quantity.value),
  2000
);
const remove = useDebounceFn(() => emit("remove", props.item), 2000);

const emit = defineEmits<Emits>();
</script>

<template>
  <div v-if="quantity > 0" class="cart-item">
    <div class="shoe-details">
      <img :src="props.item.image_url" />
      <div>
        <div class="shoe-brand">{{ props.item.brand }}</div>
        <div class="shoe-name">{{ props.item.name }}</div>
        <div class="shoe-size">Size Europe {{ props.item.size }}</div>
      </div>
      <div></div>
      <div></div>
      <div class="cart-item-details">
        <div class="total-price-quantity">
          <div class="total-price">{{ p(props.item.price) }}</div>
          <div class="quantity">
            <VIconButton
              class="secondary"
              icon="mdi:minus"
              @click="
                decrement();
                quantity--;
              "
            />
            <span>{{ quantity }}</span>
            <VIconButton
              class="secondary"
              icon="mdi:plus"
              @click="
                increment();
                quantity++;
              "
            />
          </div>
        </div>
      </div>
      <div class="icon-btns">
        <VIconButton
          icon="mdi:trash-can-outline"
          class="secondary"
          @click="remove(), (quantity = 0)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  position: relative;
}

img {
  height: 200px;
}

.shoe-details {
  display: grid;
  padding: 1rem 0;
  grid-template-columns: 1fr 3fr 0.5fr;
  grid-template-rows: repeat(2, auto);
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.2rem;
}

.shoe-brand {
  font-weight: bold;
}

.shoe-name {
  font-weight: 300;
}

.shoe-price {
  margin-top: 2rem;
  font-size: 1.2rem;
}

.total-price-quantity {
  display: flex;
  gap: 2rem;
}

.quantity {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.total-price {
  font-weight: bold;
  font-size: 1.2rem;
}

.icon-btns {
  display: flex;
  gap: 1rem;
}
</style>
