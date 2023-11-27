import type { MenuGroup, User } from "@/types/user";
import type { StateCreator } from "zustand";

export interface AuthSlice {
  accessToken?: string;
  refreshToken?: string;
  userData?: User;
  privileges?: MenuGroup[];
  actions: {
    setAccessToken: (accessToken?: string) => void;
    setRefreshToken: (refreshToken?: string) => void;
    setUserData: (userData?: User) => void;
    setPrivileges: (privileges?: MenuGroup[]) => void;
    clearUserInfo: () => void;
  };
}

const initialState: Omit<AuthSlice, "actions"> = {
  accessToken: undefined,
  refreshToken: undefined,
  userData: undefined,
  privileges: undefined,
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  accessToken: undefined,
  refreshToken: undefined,
  userData: undefined,
  privileges: undefined,
  actions: {
    setAccessToken(accessToken) {
      set(() => ({ accessToken }));
    },
    setRefreshToken(refreshToken) {
      set(() => ({ refreshToken }));
    },
    setUserData(userData) {
      set(() => ({ userData }));
    },
    setPrivileges(privileges) {
      set(() => ({ privileges }));
    },
    clearUserInfo() {
      set(() => initialState);
    },
  },
});
