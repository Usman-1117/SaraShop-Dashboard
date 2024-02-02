import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  // console.log(response.data);
  return response.data;
};

// Create Category
const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);
  return response.data;
};

const prodCategoryService = {
  getProductCategories,
  createCategory,
};

export default prodCategoryService;
