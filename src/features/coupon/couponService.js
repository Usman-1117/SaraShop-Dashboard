import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get Coupons
const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);
  return response.data;
};

// Create Coupons
const createCoupons = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, config);
  return response.data;
};

// Get Coupon ID
const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);

  return response.data;
};

// Update Coupon
const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );
  return response.data;
};

// Delete Coupon
const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);

  return response.data;
};

const couponService = {
  getCoupons,
  createCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
