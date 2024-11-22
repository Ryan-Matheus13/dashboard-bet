/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applicationInitialState } from "./initialState";
import { ISetUser } from "./interfaces";

export const applicationSlice = createSlice({
  name: "application",
  initialState: applicationInitialState,
  reducers: {
    setUser(state, action: PayloadAction<ISetUser>) {
      state.auth.user = action.payload;
      state.auth.loading = false;
    },
    destroySection(state) {
      state.auth = {
        error: null,
        loading: false,
        user: {
          name: "",
          token: "",
        },
      };

      state.application = {
        streams: {
          data: [],
          error: null,
          loading: false,
        },
        games: {
          data: [],
          error: null,
          loading: false,
        },
        notifications: {
          data: [],
          error: null,
          loading: false,
        },
        stories: {
          data: [],
          error: null,
          loading: false,
        },
      };
    },
    startLogin(state) {
      state.auth.loading = true;
      state.auth.error = null;
    },
    setLoginError(state, action: PayloadAction<string>) {
      state.auth.error = action.payload;
    },
    clearLoginError(state) {
      state.auth.loading = false;
      state.auth.error = null;
    },

    setStreams(state, action: PayloadAction<any>) {
      console.log("payload: ", action.payload);
      state.application.streams.data = action.payload;
      state.application.streams.loading = false;
    },
    setLoadStreamsError(state, action: PayloadAction<string>) {
      state.application.streams.error = action.payload;
    },
    clearLoadStreamsError(state) {
      state.application.streams.loading = false;
      state.application.streams.error = null;
    },
  },
});
