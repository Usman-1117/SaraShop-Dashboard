import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get All Colors
const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);
  return response.data;
};

// Create Colors
const createColors = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, config);
  return response.data;
};

// Get Color ID
const getColor = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`, config);
  return response.data;
};

// Update Color
const updateColor = async (color) => {
  const response = await axios.put(
    `${base_url}category/${color.id}`,
    { title: color.colorData.title },
    config
  );
  return response.data;
};

// Delete Color
const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);
  return response.data;
};

const colorService = {
  getColors,
  createColors,
  getColor,
  updateColor,
  deleteColor,
};

export default colorService;
