import axios from "axios";

import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";

export const axiosClient = axios.create({
  // baseURL: `http://localhost:4000`,
  baseURL: `https://angelpro-react.onrender.com`,
  // baseURL: `https://angel-pro-react-angelprocryptos-projects.vercel.app`,
  // baseURL: `${window.location.origin}`,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  // getting acccesstoken from the local storage
  const accessToken = getItem(KEY_ACCESS_TOKEN); // extracting token from the localstorage
  request.headers["Authorization"] = `Bearer ${accessToken}`; // sending access token in headers
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  if (data.status === "ok") {
    return data;
  }

  const originalRequest = response.config; // it stores the original request
  const statusCode = data.statusCode;
  const error = data.error;

  if (statusCode === 401 && originalRequest._retry) {
    const response = await axios
      .create({
        withCredentials: true,
      })
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

    if (response.data.status === "ok") {
      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;

      return axios(originalRequest);
    } else {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});
