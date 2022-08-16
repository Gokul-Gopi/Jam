import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND } from "../../api";

export const getUsers = createAsyncThunk("explore/getUsers", async () => {
  const { data } = await axios({
    method: "GET",
    url: `${BACKEND}/user`,
  });

  return data;
});

export const followUser = createAsyncThunk(
  "explore/followUser",
  async (userID) => {
    const { userToFollow } = userID;
    const { data } = await axios({
      method: "POST",
      url: `${BACKEND}/user/follow`,
      data: { userToFollow },
    });

    return data;
  }
);

const initialState = {
  loading: false,
  message: null,
  users: [],
  usersFollowed: [],
};

export const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = state.users.map((i) => {
        if (i._id === action.payload) {
          i.following = !i.following;
        }
        return i;
      });
    },

    setFollowedUsers: (state, action) => {
      state.usersFollowed = state.usersFollowed.push(action.payload);
    },

    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users;
      state.message = action.payload.message;
      state.loading = false;
    },
    [getUsers.rejected]: (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    },
    [followUser.fulfilled]: (state, action) => {
      state.users = state.users.map((user) => {
        if (user._id === action.payload.updatedFollowers) {
          return { ...user, following: !user.following };
        }
        return user;
      });
    },
    [followUser.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
  },
});

export const { setMessage, setUsers, setFollowedUsers } = exploreSlice.actions;
export default exploreSlice.reducer;
