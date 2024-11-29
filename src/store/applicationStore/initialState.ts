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
    loadingModal: false,
    page: 1,
    perPage: 10,
    total: 1,
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
  menu: {
    loading: false,
    data: [
      {
        name: "Streams",
        to: "/dashboard/streams",
        active: true,
        disabled: false,
        Icon: "CastIcon",
      },
      {
        name: "Games",
        to: "/dashboard/games",
        active: false,
        disabled: false,
        Icon: "CasinoIcon",
      },
      {
        name: "Stories",
        to: "/dashboard/stories",
        active: false,
        disabled: false,
        Icon: "WebStoriesIcon",
      },
      {
        name: "Notificações",
        to: "/dashboard/notifications",
        active: false,
        disabled: false,
        Icon: "CampaignIcon",
      },
      {
        name: "Banners",
        to: "/dashboard/banners",
        active: false,
        disabled: true,
        Icon: "PermMediaIcon",
      },
    ],
  },
};
