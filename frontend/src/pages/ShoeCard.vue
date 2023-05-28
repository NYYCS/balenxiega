<script setup lang="ts">
import { RouterLink } from "vue-router";
import { usePriceFormat } from "../composables/usePriceFormat";

const p = usePriceFormat();

defineProps<{
  shoe: {
    shoe_id: number;
    name: string;
    brand: string;
    price: number;
    primary_image_url: string;
    secondary_image_url: string;
    available: boolean;
  };
}>();
</script>

<template>
  <RouterLink :to="`/shoe/${shoe.shoe_id}`">
    <div class="card">
      <div class="card-thumbnail">
        <img :src="shoe.primary_image_url" />
      </div>
      <div class="card-bottom">
        <div class="shoe-description">
          <div class="shoe-brand">{{ shoe.brand }}</div>
          <div class="shoe-name">{{ shoe.name }}</div>
          <div class="shoe-price">{{ p(shoe.price) }}</div>
        </div>
        <div class="shoe-availability">
          <div class="status">
            {{ shoe.available ? "Available" : "Unavailable" }}
          </div>
          {{ shoe.available ? "See all sizes" : "Out of stock" }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.card-thumbnail {
  display: flex;
  flex: 1;
}
img {
  transition: all 0.25s;
}

.card:hover img {
  transform: scale(1.05);
}

.card-bottom {
  height: 96px;
  cursor: pointer;
}

.shoe-description {
  display: flex;
  position: relative;
  background: #ffffff;
  flex-direction: column;
  height: 100%;
  transition: all 0.25s;
  z-index: 2;
}

.card-bottom:hover .shoe-description {
  opacity: 0;
}

.card-bottom:hover .shoe-link {
  opacity: 1;
}

.shoe-brand {
  font-weight: bold;
}

.shoe-name {
  height: 100%;
  font-weight: 300;
}

.shoe-availability {
  position: relative;
  transition: all 0.25s;
  z-index: 1;
  bottom: 100%;
}

.status {
  font-weight: bold;
}
</style>
