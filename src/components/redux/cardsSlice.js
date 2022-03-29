//card store slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoardById } from "./boardsSlice";
import { setComments } from "./commentsSlice";
import { axiosInstance } from "./service";

export const getCards = createAsyncThunk(
  "cards/getCards",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/card");
      if (response.statusText === "OK") {
        const cards = response.data;
        return { cards };
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCardById = createAsyncThunk("cards/getCardById", async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/card/${payload.id}`);
    if (response.statusText === "OK") {
      const card = response.data;
      thunkAPI.dispatch(setComments(card.comments))
      return { card };
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const deleteCard = createAsyncThunk("cards/deleteCard", async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/card/${payload.id}`);
    if (response.statusText === "OK") {
      thunkAPI.dispatch(getBoardById(payload.boardId));
      return payload;
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const createCard = createAsyncThunk("cards/createCard", async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/card", {
      title: payload.title,
      listId: payload.listId,
    });
    if (response.statusText === "OK") {
      thunkAPI.dispatch(getBoardById(payload.boardId));
      const card = response.data;
      return { card };
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

export const updateCard = createAsyncThunk("cards/updateCard", async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`/card/${payload.id}`, payload);
    if (response.statusText === "OK") {
      thunkAPI.dispatch(getBoardById(payload.boardId));
      const card = response.data;
      return { card };
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    currentCard: {},
    cards: [],
    isFetching: true, 
  },
  reducers: {
    resetCurrentCard: (state) => {
      state.currentCard = {};
    },
  },
  extraReducers: {
    [getCards.fulfilled]: (state, action) => {
      state.cards = action.payload.cards;
      state.isFetching = false;
    },
    [getCards.pending]: (state) => {
      state.isFetching = true;
    },
    [getCards.rejected]: (state, action) => {
      state.isFetching = false;
      console.log(action.payload);
    },
    [getCardById.fulfilled]: (state, action) => {
      state.currentCard = action.payload.card;
      state.isFetching = false;
    },
    [getCardById.pending]: (state) => {
      state.isFetching = true;
    },
    [getCardById.rejected]: (state, action) => {
      state.isFetching = false;
      console.log(action.payload);
    },
    [deleteCard.fulfilled]: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload.id);
    },
    [deleteCard.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteCard.rejected]: (state, action) => {
      state.isFetching = false;
      console.log(action.payload);
    },
    [createCard.fulfilled]: (state, action) => {
      state.cards.push(action.payload.card);
    },
    [createCard.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [updateCard.fulfilled]: (state, action) => {
      state.cards = state.cards.map((card) =>
        card.id === action.payload.card.id ? action.payload.card : card
      );
    },
    [updateCard.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const {resetCurrentCard} = cardsSlice.actions;

export default cardsSlice.reducer;
