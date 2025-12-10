import { create } from "zustand";

interface LanguageState {
  lang: string;
  setLang: (value: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: localStorage.getItem("neopage-lang") || "en",

  setLang: (lang) => {
    localStorage.setItem("neopage-lang", lang);
    set({ lang });
  },
}));