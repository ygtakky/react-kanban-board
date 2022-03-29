import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "./service";
import {getCards, getCardById} from "./cardsSlice"

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/comment", payload);
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({id : payload.cardId}));
        return thunkAPI.dispatch(getCards())
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/comment/${payload.id}`);
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({id : payload.cardId}));
        return thunkAPI.dispatch(getCards())
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const commentsSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    setComments: (state, action) => {
      return action.payload;
    }
  },
  extraReducers: {
    [createComment.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [deleteComment.rejected]: (state, action) => {
      console.log(action.payload);
    }
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;