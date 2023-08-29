import axios from "axios"

export const api = axios.create({
  baseURL: "https://foodexplorer-api-vvc0.onrender.com"
  // baseURL: "http://localhost:3333"
});