import axios from "axios";

// Axios instance
// const api = axios.create({
//   baseURL: "http://localhost:7000/api",
// });

// const api = axios.create({
//   baseURL: "http://localhost:7000/api",
//   withCredentials: true, // cookie ke liye important
// });

const api = axios.create({
  baseURL: "http://localhost:7000/api",
  withCredentials: true, // if cookies
});


// JWT TOKEN AUTO ADD
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// CRUD functions
export const getProducts = () => api.get("/products");
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// default export for login & other requests
export default api;



// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:7000/api",
//   withCredentials: true, // cookie ke liye important
// });

// export default api;
