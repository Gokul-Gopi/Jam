import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND } from "../../api";

export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async () => {
    const { data } = await axios({
      method: "GET",
      url: `${BACKEND}/nortification`,
    });

    return data;
  }
);

const initialState = {
  loading: false,
  nortifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: {
    [getNotifications.pending]: (state) => {
      state.loading = true;
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.nortifications = action.payload.nortification;
      state.loading = false;
    },
    [getNotifications.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default notificationSlice.reducer;
