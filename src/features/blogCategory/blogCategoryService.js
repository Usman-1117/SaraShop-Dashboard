import axios from "axios";
import { base_url } from "../../utils/base_url";


const getBLogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory//`);
  // console.log(response.data);
  return response.data;
};



const blogCategoryService = {
  getBLogCategories,
};

export default blogCategoryService;
