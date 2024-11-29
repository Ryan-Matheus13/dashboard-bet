import { applicationSlice } from "./slice";

export const {
  setMenu,
  setUser,
  destroySection,
  startLogin,
  setStreams,
  setGames,
  setStories,
  pageChange,
  perPageChange,
} = applicationSlice.actions;
