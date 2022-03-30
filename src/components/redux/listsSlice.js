import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBoardById, getBoards } from "./boardsSlice";
import { axiosInstance } from "./service";

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
        thunkAPI.dispatch(getBoardById({id: payload.boardId}));
        thunkAPI.dispatch(getBoards())
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
        thunkAPI.dispatch(getBoardById({id: payload.boardId}));
        thunkAPI.dispatch(getBoards())
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
      const response = await axiosInstance.put(`list/${payload.id}`, { title: payload.title, order: payload.order});
      if (response.statusText === "OK") {
        thunkAPI.dispatch(getBoardById({id: payload.boardId}));
        thunkAPI.dispatch(getBoards())
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
  initialState: {
    lists: [],
    isFetching: true,
  },
  reducers: {
    resetLists: (state, action) => {
      state.lists = [];
    },
    toggleListFetching: (state, action) => {
      state.isFetching = action.payload;
    }
  },
  extraReducers: {
    // Get list extra reducers
    /* [getLists.fulfilled]: (state, action) => {
      state.lists = action.payload.lists;
    },
    [getLists.rejected]: (state, action) => {
      alert(action.payload);
    }, */
    [getListsById.fulfilled]: (state, action) => {
      state.lists = action.payload.lists;
      state.isFetching = false;
    },
    [getListsById.rejected]: (state, action) => {
      console.table(action.payload)
    },
    [deleteList.fulfilled]: (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload.id)
    },
    [deleteList.rejected]: (state, action) => {
      console.log(action.payload)
    },
    [createList.fulfilled]: (state, action) => {
      state.lists.push(action.payload.list)
    },
    [createList.rejected]: (state, action) => {
      console.table(action.payload)
    },
    [updateList.fulfilled]: (state, action) => {
      const index = state.lists.findIndex((list) => list.id === action.payload.list.id)
      state.lists[index] = action.payload.list;
    },
    [updateList.rejected]: (state, action) => {
      console.table(action.payload);
    }
  },
});

export const {resetLists, toggleListFetching} = listsSlice.actions

export default listsSlice.reducer;
