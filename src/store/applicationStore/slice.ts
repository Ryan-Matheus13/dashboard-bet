/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applicationInitialState } from "./initialState";
import { IMenu, ISetUser } from "./interfaces";

export const applicationSlice = createSlice({
  name: "application",
  initialState: applicationInitialState,
  reducers: {
    setMenu(state, action: PayloadAction<number>) {
      state.menu.loading = true;
      const menus = state.menu.data;
      menus.map((item: IMenu, i: number) => {
        if (i === action.payload) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      state.menu.data = menus;
      state.menu.loading = false;
    },

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
        loadingModal: false,
        page: 1,
        perPage: 10,
        total: 1,
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

    setStreams(state, action: PayloadAction<any>) {
      state.application.streams.data = action.payload;
      state.application.streams.loading = false;
      if (state.auth.loading) {
        state.auth.loading = false;
      }
    },

    setGames(state, action: PayloadAction<any>) {
      state.application.games.data = action.payload;
      state.application.games.loading = false;
    },

    setStories(state, action: PayloadAction<any>) {
      state.application.stories.data = action.payload;
      state.application.stories.loading = false;
    },

    pageChange(state, action: PayloadAction<number>) {
      state.application.page = action.payload;
    },
    perPageChange(state, action: PayloadAction<number>) {
      state.application.perPage = action.payload;
    },
  },
});
