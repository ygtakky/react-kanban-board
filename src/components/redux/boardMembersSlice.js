// board-members slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./service";

export const getBoardMembers = createAsyncThunk(
  "board-members/getBoardMembers",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/board-member?boardId=${payload.boardId}`
      );
      if (response.statusText === "OK") {
        const boardMembers = response.data;
        return { boardMembers };
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBoardMember = createAsyncThunk(
  "board-members/deleteBoardMember",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/board-member/${payload.id}`
      );
      if (response.statusText === "OK") {
        return payload;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addBoardMember = createAsyncThunk(
  "board-members/addBoardMember",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/board-member", payload);
      if (response.statusText === "OK") {
        const boardMember = response.data;
        return { boardMember };
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const boardMembersSlice = createSlice({
  name: "boardMembers",
  initialState: {
    boardMembers: [],
    isFetching: false,
  },
  reducers: {},
  extraReducers: {
    [getBoardMembers.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBoardMembers.fulfilled]: (state, action) => {
      state.boardMembers = action.payload.boardMembers;
      state.isFetching = false;
    },
    [getBoardMembers.rejected]: (state, action) => {
      state.isFetching = false;
    },
    [deleteBoardMember.fulfilled]: (state, action) => {
      state.boardMembers = state.boardMembers.filter(
        (boardMember) =>
          boardMember.userId !== action.payload.boardMember.userId
      );
    },
    [addBoardMember.fulfilled]: (state, action) => {
      state.boardMembers.push(action.payload.boardMember);
    },
  },
});

export default boardMembersSlice.reducer;
