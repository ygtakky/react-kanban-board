import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCardById, getCards } from "./cardsSlice";
import { axiosInstance } from "./service";

export const updateChecklistItem = createAsyncThunk(
  "checklistItem/updateChecklistItem",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`checklist-item/${payload.id}`, {
        title: payload?.title,
        isChecked: payload?.isChecked,
      });
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({id: payload.cardId}));
        return thunkAPI.dispatch(getCards());
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const createChecklistItem = createAsyncThunk(
  "checklistItem/createChecklistItem",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`checklist-item`, {
        checklistId: payload.checklistId,
        title: payload.title,
        isChecked: payload.isChecked,
      });
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({id: payload.cardId}));
        return thunkAPI.dispatch(getCards());
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteChecklistItem = createAsyncThunk(
  "checklistItem/deleteChecklistItem",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`checklist-item/${payload.id}`);
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({id: payload.cardId}));
        return thunkAPI.dispatch(getCards());
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const checklistItemSlice = createSlice({
  name: "checklistItem",
  initialState: {},
  reducers: {},
  extraReducers: {}
});

export default checklistItemSlice.reducer;