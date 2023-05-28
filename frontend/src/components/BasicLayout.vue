<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";
import { Icon } from "@iconify/vue";
import VButton from "./VButton.vue";
import AuthModal from "./AuthModal.vue";

import { fetchUser, fetchCartItems, logout } from "../api";
import { useShoeFilter } from "../composables/useShoeFilter";

const queryClient = useQueryClient();
const route = useRoute();
const filter = useShoeFilter();

const searchText = ref("");

const { data: user } = useQuery({
  queryKey: ["user"],
  queryFn: async () => await fetchUser(),
});

const { data: cartItemsCount } = useQuery({
  queryKey: ["cart"],
  queryFn: async () => await fetchCartItems(),
  select: (data) => data?.length,
});

const mutation = useMutation({
  mutationFn: async () => await logout(),
  onSuccess: () => {
    queryClient.setQueryData(["cart"], []);
    queryClient.setQueryData(["user"], undefined);
    localStorage.removeItem("token");
    window.location.href = "/shoe";
  },
});

const isAuthModalOpen = ref(false);
</script>
<template>
  <div class="container">
    <Transition>
      <header v-if="route.path !== '/'">
        <ul class="nav-links">
          <li>
            <RouterLink to="/" class="logo">Balenxiega</RouterLink>
          </li>
        </ul>
        <div class="header-search-field">
          <Icon class="search-icon" icon="mdi:magnify" height="1.5rem" />
          <input
            v-model="searchText"
            class="search"
            type="text"
            placeholder="Search"
            @keyup.prevent.enter="filter.name.value = searchText"
          />
        </div>
        <ul class="header-side">
          <li>
            <VButton
              v-if="user === undefined"
              icon="mdi:account-outline"
              class="outline"
              type="button"
              @click="isAuthModalOpen = true"
              >Login
            </VButton>
            <VButton
              v-else
              icon="mdi:account-outline"
              class="outline"
              type="button"
              :key="user.name"
              :loading="mutation.isLoading.value"
              @click="mutation.mutate"
            >
              Logout
            </VButton>
          </li>
          <RouterLink v-if="user" to="/cart" style="position: relative">
            <VButton icon="mdi:cart-outline" class="outline" type="button">
              Cart
            </VButton>
            <span v-if="cartItemsCount" class="cart-count">{{
              cartItemsCount
            }}</span>
          </RouterLink>
        </ul>
      </header>
    </Transition>
    <main>
      <slot></slot>
    </main>
  </div>
  <AuthModal
    :open="isAuthModalOpen"
    @close="isAuthModalOpen = false"
    @success="isAuthModalOpen = false"
  />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

header {
  position: sticky;
  height: 6rem;
  display: grid;
  grid-template-columns: 1fr 2fr 0.5fr;
  background: #ffffff;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  top: 0;
  z-index: 1000;
}

.logo {
  font-weight: bold;
}

ul {
  display: flex;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.header-search-field {
  display: flex;
  align-items: center;
}

.search-icon {
  display: inline-block;
  position: relative;
  height: 1.5rem;
  opacity: 0.6;
  left: 2.5rem;
  transition: opacity 0.25s;
}

.header-search-field:focus-within .search-icon,
.header-search-field:hover .search-icon {
  opacity: 1;
}

input.search {
  padding-left: 3rem;
  width: 100%;
}

.nav-links a {
  display: block;
  position: relative;
  width: min(max-content, 8em);
  transition: all 0.5s ease-in-out;
  text-align: center;
  padding: 1rem;
}
.nav-links a:hover {
  background-color: #f9f9f9;
}

.nav-links li:first-child a {
  border-radius: 1rem 0 0 1rem;
}

.nav-links li:last-child a {
  border-radius: 0 1rem 1rem 0;
}

.header-side {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-right: 1rem;
}

.header-side button {
  display: flex;
  place-items: center;
}

.main {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #f9f9f9;
}

.cart-count {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  border-radius: 9999px;
  background: #1a1a1a;
  color: white;
  font-weight: bold;
  font-size: 0.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-100%);
}
</style>
