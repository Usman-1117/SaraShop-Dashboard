import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get All Categories
const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

// Create Categories
const createCategories = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);
  return response.data;
};

// get Category ID
const getCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};

// Update Category
const updateCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.categoryData.title },
    config
  );
  return response.data;
};

// Delete Category
const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const prodCategoryService = {
  getProductCategories,
  createCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

export default prodCategoryService;
