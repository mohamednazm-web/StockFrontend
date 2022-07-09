import axios from "axios"

const baseUrl = "http://localhost:2001"

const API = axios.create({
  baseURL: baseUrl,
})

export { API }
