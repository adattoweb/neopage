import { readLocal } from "@/helpers/readLocal";
import { create } from "zustand";

interface ThemesState {
    themes: string[]
    setThemes: (value: string[]) => void
}

export const useThemesStore = create<ThemesState>((set) => ({
  themes: readLocal('neopage-themes'),
  setThemes: (themes) => {
    set({ themes });
  },
}));