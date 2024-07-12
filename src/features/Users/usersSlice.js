import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import usersService from "./usersServices";

const initialState = {
  users: [],
  userAggregate: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  isSuccessRole: false,
  message: "",
  person: null,
};

export const getUsers = createAsyncThunk(
  "users/get-users",
  async (nums, thunkAPI) => {
    try {
      return await usersService.getUsers(nums);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const searchUserByName = createAsyncThunk(
  "users/search-users",
  async (nums, thunkAPI) => {
    try {
      return await usersService.searchUserByName(nums);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const searchCreatorsByName = createAsyncThunk(
  "users/search-creators",
  async (nums, thunkAPI) => {
    try {
      return await usersService.searchCreatorsByName(nums);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const getUsersByTopics = createAsyncThunk(
  "users/get-users-by-topics",
  async (items, thunkAPI) => {
    try {
      return await usersService.getUsersByTopics(items);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const getSuspUsers = createAsyncThunk(
  "users/get-suspended-users",
  async (nums, thunkAPI) => {
    try {
      return await usersService.getSuspUsers(nums);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const getCreatorUsers = createAsyncThunk(
  "users/get-creator-users",
  async (nums, thunkAPI) => {
    try {
      return await usersService.getCreatorUsers(nums);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const getMonthlyUsers = createAsyncThunk(
  "users/get-monthly-users",
  async (token, thunkAPI) => {
    try {
      return await usersService.getMonthlyUsers(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const getDailyUsers = createAsyncThunk(
  "users/get-daily-users",
  async (token, thunkAPI) => {
    try {
      return await usersService.getDailyUsers(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const getUserBookmarks = createAsyncThunk(
  "users/get-user-bookmarks",
  async (token, thunkAPI) => {
    try {
      return await usersService.getUserBookmarks(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsersAggregate = createAsyncThunk(
  "users/get-Aggregate",
  async (token, thunkAPI) => {
    try {
      return await usersService.getUsersAggregate(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAUser = createAsyncThunk(
  "user/get-a-user",
  async (ids, thunkAPI) => {
    try {
      return await usersService.getAUser(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// suspendAUser
export const suspendAUser = createAsyncThunk(
  "user/suspend-a-user",
  async (ids, thunkAPI) => {
    try {
      return await usersService.suspendAUser(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// UnsuspendAUser
export const UnsuspendAUser = createAsyncThunk(
  "user/Unsuspend-a-user",
  async (ids, thunkAPI) => {
    try {
      return await usersService.UnsuspendAUser(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeUserRole = createAsyncThunk(
  "user/change-user-role",
  async (ids, thunkAPI) => {
    try {
      return await usersService.changeUserRole(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setPageData: (state, action) => {
      state.person = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder // Get Users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        state.message = "success";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // search Users By Name
      .addCase(searchUserByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUserByName.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        state.message = "success";
      })
      .addCase(searchUserByName.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get User By Topics
      .addCase(getUsersByTopics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersByTopics.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.usersTopics = action.payload;
        state.message = "success";
      })
      .addCase(getUsersByTopics.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get Susp. Users
      .addCase(getSuspUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuspUsers.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.suspendeUsers = action.payload;
        state.message = "success";
      })
      .addCase(getSuspUsers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      //  Susp. A User
      .addCase(suspendAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(suspendAUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.suspendAU = action.payload;
        state.message = "success";
      })
      .addCase(suspendAUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      //  Unsusp. A User
      .addCase(UnsuspendAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UnsuspendAUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.unSuspendAU = action.payload;
        state.message = "success";
      })
      .addCase(UnsuspendAUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get all creators
      .addCase(getCreatorUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCreatorUsers.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.creators = action.payload;
        state.message = "success";
      })
      .addCase(getCreatorUsers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // search Creators By Name
      .addCase(searchCreatorsByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchCreatorsByName.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.creators = action.payload;
        state.message = "success";
      })
      .addCase(searchCreatorsByName.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Aggregate
      .addCase(getUsersAggregate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersAggregate.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userAggregate = action.payload;
        state.message = "success";
      })
      .addCase(getUsersAggregate.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // get a user
      .addCase(getAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // get monthly users
      .addCase(getMonthlyUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyUsers.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.monthlyUser = action.payload;
        state.message = "success";
      })
      .addCase(getMonthlyUsers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // get monthly users
      .addCase(getDailyUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDailyUsers.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.dailyUser = action.payload;
        state.message = "success";
      })
      .addCase(getDailyUsers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Change User Role
      .addCase(changeUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessRole = true;
        state.updatedRole = action.payload;
        state.message = "success";
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessRole = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Change User Role
      .addCase(getUserBookmarks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBookmarks.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessRole = true;
        state.userBookmarks = action.payload;
        state.message = "success";
      })
      .addCase(getUserBookmarks.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessRole = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export const { setPageData } = usersSlice.actions;
export default usersSlice.reducer;
