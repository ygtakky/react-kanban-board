import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE} from "redux-persist"
import userReducer from "./userSlice";
import boardsReducer from "./boardsSlice";
import listsReducer from "./listsSlice";

const reducers = combineReducers({
  user: userReducer,
  boards: boardsReducer,
  lists: listsReducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const presistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})