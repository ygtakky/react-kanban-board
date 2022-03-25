import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./helpers";

export const getBoards = createAsyncThunk(
  "boards/getBoards",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get("board");
      if (response.statusText === "OK") {
        const boards = response.data;
        return { boards };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getBoardById = createAsyncThunk(
  "boards/getBoardById",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`board/${payload.id}`);
      if (response.statusText === "OK") {
        const board = response.data;
        return { board };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`board/${payload.id}`, {title: payload.title});
      if (response.statusText === "OK") {
        const board = response.data
        return {board};
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post("board", {title: payload.title});
      if (response.statusText === "OK") {
        const board = response.data
        return { board }; 
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    currentBoard: {},
    boards: [],
  },
  reducers: {},
  extraReducers: {
    [getBoards.fulfilled]: (state, action) => {
      state.boards = action.payload.boards;
    },
    [getBoards.rejected]: (state, action) => {
      alert(action.payload);
    },
    [getBoardById.fulfilled]: (state, action) => {
      state.currentBoard = action.payload.board;
    },
    [getBoardById.rejected]: (state, action) => {
      alert(action.payload);
    },
    [updateBoard.fulfilled]: (state, action) => {
      const index = state.boards.findIndex((board) => board.id === action.payload.board.id);
      state.boards[index] = action.payload.board;
    },
    [updateBoard.rejected]: (state, action) => {
      console.table(action.payload);
    },
    [createBoard.fulfilled]: (state, action) => {
      state.boards.push(action.payload.board);
    }
  },
});

export default boardsSlice.reducer;