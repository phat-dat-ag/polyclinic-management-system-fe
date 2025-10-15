import type { User } from "./user.types";

export interface LoginType {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
