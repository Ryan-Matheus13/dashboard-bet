import { IApplicationProps } from "./interfaces";

export const applicationInitialState: IApplicationProps = {
  auth: {
    error: null,
    loading: false,
    user: {
      name: "",
      token: "",
    },
  },
  application: {
    streams: {
      data: [],
      error: null,
      loading: true,
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
  },
};
