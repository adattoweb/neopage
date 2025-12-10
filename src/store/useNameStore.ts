import { create } from "zustand";

interface NameState {
  name: string
  setName: (value: string) => void;
}

export const useNameStore = create<NameState>((set) => ({
  name: localStorage.getItem("neopage-name")!,
  setName: (name) => {
    set({ name });
  },
}));