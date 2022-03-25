import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:80/auth/register", {
        username: payload.username,
        password: payload.password,
        passwordConfirm: payload.passwordConfirm,
      });

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("token", user.token);
        return {user};
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:80/auth/login", {
        username: payload.username,
        password: payload.password,
      });
      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("token", user.token);
        return {user};
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      state.isLoggedIn = action.payload.isLoggedIn;
      if (action.payload.isLoggedIn === false) {
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.id = action.payload.user.id;
      state.username = action.payload.user.username;
    },
    [signupUser.rejected]: (state, action) => {
      alert(action.payload);
    },
    [loginUser.fulfilled]: (state, action) => {
      state.id = action.payload.user.id;
      state.username = action.payload.user.username;
      state.isLoggedIn = true;
    },
    [loginUser.rejected]: (state, action) => {
      alert(action.payload);
    },
  },
});

export const { setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
