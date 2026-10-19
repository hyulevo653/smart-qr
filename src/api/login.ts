import { onResponse, onResponseError } from "./axios-client";
import { API_URL, SERVER_URL } from "@/constants";
import axios, { AxiosResponse } from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    ["Content-Type"]: "application/json",
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: "brackets" });
  },
});

axiosClient.interceptors.response.use(onResponse, onResponseError);
type LoginResponse = {
  user: string;
  token: string;
};

export const loginApi = {
  login(): void {
    window.location.href = `${API_URL}/auth/signin`;
  },

  register(): void {
    window.location.href = `${API_URL}/auth/signup`;
  },

  loginCallback(code: string): Promise<any> {
    return axiosClient.get(`/auth/thirdparty/callback`, {
      params: {
        code,
      },
    });
  },

  getUserInfo(id: number): Promise<AxiosResponse<LoginResponse>> {
    return axiosClient.get<LoginResponse>(`/users/${id}`);
  },
};
