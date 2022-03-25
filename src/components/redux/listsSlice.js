import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./helpers";

// Get list probably not needed board by id already returns this
/* export const getLists = createAsyncThunk(
  "lists/getLists",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get("list/");
      if (response.statusText === "OK") {
        const lists = response.data
        return { lists };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.payload);
    }
  }
) */

export const getListsById = createAsyncThunk(
  "lists/getLists",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`list?boardId=${payload.id}`);
      if (response.statusText === 'OK') {
        const lists = response.data;
        return { lists };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.payload);
    }
  }
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`list/${payload.id}`)
      if (response.statusText === "OK") {
        return payload;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.payload)
    }
  }
)

export const createList = createAsyncThunk(
  "lists/createList",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post("list", { title: payload.title ,boardId: payload.boardId});
      if (response.statusText === "OK") {
        const list = response.data;
        return { list };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.payload);
    }
  }
);

export const updateList = createAsyncThunk(
  "lists/updateList",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`list/${payload.id}`, { title: payload.title })
      if (response.statusText === "OK") {
        const list = response.data;
        return { list }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.payload)
    }
  }
)

const listsSlice = createSlice({
  name: "lists",
  initialState: [],
  reducers: {},
  extraReducers: {
    // Get list extra reducers
    /* [getLists.fulfilled]: (state, action) => {
      state.lists = action.payload.lists;
    },
    [getLists.rejected]: (state, action) => {
      alert(action.payload);
    }, */
    [getListsById.fulfilled]: (state, action) => {
      return action.payload.lists;
    },
    [getListsById.rejected]: (state, action) => {
      console.table(action.payload)
    },
    [deleteList.fulfilled]: (state, action) => {
      return state.filter((list) => list.id !== action.payload.id)
    },
    [createList.fulfilled]: (state, action) => {
      state.push(action.payload.list)
    },
    [createList.rejected]: (state, action) => {
      console.table(action.payload)
    },
    [updateList.fulfilled]: (state, action) => {
      const index = state.currentLists.findIndex((list) => list.id === action.payload.list.id)
      state[index] = action.payload.list;
    },
    [updateList.rejected]: (state, action) => {
      console.table(action.payload);
    }
  },
});

export default listsSlice.reducer;