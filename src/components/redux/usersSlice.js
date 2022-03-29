import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosInstance} from "./service";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/user");
      if (response.statusText === "OK") {
        const users = response.data;
        return { users };
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: {
      [getUsers.fulfilled]: (state, action) => {
        return action.payload.users;
      },
      [getUsers.rejected]: (state, action) => {
        console.log(action.payload);
      },
    },
});

export default usersSlice.reducer;