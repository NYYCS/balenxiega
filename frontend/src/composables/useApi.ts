import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = token;
  return config;
});

instance.interceptors.response.use((res) => {
  if (res.status === 401) localStorage.removeItem("token");
  return res;
});

export function useApi() {
  return instance;
}
