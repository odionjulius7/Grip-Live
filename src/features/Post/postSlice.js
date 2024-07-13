import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import postService from "./postServices";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  approvedPosts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getPosts = createAsyncThunk(
  "post/get-posts",
  async (token, thunkAPI) => {
    try {
      return await postService.getPosts(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getPubldPosts = createAsyncThunk(
  "post/get-published-posts",
  async (token, thunkAPI) => {
    try {
      return await postService.getPubldPosts(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSchdPosts = createAsyncThunk(
  "post/get-scheduled-posts",
  async (token, thunkAPI) => {
    try {
      return await postService.getSchdPosts(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//
export const getApprovePosts = createAsyncThunk(
  "post/get-approved-posts",
  async (items, thunkAPI) => {
    try {
      return await postService.getApprovedPosts(items);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAPost = createAsyncThunk(
  "post/get-a-post",
  async (ids, thunkAPI) => {
    try {
      return await postService.getAPost(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAUserPosts = createAsyncThunk(
  "post/get-user-posts",
  async (ids, thunkAPI) => {
    try {
      return await postService.getAUserPosts(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAPostComments = createAsyncThunk(
  "post/get-a-post-comment",
  async (ids, thunkAPI) => {
    try {
      return await postService.getAPostComments(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePostComment = createAsyncThunk(
  "post/delete-post-comment",
  async (ids, thunkAPI) => {
    try {
      return await postService.deletePostComment(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete-post",
  async (ids, thunkAPI) => {
    try {
      return await postService.deletePost(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const approvePost = createAsyncThunk(
  "post/approve-post-1",
  async (ids, thunkAPI) => {
    try {
      return await postService.approvePost(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unApprovePost = createAsyncThunk(
  "post/unApprove-post",
  async (ids, thunkAPI) => {
    try {
      return await postService.unApprovePost(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Graph   getMonthlyPost,
export const getMonthlyPost = createAsyncThunk(
  "users/get-monthly-posts",
  async (token, thunkAPI) => {
    try {
      return await postService.getMonthlyPost(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const getDailyPosts = createAsyncThunk(
  "users/get-daily-posts",
  async (token, thunkAPI) => {
    try {
      return await postService.getDailyPosts(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//
export const getPostsCommented = createAsyncThunk(
  "post/get-user-commented-posts",
  async (token, thunkAPI) => {
    try {
      return await postService.getPostsCommented(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create Post
export const postCreate = createAsyncThunk(
  "post/create-post",
  async (data, thunkAPI) => {
    try {
      return await postService.postCreate(data);
    } catch (error) {
      toast.error("Creating Post Failed, try again");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//
export const resetState = createAction("Reset_all");
//
export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder // Get Posts
      .addCase(postCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postCreate.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.posted = action.payload;
        state.message = "success";
      })
      .addCase(postCreate.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      //
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
        state.message = "success";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      //
      .addCase(getPubldPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPubldPosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
        state.message = "success";
      })
      .addCase(getPubldPosts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      //
      .addCase(getSchdPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchdPosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
        state.message = "success";
      })
      .addCase(getSchdPosts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get Approved Posts
      .addCase(getApprovePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApprovePosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessStatus = true;
        state.posts = action.payload;
        state.message = "success";
      })
      .addCase(getApprovePosts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessStatus = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get A User Posts
      .addCase(getAUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUserPosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.aUserPosts = action.payload;
        state.message = "success";
      })
      .addCase(getAUserPosts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // get monthly Posts
      .addCase(getMonthlyPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyPost.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlyPosts = action.payload;
        state.message = "success";
      })
      .addCase(getMonthlyPost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // get Daily Posts
      .addCase(getDailyPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDailyPosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.dailyPosts = action.payload;
        state.message = "success";
      })
      .addCase(getDailyPosts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get A Post's Comments
      .addCase(getAPostComments.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(getAPostComments.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.aPostComments = action.payload;
        state.message = "success";
      })
      .addCase(getAPostComments.rejected, (state, action) => {
        // state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get A Post
      .addCase(getAPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAPost.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
        state.message = "success";
      })
      .addCase(getAPost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Approve Post
      .addCase(approvePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approvePost.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedPost = action.payload;
        state.message = "success";
      })
      .addCase(approvePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Unapprove Post
      .addCase(unApprovePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unApprovePost.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.unApproved = action.payload;
        state.message = "success";
      })
      .addCase(unApprovePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessDel = true;
        state.deletedPost = action.payload;
        state.message = "success";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessDel = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Delete Post Comment
      .addCase(deletePostComment.pending, (state) => {
        state.isLoading1 = true;
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        // state.isError = false;
        state.isLoading1 = false;
        state.isSuccess = true;
        // state.deletedPost = action.payload;
        state.message = "success";
      })
      .addCase(deletePostComment.rejected, (state, action) => {
        // state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading1 = false;
      })
      // Get User Commented Posts
      .addCase(getPostsCommented.pending, (state) => {
        state.isLoading1 = true;
      })
      .addCase(getPostsCommented.fulfilled, (state, action) => {
        // state.isError = false;
        state.isLoading1 = false;
        state.isSuccess = true;
        state.postsCommentedOn = action.payload;
        state.message = "success";
      })
      .addCase(getPostsCommented.rejected, (state, action) => {
        // state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading1 = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
