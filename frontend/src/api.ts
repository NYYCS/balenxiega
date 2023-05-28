import { useApi } from "./composables/useApi";

const axios = useApi();

interface Shoe {
  id: number;
  name: string;
  brand: string;
  price: number;
  primary_image_url: string;
  secondary_image_url: string;
  available: boolean;
}

interface FetchShoesOptions {
  page?: number;
  filter: {
    brand?: string;
    name?: string;
  };
}

export async function fetchShoes(options: FetchShoesOptions) {
  const { page, filter = { brand: "", name: "" } } = options;
  const res = await axios.get("/shoes", {
    params: { page, ...filter },
  });
  return res.data as Shoe[];
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await axios.post("/auth/login", { email, password });
  return res.data as { user: { email: string; name: string }; token: string };
}

export async function logout() {
  const res = await axios.post("/auth/logout");
  return res;
}

export async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await axios.post("/auth/register", { name, email, password });
  return res;
}

export async function fetchUser() {
  const res = await axios.get("/auth/me");
  return res.data as { email: string; name: string };
}

export interface CartItem {
  brand: string;
  image_url: string;
  name: string;
  price: number;
  quantity: number;
  shoe_id: number;
  shoe_size_id: number;
  size: number;
}

export async function fetchCartItems() {
  const res = await axios.get("/cart");
  return res.data as CartItem[];
}

export async function addCartItem({
  shoe_id,
  size,
  quantity,
}: {
  shoe_id: number;
  size: number;
  quantity: number;
}) {
  return await axios.post("/cart", { shoe_id, size, quantity });
}
