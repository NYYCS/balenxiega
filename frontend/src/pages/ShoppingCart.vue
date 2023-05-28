<script setup lang="ts">
import { computed } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useDebounceFn } from "@vueuse/core";
import { Icon } from "@iconify/vue";
import ShoppingCartItem from "./ShoppingCartItem.vue";
import VButton from "../components/VButton.vue";

import { usePriceFormat } from "../composables/usePriceFormat";
import { fetchCartItems, addCartItem, CartItem } from "../api";
import VLoading from "../components/VLoading.vue";

const p = usePriceFormat();
const queryClient = useQueryClient();

const { data: cartItems, isLoading } = useQuery({
  queryKey: ["cart"],
  queryFn: async () => await fetchCartItems(),
});

const subtotal = computed(() => {
  if (!cartItems.value) return 0;
  return cartItems.value.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
});

const shipping = computed(() => {
  return subtotal.value * 0.06;
});

const total = computed(() => {
  return subtotal.value + shipping.value;
});

interface UpdateCartItem {
  item: CartItem;
  quantity: number;
}

const updateCartItem = useDebounceFn(async function ({
  item,
  quantity,
}: UpdateCartItem) {
  const diff = quantity - item.quantity;
  await addCartItem({
    shoe_id: item.shoe_id,
    size: item.size,
    quantity: diff,
  });
  queryClient.invalidateQueries(["cart"]);
},
2000);

const mutation = useMutation({
  mutationFn: async ({ item, quantity }: UpdateCartItem) =>
    await updateCartItem({ item, quantity }),
  onMutate: () => {
    queryClient.setQueryData(["cart"], (cartItems: CartItem[] | undefined) => {
      if (!cartItems) return;
      return cartItems.filter((cartItem) => cartItem.quantity > 0);
    });
  },
});
</script>

<template>
  <div v-if="!isLoading" class="cart">
    <h3><Icon icon="mdi:cart-outline" height="1.5rem" />Cart Items</h3>
    <div></div>
    <TransitionGroup class="cart-items" name="list" tag="div">
      <ShoppingCartItem
        v-for="item in cartItems"
        :key="item.shoe_id"
        :item="item"
        @increment="(item, quantity) => mutation.mutate({ item, quantity })"
        @decrement="(item, quantity) => mutation.mutate({ item, quantity })"
        @remove="(item) => mutation.mutate({ item, quantity: 0 })"
      />
      <div class="no-cart-items">No Cart Items.</div>
    </TransitionGroup>
    <div>
      <div class="checkout">
        <div class="checkout-summary">
          <label>Subtotal</label>
          <span>{{ p(subtotal) }}</span>
          <label>Shipping Costs 6%</label>
          <span>{{ p(shipping) }}</span>
          <label class="total">Total</label>
          <span class="total">{{ p(total) }}</span>
        </div>
        <VButton class="primary">Checkout</VButton>
      </div>
    </div>
  </div>
  <VLoading v-else />
</template>

<style scoped>
h3 {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.cart {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  padding: 0 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
}
.checkout {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 10rem;
  padding: 2rem;
  gap: 2rem;
}

.checkout-summary {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  align-items: center;
  font-size: 1rem;
}

.checkout-summary label {
  font-weight: 300;
}

.total {
  font-weight: bold !important;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.no-cart-items {
  display: none;
  height: 100%;
}

.no-cart-items:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
