import axios from "axios"

export const api = axios.create({
  baseURL: "__CINEMAIS_API_URL__"
})