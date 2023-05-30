import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import apiReducer from "./apiSlice";
import selectUserReducer from "./selectedUserSlice";

const store = configureStore({
  reducer: {
    api: apiReducer,
    selectUser: selectUserReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;