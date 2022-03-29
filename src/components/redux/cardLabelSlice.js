import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./service";
import { getCards, getCardById } from "./cardsSlice";

export const createCardLabel = createAsyncThunk(
  "cardLabel/createCardLabel",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/card-label", payload);
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({ id: payload.cardId }))
        return thunkAPI.dispatch(getCards());
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCardLabel = createAsyncThunk(
  "cardLabel/deleteCardLabel",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/card-label/${payload.id}`);
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({ id: payload.cardId }))
        return thunkAPI.dispatch(getCards());
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const cardLabelSlice = createSlice({
  name: "cardLabel",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default cardLabelSlice.reducer;