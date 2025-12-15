import { getLocal } from "@/helpers/getLocal";
import { create } from "zustand";

interface NameState {
  name: string
  setName: (value: string) => void;
}

export const useNameStore = create<NameState>((set) => ({
  name: getLocal("neopage-name", "user"),
  setName: (name) => {
    set({ name });
  },
}));