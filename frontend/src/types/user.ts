export type User = {
  id: number;
  username: string;
  staffId: number;
};

export type LocalUserInfo = {
  accessToken: string;
  refreshToken: string;
};

export type PersistedInfo = {
  state?: LocalUserInfo;
  version: number;
};
