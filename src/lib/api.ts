import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", {
//       url: error.config?.url,
//       status: error.response?.status,
//       data: error.response?.data,
//     });
//     return Promise.reject(error);
//   },
// );

export default api;
