import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import introTextReducer from "../features/carousel/carousel";
import storage from "redux-persist/lib/storage";
import logStatus from "../features/user/user";
import { combineReducers } from "@reduxjs/toolkit";
import { setSnackBar } from "../features/snackbar/snackbar";
const persistConfig = {
  version: 1,
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  introText: introTextReducer,
  logStatus: logStatus,
  setSnackBar: setSnackBar,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);

export { persistor };
