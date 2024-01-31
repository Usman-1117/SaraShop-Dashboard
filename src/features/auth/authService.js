import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

//? Login
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//? Get Orders
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/all-orders/`, config);
  return response.data;
};

const authService = {
  login,
  getOrders,
};

export default authService;
