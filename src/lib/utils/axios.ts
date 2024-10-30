import axios from "axios";

const isClient = typeof window !== "undefined";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (isClient) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: { response: { status: number } }) => {
    if (error.response.status === 401) {
      if (isClient) localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
