import { getLocal } from "@/helpers/getLocal";
import { create } from "zustand";

interface LanguageState {
  lang: string;
  setLang: (value: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: getLocal("neopage-lang", "en"),

  setLang: (lang) => {
    localStorage.setItem("neopage-lang", lang);
    set({ lang });
  },
}));