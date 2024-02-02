import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";

// Get Blogs
export const getBlogs = createAsyncThunk(
  "blogs/get-blogs",
  async (thunkAPI) => {
    try {
      return await blogService.getBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Blog

export const createBlogs = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      return await blogService.createBlog(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  blogs: [],
  createdBlogs: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get BLogs
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });

    // Create BLogs
    builder
      .addCase(createBlogs.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogs = action.payload;
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;
