import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get All Brands
const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);
  return response.data;
};

// Create Brands
const createBrands = async (brand) => {
  const response = await axios.post(`${base_url}brand/`, brand, config);
  return response.data;
};

// get Brand ID
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);
  return response.data;
};

// Update Brand
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );
  return response.data;
};

// Delete Brand
const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);
  return response.data;
};

const brandService = {
  getBrands,
  createBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
