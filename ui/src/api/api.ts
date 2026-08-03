import axios from "axios";

const api = axios.create({
  baseURL: "https://website-monitor-48kx.onrender.com/websites",
  // baseURL: "http://localhost:3000/websites",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
