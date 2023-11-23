import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CountSlice, createCountSlice } from "./slices/countSlice";
import { type AuthSlice, createAuthSlice } from "./slices/authSlice";
import { type ThemeSlice, createThemeSlice } from "./slices/themeSlice";

export const useStore = create<CountSlice & AuthSlice & ThemeSlice>()(
  persist(
    (...a) => ({
      ...createCountSlice(...a),
      ...createAuthSlice(...a),
      ...createThemeSlice(...a),
    }),
    {
      name: "user-info",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userData: state.userData,
        privileges: state.privileges,
        theme: state.theme,
      }),
    }
  )
);
// Auth store hooks
export const useAccessToken = () => useStore((state) => state.accessToken);
export const useUserData = () => useStore((state) => state.userData);
export const usePrivileges = () => useStore((state) => state.privileges);
export const useRefreshToken = () => useStore((state) => state.refreshToken);
export const useAuthActions = () => useStore((state) => state.actions);

// Theme store hooks
export const useTheme = () => useStore((state) => state.theme);
export const useSetTheme = () => useStore((state) => state.setTheme);
