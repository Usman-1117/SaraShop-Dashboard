import axios from "axios";
import { base_url } from "../../utils/base_url";

// const getTokenFromLocalStorage = localStorage.getItem("user") ?
//    JSON.parse(localStorage.getItem("user"))
//   : null;

// const config = {
//   headers: {
//     Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
//     Accept: "application/json",
//   },
// };

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
  // console.log(config);
  const response = await axios.get(`${base_url}user/all-orders/`);
  return response.data;
};

const authService = {
  login,
  getOrders,
};

export default authService;
