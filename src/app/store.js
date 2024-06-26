import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import prodCategoryReducer from "../features/prodCategory/prodCategorySlice";
import colorReducer from "../features/color/colorSlice";
import couponReducer from "../features/coupon/couponSlice";
import blogReducer from "../features/blogs/blogSlice";
import blogCategoryReducer from "../features/blogCategory/blogCategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    prodCategory: prodCategoryReducer,
    color: colorReducer,
    coupon: couponReducer,
    blog: blogReducer,
    blogCategory: blogCategoryReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
  },
});
