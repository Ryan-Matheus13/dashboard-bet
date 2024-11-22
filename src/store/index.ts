import { configureStore } from "@reduxjs/toolkit";
import { applicationSlice } from "./applicationStore/slice";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";

const persistConfigApplication = {
  key: "application",
  storage: storageSession,
  whitelist: ["application", "auth"],
  blacklist: ["register"],
};

const persistedApplicationReducer = persistReducer(
  persistConfigApplication,
  applicationSlice.reducer
);

export const store = configureStore({
  reducer: {
    application: persistedApplicationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);
