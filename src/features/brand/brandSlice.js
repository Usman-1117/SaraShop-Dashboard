import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "./brandService";

// Get Brands
export const getBrands = createAsyncThunk(
  "brands/get-brands",
  async (thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Brands
export const createBrands = createAsyncThunk(
  "brand/create-brands",
  async (brandData, thunkAPI) => {
    try {
      return await brandService.createBrands(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  brands: [],
  createdBrand: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Brands
    builder.addCase(getBrands.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.brands = action.payload;
    });

    builder.addCase(getBrands.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });

    // Create Brands
    builder.addCase(createBrands.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createdBrand = action.payload;
    });

    builder.addCase(createBrands.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });
  },
});

export default brandSlice.reducer;
