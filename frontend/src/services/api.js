import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  
  baseURL: "https://bulk-email-sender-421m.onrender.com",
  withCredentials: true,
});

export default api;