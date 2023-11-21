import type { Staff, User } from "./user";

export type BaseResponse = {
  message: string;
};

export type LoginResponse = BaseResponse & {
  user: User;
  token: string;
  refreshtoken: string;
};

export type RefreshResponse = BaseResponse & {
  token: string;
};

export type ProfileUpdateResponse = BaseResponse & {
  staff: Staff;
};
