import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:44339/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Tự động attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Handle error global
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }

//     if (error.response?.status === 403) {
//       alert("Bạn không có quyền truy cập.");
//     }

//     return Promise.reject(error);
//   },
// );
export default api;
