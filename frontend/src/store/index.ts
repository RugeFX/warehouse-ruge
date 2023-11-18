import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CountSlice, createCountSlice } from "./slices/countSlice";
import { type AuthSlice, createAuthSlice } from "./slices/authSlice";

export const useStore = create<CountSlice & AuthSlice>()(
  persist(
    (...a) => ({
      ...createCountSlice(...a),
      ...createAuthSlice(...a),
    }),
    {
      name: "user-info",
      partialize: (state) => ({ accessToken: state.accessToken, refreshToken: state.refreshToken }),
    }
  )
);

export const useAccessToken = () => useStore((state) => state.accessToken);
export const useTokenData = () => useStore((state) => state.tokenData);
export const useRefreshToken = () => useStore((state) => state.refreshToken);
export const useAuthActions = () => useStore((state) => state.actions);
