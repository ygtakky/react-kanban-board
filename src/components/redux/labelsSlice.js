import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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