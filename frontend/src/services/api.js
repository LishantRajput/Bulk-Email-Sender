import axios from "axios";

const api = axios.create({
  baseURL: "https://bulk-email-sender-421m.onrender.com",
  withCredentials: true,
});

export default api;