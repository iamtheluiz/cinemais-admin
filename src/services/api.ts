import axios from "axios"

export const api = axios.create({
  // baseURL: "http://192.168.0.100:3000"
  // baseURL: "https://cinemais-api.luizvasconcellos.com.br"
  baseURL: "https://cinemais-api.onrender.com"
})