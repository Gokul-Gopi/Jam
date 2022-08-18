import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../../api";
import axios from "axios";
import callToastify from "../../utils/toast";

const loginUser = createAsyncThunk("auth/loginUser", async (userDetails) => {
  const { data } = await axios({
    method: "POST",
    url: `${BACKEND}/user/login`,
    data: userDetails,
  });
  return data;
});

const signUpUser = createAsyncThunk("auth/signUpUser", async (userDetails) => {
  const { data } = await axios({
    method: "POST",
    url: `${BACKEND}/user/signup`,
    data: userDetails,
  });

  return data;
});

const initialState = {
  loading: false,
  isLoggedIn: false,
  userName: null,
  userID: null,
  toast: null,
  success: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    setToken: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload.name;
      axios.defaults.headers.common["Authorization"] = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem("userDetails");
      axios.defaults.headers.common["authorization"] = null;
      state.isLoggedIn = false;
      state.success = false;
    },
  },

  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.toast = `Please log into your account`;
      state.success = action.payload.success;
      state.loading = false;
    },
    [signUpUser.rejected]: (state, action) => {
      state.toast = callToastify("Sign Up failed", true);
      state.loading = false;
    },

    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { name, token, id, success } = action.payload;
      if (success) {
        localStorage.setItem("userDetails", JSON.stringify({ name, token }));
      }
      axios.defaults.headers.common["Authorization"] = token;
      state.userName = name;
      state.userID = id;
      state.isLoggedIn = true;
      state.toast = callToastify("Successfully logged in!");
      state.loading = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.toast = callToastify("Login failed", true);
      state.loading = false;
    },
  },
});

export { loginUser, signUpUser };
export const { setToast, setToken, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
