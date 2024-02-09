import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

// Get All Blog Categories
export const getAllCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getBLogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Blog Categories
export const createBlogCategory = createAsyncThunk(
  "blogCategory/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await blogCategoryService.createBlogCategories(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// get a Category
export const getABlogCategory = createAsyncThunk(
  "blogCategory/get-category",
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Blog Category
export const updateABlogCategory = createAsyncThunk(
  "blogCategory/update-category",
  async (category, thunkAPI) => {
    try {
      return await blogCategoryService.updateBlogCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Category
export const deleteABlogCategory = createAsyncThunk(
  "blogCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  blogCategories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get All Blog Categories
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Create Blog Category
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Get A Blog Category
      .addCase(getABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCatName = action.payload.title;
      })
      .addCase(getABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      // Update Blog Category
      .addCase(updateABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogCat = action.payload;
      })
      .addCase(updateABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
