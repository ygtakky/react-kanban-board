import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./service";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "auth/register",
        {
          username: payload.username,
          password: payload.password,
          passwordConfirm: payload.passwordConfirm,
        },
      );

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("token", user.token);
        return { user };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        username: payload.username,
        password: payload.password,
      });
      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("token", user.token);
        return { user };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    username: "",
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.authToken = action.payload.token;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.id = action.payload.user.id;
      state.username = action.payload.user.username;
      state.isLoggedIn = true;
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    },
    [signupUser.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [loginUser.fulfilled]: (state, action) => {
      state.id = action.payload.user.id;
      state.username = action.payload.user.username;
      state.isLoggedIn = true;
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    },
    [loginUser.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
