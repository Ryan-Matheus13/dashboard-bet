import axios, { AxiosRequestHeaders } from "axios";
import { useAppSelector } from "@/store/hooks/useAppSelector";

interface IHeaderConfig extends AxiosRequestHeaders {
  Authorization: string;
  Accept: string;
  AccessControlAllowOrigin: string;
  AccessControlAllowMethods: string;
  AccessControlAllowHeaders: string;
}

const apiCore = axios.create({
  baseURL: process.env.NEXT_API_URL,
});

apiCore.interceptors.request.use(async (config) => {
  const { auth } = useAppSelector((store) => store.application);
  config.headers = {
    Authorization: `Bearer ${auth.user.token}`,
    Accept: "application/json",
    AccessControlAllowOrigin: "Origin",
    AccessControlAllowMethods: "DELETE, POST, GET, OPTIONS",
    AccessControlAllowHeaders:
      "accept, authorization, content-type, user-agent, x-csrftoken, x-requested-with",
    "ngrok-skip-browser-warning": "any",
  } as unknown as IHeaderConfig;

  return config;
});

apiCore.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    return error.response;
  }
);

export default apiCore;
