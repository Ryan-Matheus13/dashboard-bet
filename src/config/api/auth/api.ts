import axios from "axios";

const apiAuth = axios.create({
  baseURL: process.env.NEXT_API_URL,
});

apiAuth.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    return error;
  }
);

export default apiAuth;
