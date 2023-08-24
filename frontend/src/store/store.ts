import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { appApi } from "../services/api";
import anchorReducer from "./slices/anchorSlice";

const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  anchor: anchorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

setupListeners(store.dispatch);

export type StoreState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
