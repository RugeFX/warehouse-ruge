import type { User } from "./user";

export type LoginResponse = {
  message: string;
  user: User;
  token: string;
  refreshToken: string;
};

export type RefreshResponse = {
  message: string;
  token: string;
};
