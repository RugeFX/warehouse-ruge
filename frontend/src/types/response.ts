import type { MenuGroup, Staff, User } from "./user";

export type BaseResponse = {
  message: string;
};

export type LoginResponse = BaseResponse & {
  user: User;
  privilege: MenuGroup[];
  token: string;
  refreshtoken: string;
};

export type RefreshResponse = BaseResponse & {
  token: string;
};

export type ProfileUpdateResponse = BaseResponse & {
  staff: Staff;
};

export type UserUpdateResponse = BaseResponse & {
  user: Omit<User, "staff">;
};

export type MyProfileResponse = {
  userInfo: User;
};

export type PrivilegeResponse = {
  privileges: MenuGroup[];
};
