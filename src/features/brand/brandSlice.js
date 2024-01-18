import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "./brandService";

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

const initialState = {
  brands: [],
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
  },
});

export default brandSlice.reducer;
