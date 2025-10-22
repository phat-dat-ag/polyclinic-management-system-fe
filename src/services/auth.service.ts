import axiosClient from "../api/axiosClient";
import type { LoginType, RegisterType } from "../types/auth.types";

export const register = (data: RegisterType) => {
  return axiosClient.post("/api/v1/auth/register", data);
};
export const login = (data: LoginType) => {
  return axiosClient.post("/api/v1/auth/login", data);
};
