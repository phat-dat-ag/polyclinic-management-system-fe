import type { User } from "./user.types";

export interface RegisterType {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: string;
}

export interface LoginType {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
