import { createRouter as createVueRouter, createWebHistory } from "vue-router";
import LandingPage from "./pages/LandingPage.vue";
import ShoeListing from "./pages/ShoeListing.vue";
import ShoeDetail from "./pages/ShoeDetail.vue";
import ShoppingCart from "./pages/ShoppingCart.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/shoe", component: ShoeListing },
  { path: "/shoe/:id", component: ShoeDetail },
  { path: "/cart", component: ShoppingCart },
];

export function createRouter() {
  return createVueRouter({
    history: createWebHistory(),
    routes,
  });
}
