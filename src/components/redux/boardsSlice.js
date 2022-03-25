import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./service";

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
      const response = await axiosInstance.get(
        `board/${payload.id}`
      );
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
      const response = await axiosInstance.put(
        `board/${payload.id}`,
        { title: payload.title }
      );
      if (response.statusText === "OK") {
        const board = response.data;
        return { board };
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
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axiosInstance.post(
        "board",
        { title: payload.title },
        headers
      );
      if (response.statusText === "OK") {
        const board = response.data;
        return { board };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    currentBoard: {},
    boards: [],
  },
  reducers: {
    resetCurrentBoard: (state, action) => {
      state.currentBoard = {};
    },
  },
  extraReducers: {
    [getBoards.fulfilled]: (state, action) => {
      state.boards = action.payload.boards;
    },
    [getBoards.rejected]: (state, action) => {
      console.log(action);
    },
    [getBoardById.fulfilled]: (state, action) => {
      state.currentBoard = action.payload.board;
    },
    [getBoardById.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [updateBoard.fulfilled]: (state, action) => {
      const index = state.boards.findIndex(
        (board) => board.id === action.payload.board.id
      );
      state.boards[index] = action.payload.board;
    },
    [updateBoard.rejected]: (state, action) => {
      console.table(action.payload);
    },
    [createBoard.fulfilled]: (state, action) => {
      state.boards.push(action.payload.board);
    },
  },
});

export const { resetCurrentBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
