import type { StateCreator } from "zustand";

type TokenData = {
  id: number;
  username: string;
  staffId: number;
  positionId: number;
};

export interface AuthSlice {
  accessToken?: string;
  refreshToken?: string;
  tokenData?: TokenData;
  actions: {
    setAccessToken: (accessToken?: string) => void;
    setRefreshToken: (refreshToken?: string) => void;
    setTokenData: (tokenData?: TokenData) => void;
    clearUserInfo: () => void;
  };
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  accessToken: undefined,
  actions: {
    setAccessToken(accessToken) {
      set(() => ({ accessToken }));
    },
    setRefreshToken(refreshToken) {
      set(() => ({ refreshToken }));
    },
    setTokenData(tokenData) {
      set(() => ({ tokenData }));
    },
    clearUserInfo() {
      set(() => ({ accessToken: undefined, refreshToken: undefined, tokenData: undefined }));
    },
  },
});
