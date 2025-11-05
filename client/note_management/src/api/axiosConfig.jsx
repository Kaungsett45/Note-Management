import axios from "axios";

const BASE_URL = "http://localhost:5002";

export const API = axios.create({
  baseURL: BASE_URL,
});

export default API;