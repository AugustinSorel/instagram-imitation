import { DefaultTheme } from "styled-components";
import zustand from "zustand";
import darkTheme from "../styles/darkTheme";
import lightTheme from "../styles/lightTheme";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  getCurrentTheme: () => DefaultTheme;
}

const useCurrentTheme = zustand<ThemeState>((set, get) => ({
  isDarkMode: localStorage.getItem("isDarkMode") === "true",

  toggleTheme: () => {
    set({ isDarkMode: !get().isDarkMode });
    localStorage.setItem("isDarkMode", String(get().isDarkMode));
  },

  getCurrentTheme: () => {
    if (get().isDarkMode) {
      return darkTheme;
    }

    return lightTheme;
  },
}));

export default useCurrentTheme;
