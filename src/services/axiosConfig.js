import Axios from "axios";
// import { setupCache } from 'axios-cache-interceptor';

const api = Axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json"
  }
});

// const api = setupCache(axios);  // blocking updates

export default api;
