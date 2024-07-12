import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersSlice from "../features/Users/usersSlice";
import postSlice from "../features/Post/postSlice";
import categorySlice from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersSlice,
    post: postSlice,
    category: categorySlice,
  },
});
