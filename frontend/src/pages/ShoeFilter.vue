<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useShoeFilter } from "../composables/useShoeFilter";
import VButton from "../components/VButton.vue";

const BRANDS = [
  "adidas",
  "Nike",
  "Balenciaga",
  "Converse",
  "New Balance",
  "PUMA",
  "BOSS",
];

const emit = defineEmits(["filter"]);

const filter = useShoeFilter();
</script>

<template>
  <div class="filter">
    <div class="label">
      <Icon class="label-icon" icon="mdi:filter-variant" height="1.5rem" />
      Filter Brands
    </div>
    <ul class="pills">
      <li v-for="brand in BRANDS">
        <VButton
          :class="[filter.brand.value === brand ? 'primary' : 'border']"
          @click="
            filter.brand.value = filter.brand.value === brand ? '' : brand;
            emit('filter');
          "
        >
          {{ brand }}
        </VButton>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.filter {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  padding: 2rem 0;
}
.label {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  gap: 0.5rem;
}

.pills {
  display: flex;
  gap: 1rem;
}

.pill {
  border: 2px solid #1a1a1a;
}

.pill.active {
  background: #1a1a1a;
  color: #ffffff;
  opacity: 1;
}
</style>
