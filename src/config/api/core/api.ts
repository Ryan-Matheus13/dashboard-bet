import axios, { AxiosRequestHeaders } from "axios";

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
  config.headers = {
    Accept: "application/json",
    AccessControlAllowOrigin: "Origin",
    AccessControlAllowMethods: "DELETE, POST, GET, OPTIONS",
    Origin: process.env.NEXT_APP_URL,
    'Content-Type': "application/json",
    AccessControlAllowHeaders:
      "accept, authorization, content-type, user-agent, x-csrftoken, x-requested-with",
    "ngrok-skip-browser-warning": "any",
    ...config.headers,
  } as unknown as IHeaderConfig;

  return config;
});

apiCore.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    return error;
  }
);

export default apiCore;
