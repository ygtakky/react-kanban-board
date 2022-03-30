import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getCardById, getCards } from './cardsSlice';
import { axiosInstance } from './service';

export const getLabels = createAsyncThunk('labels/getLabels', async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/label');
    if (response.statusText === 'OK') {
      const labels = response.data;
      return { labels };
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const addLabel = createAsyncThunk('labels/addLabel', async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/card-label', {labelId: payload.id, cardId: payload.cardId});
    if (response.statusText === 'OK') {
      thunkAPI.dispatch(getCardById({id :payload.cardId}));
      return thunkAPI.dispatch(getCards());
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const removeLabel = createAsyncThunk('labels/removeLabel', async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/card-label/${payload.id}`);
    if (response.statusText === 'OK') {
      thunkAPI.dispatch(getCardById({id :payload.cardId}));
      return thunkAPI.dispatch(getCards());
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

const labelsSlice = createSlice({
  name: 'labels',
  initialState: [],
  reducers: {},
  extraReducers: {
  [getLabels.fulfilled]: (state, action) => {
    return action.payload.labels
  },
  [getLabels.rejected]: (state, action) => {
    console.log(action.payload);
  },
}
});

export default labelsSlice.reducer;