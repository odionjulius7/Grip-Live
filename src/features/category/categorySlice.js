import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryServices";
import { toast } from "react-toastify";

const initialState = {
  category: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createTag = createAsyncThunk(
  "category/create-category",
  async (items, thunkAPI) => {
    try {
      return await categoryService.createTag(items);
    } catch (error) {
      toast.error("Failed, try again");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/get-categories",
  async (token, thunkAPI) => {
    try {
      return await categoryService.getCategories(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create Category
      .addCase(createTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
        state.message = "success";
      })
      .addCase(createTag.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // create Category
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.category = action.payload;
        state.message = "success";
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
