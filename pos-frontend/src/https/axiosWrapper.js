import axios from "axios";
import { getCachedData, setCachedData } from "../utils/offlineCache";

const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const axiosWrapper = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: { ...defaultHeader },
});

const isNetworkError = (error) => {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return true;
  }

  const message = String(error?.message ?? "").toLowerCase();
  return error?.code === "ERR_NETWORK" || message.includes("network error");
};

axiosWrapper.interceptors.response.use(
  (response) => {
    const method = response?.config?.method?.toLowerCase();

    if (method === "get" && response?.status === 200) {
      setCachedData(response.config, response.data);
    }

    return response;
  },
  (error) => {
    const config = error?.config;
    const method = config?.method?.toLowerCase();

    if (method === "get" && isNetworkError(error)) {
      const cachedPayload = getCachedData(config);

      if (cachedPayload) {
        return Promise.resolve({
          data: cachedPayload,
          status: 200,
          statusText: "OK (cache)",
          headers: {},
          config,
          request: undefined,
        });
      }
    }

    return Promise.reject(error);
  }
);
