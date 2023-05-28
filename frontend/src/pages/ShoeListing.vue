<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";

import { useShoeFilter } from "../composables/useShoeFilter";

import ShoeCard from "./ShoeCard.vue";
import { fetchShoes } from "../api";
import VLoading from "../components/VLoading.vue";
import ShoeFilter from "./ShoeFilter.vue";
const filter = useShoeFilter();
const router = useRouter();
const route = useRoute();

const page = computed(() => (route.query.page ? Number(route.query.page) : 1));

const { data: shoes, isLoading } = useQuery({
  queryKey: ["shoes", page, filter.brand, filter.name],
  queryFn: async () =>
    await fetchShoes({
      filter: { brand: filter.brand.value, name: filter.name.value },
      page: page.value,
    }),
});
</script>

<template>
  <div class="shoe-listing">
    <div class="shoe-listing-top">
      <ShoeFilter @filter="router.replace({ query: undefined })" />
    </div>
    <div class="shoes-main">
      <div v-if="!isLoading && !(shoes?.length === 0)" class="shoe-views">
        <ShoeCard v-for="shoe in shoes" :key="`${shoe.name}`" :shoe="shoe" />
      </div>
      <div v-else-if="isLoading" class="loading">
        <VLoading />
      </div>
      <div v-else>
        <div class="no-results">No results found.</div>
      </div>
    </div>
    <div v-if="!isLoading && !(shoes?.length === 0)" class="next-page">
      <RouterLink :to="{ path: '/shoe', query: { page: page + 1 } }"
        >Next</RouterLink
      >
    </div>
  </div>
</template>

<style>
.shoe-listing {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  padding-top: 0;
}

.shoe-listing-top {
  position: sticky;
  top: 6rem;
  background: #ffffff;
  z-index: 1000;
}

.shoe-views {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem;
  height: 100%;
  overflow: scroll;
}

.view--filter-open {
  grid-template-columns: repeat(2, 1fr);
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
}

.next-page {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
