import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:80",
  headers: {
    Authorization : `Bearer ${localStorage.getItem("token")}`
  },
});