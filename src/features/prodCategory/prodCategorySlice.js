import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prodCategoryService from "./prodCategoryService";

// Get Categories
export const getCategories = createAsyncThunk(
  "productCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await prodCategoryService.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Categories
export const createCategory = createAsyncThunk(
  "productCategory/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await prodCategoryService.createCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  prodCategories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const prodCategorySlice = createSlice({
  name: "prodCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Brands
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.prodCategories = action.payload;
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      });

    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });
  },
});

export default prodCategorySlice.reducer;
