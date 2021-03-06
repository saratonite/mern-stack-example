import axios from "axios";
import { getToken } from "./lib/TokenManager";

export const httpClient = new axios.create({
  baseURL: "http://localhost:4000/api/"
});

httpClient.interceptors.request.use(request => {
  const token = getToken();

  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

// Login request

export const Login = (email, password) => {
  return httpClient.post("login", { email, password });
};

export const RegisterUser = data => {
  return httpClient.post("register", data);
};

export const FetchUsers = () => {
  return httpClient.get("users");
};
