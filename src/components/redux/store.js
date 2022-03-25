import { configureStore, combineReducers, createAction } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import boardsReducer from "./boardsSlice";
import listsReducer from "./listsSlice";

const combinedReducers = combineReducers({
  user: userReducer,
  boards: boardsReducer,
  lists: listsReducer,
});

export const resetAction = createAction("reset")

const rootReducer = (state, action) => {
  if (resetAction.match(action)) {
    return combinedReducers(undefined,action)
  }
  return combinedReducers(state,action)
}

export default configureStore({
  reducer: rootReducer
});
