import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {axiosInstance} from "./service";
import {getCards, getCardById} from "./cardsSlice";

export const updateChecklist = createAsyncThunk(
  "checklist/updateChecklist",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/checklist/${payload.id}`, {title: payload.title});
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({id: payload.cardId}));
        return thunkAPI.dispatch(getCards());
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const createChecklist = createAsyncThunk(
  "checklist/createChecklist",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/checklist", payload);
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({id : payload.cardId}));
        return thunkAPI.dispatch(getCards())
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteChecklist = createAsyncThunk(
  "checklist/deleteChecklist",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/checklist/${payload.id}`);
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getCardById({id : payload.cardId}));
        return thunkAPI.dispatch(getCards())
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const checklistSlice = createSlice({
  name: "checklist",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default checklistSlice.reducer;