import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND } from "../../api";

export const getUserDetails = createAsyncThunk(
  "profile/getProfileData",
  async () => {
    const { data } = await axios({
      method: "GET",
      url: `${BACKEND}/user/profile`,
    });

    return data;
  }
);

// export const getUsersPosts = createAsyncThunk('profile/getUsersPosts', async () => {
//     const { data } = await axios({
//         method: 'GET',
//         url: `${BACKEND}/post`,
//     })
//     console.log(data)
//     return data;
// })

const initialState = {
  loading: false,
  profileLoading: false,
  message: null,
  profileData: {},
  userPosts: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addCommentOnPost: (state, action) => {
      const { _id, text } = action.payload;
      state.userPosts.posts.forEach((post) => {
        if (post._id === _id) {
          post.comments.push({ _id: Date.now(), text });
        }
      });
    },
    incrementCountOnUserPost: (state, action) => {
      const { _id, objKey } = action.payload;
      state.userPosts.posts.forEach((post) => {
        if (post._id === _id) {
          post[objKey].push(Date.now());
        }
      });
    },
  },
  extraReducers: {
    [getUserDetails.pending]: (state) => {
      state.profileLoading = true;
    },
    [getUserDetails.fulfilled]: (state, action) => {
      const { userData, userPosts } = action.payload;
      state.userDetails = userData;
      state.userPosts = userPosts;
      state.profileLoading = false;
    },
    [getUserDetails.rejected]: (state, action) => {
      state.message = action.payload.message;
      state.profileLoading = true;
    },
  },
});
export const { addCommentOnPost, incrementCountOnUserPost } =
  profileSlice.actions;
export default profileSlice.reducer;
