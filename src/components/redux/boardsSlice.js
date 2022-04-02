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
      const response = await axiosInstance.put(`board/${payload.id}`, {
        title: payload.title,
      });
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
      const response = await axiosInstance.post("board", {
        title: payload.title,
      });
      if (response.statusText === "OK") {
        const board = response.data;
        return { board };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`board/${payload.id}`);
      if (response.statusText === "OK") {
        return payload;
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
    editTitle: false,
  },
  reducers: {
    resetCurrentBoard: (state) => {
      state.currentBoard = {};
    },
    toggleEditTitle: (state) => {
      state.editTitle = !state.editTitle;
    },
    changeListOrder: (state, action) => {
      const { listId, newIndex } = action.payload;
      const list = state.currentBoard.lists.find((list) => list.id === listId);
      const oldIndex = state.currentBoard.lists.indexOf(list);
      state.currentBoard.lists.splice(oldIndex, 1);
      state.currentBoard.lists.splice(newIndex, 0, list);
    },
    changeListItemOrder: (state, action) => {
      const { sourceIndex, newIndex, listIndex } = action.payload;
      const card = state.currentBoard.lists[listIndex].cards[sourceIndex];
      state.currentBoard.lists[listIndex].cards.splice(sourceIndex, 1);
      state.currentBoard.lists[listIndex].cards.splice(newIndex, 0, card);
    },
    changeItemList: (state, action) => {
      const {sourceIndex, newIndex, listIndex, newListIndex } = action.payload;
      const card = state.currentBoard.lists[listIndex].cards[sourceIndex];
      state.currentBoard.lists[listIndex].cards.splice(sourceIndex, 1);
      state.currentBoard.lists[newListIndex].cards.splice(newIndex, 0, card);
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
      state.currentBoard.lists.sort((a, b) => {
        if (a.order === null) {
          return 1;
        }
        if (b.order === null) {
          return 1;
        }
        return a.order - b.order;
      });
      state.currentBoard.lists.forEach((list) => {
        list.cards.sort((a, b) => {
          if (a.order === null) {
            return 1;
          }
          if (b.order === null) {
            return 1;
          }
          return a.order - b.order;
        });
      });
    },
    [getBoardById.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [updateBoard.fulfilled]: (state, action) => {
      const index = state.boards.findIndex(
        (board) => board.id === action.payload.board.id
      );
      state.boards[index] = {...state.boards[index], ...action.payload.board};
      state.currentBoard = {...state.currentBoard, ...action.payload.board};
    },
    [updateBoard.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [createBoard.fulfilled]: (state, action) => {
      state.boards.push(action.payload.board);
    },
    [createBoard.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [deleteBoard.fulfilled]: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload.id
      );
      resetCurrentBoard(state);
    },
    [deleteBoard.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { resetCurrentBoard, toggleEditTitle, changeListOrder ,changeListItemOrder, changeItemList } = boardsSlice.actions;

export default boardsSlice.reducer;
