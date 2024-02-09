import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get All Blog Categories
const getBLogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

// Create Categories
const createBlogCategories = async (blogCategory) => {
  const response = await axios.post(
    `${base_url}blogcategory/`,
    blogCategory,
    config
  );
  return response.data;
};

// get BLog Category ID
const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

// Update Blog Category
const updateBlogCategory = async (blogCategory) => {
  const response = await axios.put(
    `${base_url}blogcategory/${blogCategory.id}`,
    { title: blogCategory.blogCategoryData.title },
    config
  );
  return response.data;
};

// Delete Blog Category
const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const blogCategoryService = {
  getBLogCategories,
  createBlogCategories,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default blogCategoryService;
