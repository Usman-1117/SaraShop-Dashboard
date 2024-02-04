import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";

// Get coupons
export const getAllCoupons = createAsyncThunk(
  "coupons/get-coupons",
  async (thunkAPI) => {
    try {
      return await couponService.getCoupon();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create coupons
export const createCoupons = createAsyncThunk(
  "coupon/create-coupons",
  async (couponData, thunkAPI) => {
    try {
      return await couponService.createCoupons(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  coupons: [],
  createdCoupon: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get coupons
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })

      .addCase(getAllCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });

    // Create coupons
    builder
      .addCase(createCoupons.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupon = action.payload;
      })

      .addCase(createCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
