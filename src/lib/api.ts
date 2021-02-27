import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.20.10:4000"
});


export default api;