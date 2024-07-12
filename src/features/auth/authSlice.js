import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { toast } from "react-toastify";

// get the user stored data in local storage from set in the authService
const getUserfromLocalStorage = localStorage.getItem("grip")
  ? JSON.parse(localStorage.getItem("grip"))
  : null;
// console.log(getUserfromLocalStorage);
const initialState = {
  user: getUserfromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      toast.error("Failed to login, try again");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/password",
  async (userData, thunkAPI) => {
    try {
      return await authService.changePassword(userData);
    } catch (error) {
      toast.error("Failed, try again");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create an async thunk for logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  // Clear the user data from state
  thunkAPI.dispatch(authSlice.actions.clearUser());

  // Clear the user data from localStorage (if needed)
  localStorage.removeItem("grip");

  // You can also add any other logout-related logic here
  return null; // Return null as there's no specific data needed for logout
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // Add a reducer to clear the user data
    clearUser: (state) => {
      state.user = null; // Set the user to null or empty on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.newCredentials = action.payload;
        state.message = "success";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});

export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
