import { applicationSlice } from "./slice";

export const {
  setUser,
  destroySection,
  startLogin,
  setLoginError,
  clearLoginError,
} = applicationSlice.actions;
