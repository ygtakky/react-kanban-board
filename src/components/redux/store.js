import { configureStore, combineReducers, createAction } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import boardsReducer from "./boardsSlice";
import listsReducer from "./listsSlice";
import cardsReducer from "./cardsSlice";
import boardMembersReducer from "./boardMembersSlice";
import commentsReducer from "./commentsSlice";
import cardLabelReducer from "./cardLabelSlice";
import checklistReducer from "./checklistSlice";
import checklistItemReducer from "./checklistItemSlice";
import usersReducer from "./usersSlice";
import labelsReducer from "./labelsSlice";

const combinedReducers = combineReducers({
  user: userReducer,
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer,
  boardMembers: boardMembersReducer,
  comments: commentsReducer,
  cardLabel: cardLabelReducer,
  labels: labelsReducer,
  checklist: checklistReducer,
  checklistItem: checklistItemReducer,
  users: usersReducer,
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
