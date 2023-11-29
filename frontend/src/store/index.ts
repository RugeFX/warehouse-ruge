import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CountSlice, createCountSlice } from "./slices/countSlice";
import { type AuthSlice, createAuthSlice } from "./slices/authSlice";
import { type ThemeSlice, createThemeSlice } from "./slices/themeSlice";
import { type NavSlice, createNavSlice } from "./slices/navSlice";

export const useStore = create<CountSlice & AuthSlice & ThemeSlice & NavSlice>()(
  persist(
    (...a) => ({
      ...createCountSlice(...a),
      ...createAuthSlice(...a),
      ...createThemeSlice(...a),
      ...createNavSlice(...a),
    }),
    {
      name: "user-info",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userData: state.userData,
        theme: state.theme,
        navItemsState: state.navItemsState,
      }),
    }
  )
);
// Auth store hooks
export const useAccessToken = () => useStore((state) => state.accessToken);
export const useUserData = () => useStore((state) => state.userData);
export const usePrivileges = () => useStore((state) => state.privileges);
export const useRefreshToken = () => useStore((state) => state.refreshToken);
export const useAuthActions = () => useStore((state) => state.authActions);

// Theme store hooks
export const useTheme = () => useStore((state) => state.theme);
export const useSetTheme = () => useStore((state) => state.setTheme);

// Nav store hooks
export const useNavItemsState = () => useStore((state) => state.navItemsState);
export const useNavActions = () => useStore((state) => state.navActions);
