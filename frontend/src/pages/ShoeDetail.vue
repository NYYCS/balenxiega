<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/vue-query";
import { useApi } from "../composables/useApi";
import { usePriceFormat } from "../composables/usePriceFormat";
import VButton from "../components/VButton.vue";
import VTab from "../components/VTab.vue";

import { fetchUser, addCartItem } from "../api";

const axios = useApi();
const queryClient = useQueryClient();
const p = usePriceFormat();

const ALL_SIZES = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48];

const route = useRoute();

const TABS = [
  { label: "Description", key: "description" },
  { label: "Delivery & Returns", key: "delivery" },
];

const tab = ref("description");

const formData = ref<{
  shoe_id: number;
  size: number;
  quantity: number;
}>({
  shoe_id: route.params.id ? Number(route.params.id) : 0,
  size: 0,
  quantity: 1,
});

const { data: user } = useQuery({
  queryKey: ["user"],
  queryFn: async () => await fetchUser(),
});

const { data: shoe, isSuccess } = useQuery({
  queryKey: ["shoe", route.params.id],
  queryFn: async () => {
    const res = await axios.get(`/shoes/${route.params.id}`);
    return res.data;
  },
});

const mutation = useMutation({
  mutationFn: async () => await addCartItem(formData.value),
  onSuccess: () => queryClient.invalidateQueries(["cart"]),
});
</script>

<template>
  <div v-if="isSuccess" class="shoe-detail">
    <div class="shoe-images">
      <img v-for="image in shoe.images" :src="image" />
    </div>
    <form @submit.prevent="mutation.mutate">
      <div class="shoe-description">
        <div class="shoe-brand">{{ shoe.brand }}</div>
        <div class="shoe-name">{{ shoe.name }}</div>
        <div class="shoe-price">{{ p(shoe.price) }}</div>
      </div>
      <hr />
      <h4 style="margin-top: 2rem">Available Size</h4>
      <ul class="shoe-sizes">
        <li v-for="size in ALL_SIZES">
          <button
            type="button"
            :class="formData.size === size ? 'primary' : 'secondary'"
            :disabled="!shoe.sizes.includes(size)"
            @click.prevent="formData.size = size"
          >
            {{ size }}
          </button>
        </li>
      </ul>
      <VButton
        v-if="user !== undefined"
        class="primary add-to-cart"
        type="submit"
        :loading="mutation.isLoading.value"
        @click.prevent="mutation.mutate"
        @submit.prevent="mutation.mutate"
        >Add to Cart</VButton
      >
      <VButton v-else class="add-to-cart" disabled> Login to Purchase </VButton>
      <span>ESTIMATED DELIVERY</span>
      <span>8 MAY - 15 MAY</span>
    </form>
    <div class="shoe-descriptions">
      <VTab v-model="tab" :tabs="TABS" />
      <div class="shoe-brand">{{ shoe.brand }}</div>
      <div class="shoe-name">{{ shoe.name }}</div>
      <p>{{ shoe.description }}</p>
    </div>
    <div>
      <img :src="shoe.images[0]" />
    </div>
  </div>
</template>

<style scoped>
.shoe-detail {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  padding: 2rem;
  gap: 2rem;
}

.shoe-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: calc(100vh - 6rem);
  overflow: scroll;
}

img {
  max-height: 500px;
}

form {
  display: flex;
  flex-direction: column;
}

.shoe-description {
  display: flex;
  position: relative;
  background: #ffffff;
  flex-direction: column;
  height: 168px;
}

.shoe-brand {
  font-size: 1.5rem;
  font-weight: bold;
}
.shoe-name {
  font-size: 1.2rem;
  font-weight: 300;
}
.shoe-price {
  font-size: 1.4rem;
}
.shoe-sizes {
  display: flex;
  position: relative;
  width: 100%;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.shoe-sizes button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
}

.add-to-cart {
  margin: 2rem 0;
}

.shoe-description p {
  max-width: 256px;
  white-space: pre-wrap;
}
</style>
