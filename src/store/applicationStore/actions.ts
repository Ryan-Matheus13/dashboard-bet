import { applicationSlice } from "./slice";

export const {
  setUser,
  destroySection,
  startLogin,
  setLoginError,
  clearLoginError,
  setStreams,
  setLoadStreamsError,
  clearLoadStreamsError,
} = applicationSlice.actions;
