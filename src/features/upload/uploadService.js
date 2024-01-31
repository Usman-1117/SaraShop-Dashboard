import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const uploadImg = async (data) => {
  const respone = await axios.post(`${base_url}upload/`, data, config);
  return respone;
};

const uploadService = {
  uploadImg,
};

export default uploadService;
