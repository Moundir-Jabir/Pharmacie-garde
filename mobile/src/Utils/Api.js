import axios from "axios";

const Api = axios.create({
  baseURL: "http://192.168.137.1:5050/api/",
});

export default Api;
