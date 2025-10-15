import axiosClient from "../api/axiosClient";
import type { LoginType } from "../types/auth.types";

export const login = (data: LoginType) => {
  return axiosClient.post("/api/v1/auth/login", data);
};
