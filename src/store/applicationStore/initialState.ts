import { IApplicationProps } from "./interfaces";
import CastIcon from "@mui/icons-material/Cast";
import CasinoIcon from "@mui/icons-material/Casino";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import CampaignIcon from "@mui/icons-material/Campaign";
import PermMediaIcon from "@mui/icons-material/PermMedia";

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
        Icon: CastIcon,
      },
      {
        name: "Games",
        to: "/dashboard/games",
        active: false,
        disabled: false,
        Icon: CasinoIcon,
      },
      {
        name: "Stories",
        to: "/dashboard/stories",
        active: false,
        disabled: false,
        Icon: WebStoriesIcon,
      },
      {
        name: "Notificações",
        to: "/dashboard/notifications",
        active: false,
        disabled: false,
        Icon: CampaignIcon,
      },
      {
        name: "Banners",
        to: "/dashboard/banners",
        active: false,
        disabled: true,
        Icon: PermMediaIcon,
      },
    ],
  },
};
