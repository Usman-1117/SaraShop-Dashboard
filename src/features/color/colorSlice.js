import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk(
  "colors/get-colors",
  async (thunkAPI) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  colors: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColors.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getColors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.colors = action.payload;
    });

    builder.addCase(getColors.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    });
  },
});

export default colorSlice.reducer;
