import { create } from "zustand";
interface ThemeState {
  dark: boolean;
  toggle: () => void;
}
const initial = localStorage.getItem("nova-theme") !== "light";
if (initial) document.documentElement.classList.add("dark");
else document.documentElement.classList.remove("dark");
export const useThemeStore = create<ThemeState>((set) => ({
  dark: initial,
  toggle: () =>
    set((s) => {
      const dark = !s.dark;
      localStorage.setItem("nova-theme", dark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", dark);
      return { dark };
    }),
}));
