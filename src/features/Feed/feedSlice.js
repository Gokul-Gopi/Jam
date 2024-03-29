import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND } from "../../api";
import callToastify from "../../utils/toast";

export const loadPosts = createAsyncThunk("feed/loadPosts", async () => {
  const { data } = await axios({
    method: "GET",
    url: `${BACKEND}/feed`,
  });

  return data;
});

export const createPost = createAsyncThunk(
  "feed/createPost",
  async (userPost) => {
    const { data } = await axios({
      method: "POST",
      url: `${BACKEND}/post`,
      data: { postInput: userPost },
    });

    return data;
  }
);

export const likePost = createAsyncThunk("feed/likePost", async (postID) => {
  const { data } = await axios({
    method: "POST",
    url: `${BACKEND}/post/like/${postID}`,
  });

  return data;
});

export const commentOnPost = createAsyncThunk(
  "feed/commentOnPost",
  async (userPayload) => {
    const { postID, commentInput } = userPayload;

    const { data } = await axios({
      method: "POST",
      url: `${BACKEND}/comment/${postID}`,
      data: { commentInput },
    });

    return data;
  }
);

const initialState = {
  loading: false,
  toast: null,
  posts: [],
  postMessage: null,
  success: false,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.posts.push(action.payload);
    },
    setMessage: (state, action) => {
      state[action.payload] = null;
    },
    incrementStatCount: (state, action) => {
      const { postId, data } = action.payload;
      state.posts.find((i) =>
        i.posts.find((j) => j._id === postId && j[data].push(postId))
      );
    },
  },
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.loading = true;
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.loading = false;
    },
    [loadPosts.rejected]: (state) => {
      state.loading = false;
    },
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      callToastify("Posted!", false);
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
    },

    [commentOnPost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
    },
    [commentOnPost.rejected]: (state, action) => {
      state.toast = callToastify("Somethings wrong please try again");
    },

    [likePost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.updatedPost.id) {
          return action.payload.updatedPost;
        }
        return post;
      });
    },
    [likePost.rejected]: (state, action) => {
      // state.message = action.payload.message;
    },
  },
});

export const { addComment, setMessage, incrementStatCount } = feedSlice.actions;
export default feedSlice.reducer;
