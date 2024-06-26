import axios from "axios";
const API = "http://localhost:4001/api";
export const registerRequest = user => axios.post(`${API}/register`, user);
